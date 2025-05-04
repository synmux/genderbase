# syntax=docker/dockerfile:1
# check=error=true

# This Dockerfile is designed for production, not development. Use with Kamal or build'n'run by hand:
# docker build -t genderbase .
# docker run -d -p 80:80 -e RAILS_MASTER_KEY=<value from config/master.key> --name genderbase genderbase

# For a containerized dev environment, see Dev Containers: https://guides.rubyonrails.org/getting_started_with_devcontainer.html

# Use Alpine as base image
FROM docker.io/library/alpine:3.21.3

# Install packages
RUN apk add --no-cache \
        bash=5.2.37-r0 \
        curl=8.12.1-r1 \
        jemalloc=5.3.0-r6 \
        vips=8.15.3-r5 \
        sqlite=3.48.0-r1 \
        ca-certificates=20241121-r1 \
        gnupg=2.4.7-r0 \
        build-base=0.5-r3 \
        git=2.47.2-r0 \
        yaml-dev=0.2.5-r2 \
        nodejs=22.13.1-r0 \
        npm=10.9.1-r0 \
        pkgconf=2.3.0-r0 \
        python3=3.12.10-r0 \
        openssl-dev=3.3.3-r0 \
        zlib-dev=1.3.1-r2 \
        libffi-dev=3.4.7-r0 \
        gcompat=1.1.0-r4 \
        tzdata=2025b-r0

# Set shell options
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Set up a non-root user for security
RUN addgroup -S -g 1000 rails && \
    adduser -S -u 1000 -G rails -h /rails rails

# Rails app lives here
WORKDIR /rails

# Copy application code
COPY . .

# Set permissions in /rails
RUN chown -R 1000:1000 /rails

# Switch to the non-root user
USER 1000:1000

# Set production environment
ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/rails/_bundle" \
    BUNDLE_WITHOUT="development test"

# Use mise for Ruby, Node.js and Bun installation
RUN curl -fsSL https://mise.jdx.dev/install.sh | sh
ENV PATH="/rails/.local/bin:$PATH"

# Install Ruby, Node.js and Bun using mise
# trunk-ignore(hadolint/SC2210)
RUN mise trust && \
    mise install 2>&1 | grep -v "g++ -o" | grep -v "cc -o" && \
    eval "$(mise activate bash)" && \
    gem update --system --no-document && \
    gem update --no-document && \
    bundle install && \
    bun install && \
    bundle exec bootsnap precompile --gemfile && \
    bundle exec bootsnap precompile app/ lib/ && \
    SECRET_KEY_BASE_DUMMY=1 bundle exec rails assets:precompile

# Entrypoint prepares the database.
ENTRYPOINT ["/rails/bin/docker-entrypoint"]

# Start server via Thruster by default, this can be overwritten at runtime
EXPOSE 80

# Add health check for the Rails server
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 CMD curl -f http://localhost:80/up || exit 1

# Start the Rails server via Thruster
CMD ["/rails/bin/thrust", "bundle", "exec", "rails", "server"]

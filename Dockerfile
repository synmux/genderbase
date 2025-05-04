# syntax=docker/dockerfile:1
# check=error=true

# This Dockerfile is designed for production, not development. Use with Kamal or build'n'run by hand:
# docker build -t genderbase .
# docker run -d -p 80:80 -e RAILS_MASTER_KEY=<value from config/master.key> --name genderbase genderbase

# For a containerized dev environment, see Dev Containers: https://guides.rubyonrails.org/getting_started_with_devcontainer.html

# Use Debian slim as base image
FROM docker.io/library/debian:12-slim

# Set shell options
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Install packages
RUN apt-get update -qq && \
    DEBIAN_FRONTEND=noninteractive apt-get install --no-install-recommends -y \
        curl=7.88.1-10+deb12u12 \
        libjemalloc2=5.3.0-1 \
        libvips42=8.14.1-3+deb12u1 \
        sqlite3=3.40.1-2+deb12u1 \
        ca-certificates=20230311 \
        gnupg=2.2.40-1.1 \
        build-essential=12.9 \
        git=1:2.39.5-0+deb12u2 \
        libyaml-dev=0.2.5-1 \
        node-gyp=9.3.0-2 \
        pkg-config=1.8.1-1 \
        python-is-python3=3.11.2-1+deb12u1 \
        libssl-dev=3.0.15-1~deb12u1 \
        zlib1g-dev=1:1.2.13.dfsg-1 && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Set up a non-root user for security
RUN groupadd --system --gid 1000 rails && \
    useradd rails --uid 1000 --gid 1000 --home-dir /rails --create-home

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
RUN mise trust && \
    mise install && \
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

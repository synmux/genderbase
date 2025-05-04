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

# Set up a non-root user for security
RUN addgroup -S -g 1000 rails > /dev/null && \
    adduser -S -u 1000 -G rails -h /rails -s /bin/bash rails

# Rails app lives here
WORKDIR /rails

# Copy application code
COPY . .

# Set permissions in /rails
RUN chown -R 1000:1000 /rails

# Switch to the non-root user
USER 1000:1000

# Set shell options
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Set production environment
ENV RAILS_ENV="production"
ENV BUNDLE_DEPLOYMENT="1"
ENV BUNDLE_PATH="/rails/_bundle"

# Dependencies and precompilation
RUN echo "🛀🏻‍ Cleaning up..." && \
    rm -rf node_modules && \
    echo "🏃🏻‍♀️ Installing mise..." && \
    curl https://mise.run | sh && \
    echo "eval \"\$(/rails/.local/bin/mise activate bash)\"" > ~/.bashrc && \
    echo "🎢 Activating mise..." && \
    source ~/.bashrc && \
    mise trust && \
    echo "🏗️ Installing Ruby and Bun with mise..." && \
    mise install && \
    source ~/.bashrc && \
    echo "🔺 Updating Ruby and Bundler... [system]" && \
    gem update --system && \
    echo "🔺 Updating Ruby and Bundler... [gems]" && \
    gem update && \
    echo "📦 Installing Bundler dependencies..." && \
    bundle install && \
    echo "📦 Installing Bun dependencies..." && \
    bun install && \
    echo "🚛 Precompiling assets... [gemfile]" && \
    bundle exec bootsnap precompile --gemfile && \
    echo "🚛 Precompiling assets... [app, lib]" && \
    bundle exec bootsnap precompile app/ lib/ && \
    echo "🚛 Precompiling assets... [precompile]" && \
    SECRET_KEY_BASE_DUMMY=1 bundle exec rails assets:precompile  && \
    echo "🎉 Complete!"

# Entrypoint prepares the database.
ENTRYPOINT ["/rails/bin/docker-entrypoint"]

# Start server via Thruster by default, this can be overwritten at runtime
EXPOSE 80

# Add health check for the Rails server
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 CMD curl -f http://localhost:80/up || exit 1

# Start the Rails server via Thruster
CMD ["/rails/bin/thrust", "bundle", "exec", "rails", "server"]

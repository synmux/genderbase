# syntax=docker/dockerfile:1
# check=error=true

# This Dockerfile is designed for production, not development. Use with Kamal or build'n'run by hand:
# docker build -t genderbase .
# docker run -d -p 80:80 -e RAILS_MASTER_KEY=<value from config/master.key> --name genderbase genderbase

# For a containerized dev environment, see Dev Containers: https://guides.rubyonrails.org/getting_started_with_devcontainer.html

# Use Debian slim as base image
FROM docker.io/library/debian:12-slim AS base

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
        build-essential=12.9 \
        git=1:2.39.5-0+deb12u2 \
        libyaml-dev=0.2.5-1 \
        node-gyp=9.3.0-2 \
        pkg-config=1.8.1-1 \
        python-is-python3=3.11.2-1+deb12u1 \
        libssl-dev=3.0.15-1~deb12u1 \
        zlib1g-dev=1:1.2.13.dfsg-1 && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Run and own only the runtime files as a non-root user for security
RUN groupadd --system --gid 1000 rails && \
    useradd rails --uid 1000 --gid 1000 --home-dir /rails --create-home && \
    chown -R rails:rails /rails
USER 1000:1000

# Rails app lives here
WORKDIR /rails

# Set production environment
ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/rails/_bundle" \
    BUNDLE_WITHOUT="development test"

# Copy application code
COPY . .

# Use mise for Ruby, Node.js and Bun installation
RUN curl -fsSL https://mise.jdx.dev/install.sh | sh
ENV PATH="/rails/.local/bin:$PATH"

# Install Ruby, Node.js and Bun using mise
RUN mise install
ENV PATH="/rails/.local/share/mise/shims:$PATH"

RUN gem update --system && \
    gem update && \
    bundle install && \
    bundle exec bootsnap precompile --gemfile && \
    bun install && \
    bundle exec bootsnap precompile app/ lib/ && \
    SECRET_KEY_BASE_DUMMY=1 bundle exec rails assets:precompile

# Entrypoint prepares the database.
ENTRYPOINT ["/rails/bin/docker-entrypoint"]

# Start server via Thruster by default, this can be overwritten at runtime
EXPOSE 80

# Add health check for the Rails server
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 CMD curl -f http://localhost:80/up || exit 1

CMD ["./bin/thrust", "bundle", "exec", "rails", "server"]

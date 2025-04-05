# Genderbase

## Dependencies

### Required

See `mise.toml` for recommended versions. Install them all with `bin/mise install`.

- [**`ddollar/foreman`**](https://github.com/ddollar/foreman): Process manager
- [**`nodejs/node`**](https://github.com/nodejs/node): JavaScript runtime
- [**`pnpm/pnpm`**](https://github.com/pnpm/pnpm): JavaScript package manager
- [**`redis/redis`**](https://github.com/redis/redis): Fast in-memory key-value store
- [**`ruby/ruby`**](https://github.com/ruby/ruby): Ruby runtime

### Recommended

- [**`jdx/mise`**](https://github.com/jdx/mise): Dependency manager and task runner; `asdf`, but better
- [**`joerdav/xc`**](https://github.com/joerdav/xc): Task runner; alternative to `mise`

This will be installed automatically by `bin/mise` which will bootstrap `mise` if needed, and run it if it's already installed.

`mise` is also used in the GitHub Actions workflow to run the CI tests.

## Development

Start the development server with `bin/mise dev`.

## Tasks

This section is interpreted by [**`joerdav/xc`**](https://github.com/joerdav/xc) as an alternative to [**`jdx/mise`**](https://github.com/jdx/mise).

### `dev`

Start the development servers using foreman.

```sh
foreman start -f Procfile.dev
```

### `prepare-ci`

Install dependencies for CI environment.

```sh
gem install bundler
bundle install
bundle binstubs --all
pnpm install --verify-store-integrity
```

### `ci:brakeman`

Run Brakeman security scanner.

```sh
bin/brakeman --no-pager
```

### `ci:rubocop`

Run RuboCop with GitHub-formatted output.

```sh
bin/rubocop -f github
```

### `ci:test`

Run Rails tests including system tests.

```sh
RAILS_ENV=test bin/rails db:test:prepare test test:system
```

### `ci`

Run all CI tasks.

```sh
xc ci:brakeman && xc ci:rubocop && xc ci:test
```

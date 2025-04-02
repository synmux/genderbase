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

This will be installed automatically by `bin/mise` which will bootstrap `mise` if needed, and run it if it's already installed.

`mise` is also used in the GitHub Actions workflow to run the CI tests.

## Development

Start the development server with `bin/mise dev`.

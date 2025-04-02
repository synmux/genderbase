# Genderbase

## Dependencies

Recommended tools:

- [`jdx/mise`](https://github.com/jdx/mise): Dependency manager and task runner; `asdf`, but better

This will be installed automatically by `bin/mise` which will bootstrap `mise` if needed, and run it if it's already installed.

`mise` is also used in the GitHub Actions workflow to run the CI tests.

Required tools:

See `mise.toml` for recommended versions. Install them all with `bin/mise install`.

- [`foreman`](https://github.com/ddollar/foreman): Process manager
- [`node`](https://nodejs.org/): JavaScript runtime
- [`pnpm`](https://pnpm.io/): JavaScript package manager
- [`redis`](https://redis.io/): Fast in-memory key-value store
- [`ruby`](https://www.ruby-lang.org/): Ruby runtime

## Development

Start the development server with `bin/mise dev`.

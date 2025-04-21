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

### Tailscale

When using Tailscale, ensure `$TAILSCALE_IPV4` is set to your local Tailscale IP address.

### Tasks

| Command              | Description                                  |
| -------------------- | -------------------------------------------- |
| `mise db:reset`      | Reset the database and apply seeds           |
| `mise dev`           | Start the development server using Tailscale |
| `mise dev:localhost` | Start the development server on localhost    |

CI-related Mise tasks are present but not listed. See `mise.toml` for details.

## Authentication

In development, you can browse the app as the demo responder. `mise db:reset` will set the database up for you and create this user. Use `bundle exec rails db:seed` if you only want to apply the seeds for any reason.

### Email

```plaintext
demo@genderbase.com
```

### Password

```plaintext
jie1OSh0ek6aith3
```

## TODO

- Reimplement system tests
- Ask the user whether their question can be turned into a knowledge article when the question is closed
  - Default to yes, giving them 7 days to opt out
  - Allow the responder to flag the question as not eligible for the knowledge base
- Use ActionCable to update questions in real time as they are edited or answered

## Notes

### Devise views

These can be generated for editing with `bundle exec rails g devise:views`.

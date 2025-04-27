# About Genderbase

## Description

### In short

A site which includes the following —

A **knowledge base** which offers information about gender issues that people can send their parents, friends, and coworkers to. It should help them understand what they're going through, how they should interact, pitfalls to avoid, and similar.

A dedicated **How Do I Say…?** section to provide quick and easy answers on what terminology to use, words which they should use, words which they should avoid, and why.

It will also offer the opportunity to **ask anonymous questions** to a vetted team of responders. All topics should be on the table. The user shouldn't fear saying the wrong thing. As long as they're operating in good faith, we want to give them the answers they're after even if their question accidentally implies something difficult.

### Bullet Points

- Educational resource about topics of gender
- Intent is to be somewhere you can send a partner, friend, parent, or coworker
- Includes a **knowledge base**
  - Contributions by volunteer authors, with attribution if desired
  - Use topics that come up often in questions to direct new knowledge base content
  - Track topics of questions in a structured way
- Separate **How Do I Say…?** section
  - Quick answers about correct and incorrect terminology
- Also includes ability to **ask a question anonymously**
  - Vetted volunteers can respond anonymously
  - Encourage asker not to worry about accidentally being offensive
  - Make it clear that all we ask of them is good faith
  - Site keeps track of user's email address to send notifications of replies
    - Option to sign up without email at the cost of no notifications
  - Identifying details are never sent to either party
  - Pseudonym for user and responder is randomly generated
  - There is a page for responders where they can view pending questions, and questions which are open and might be responded to.
  - At any point, either the asker or responder can end the conversation for both participants. If the user ends the conversation, the responder can submit a maximum of one further response. If a responder ends the conversation, it ends there and then.
  - When a user submits a question, they are given a link they can visit to see any responses to their question and continue the conversation if appropriate. The responder has a page that shows all their owned open conversations.
  - When a conversation is closed, the responder is asked to summarise the conversation in the form of a post, in Markdown format. They might do that then and there, or later. They can access a list of conversations which are pending summarisation. They pick a category and can add one or more tags.
  - There are three 'AI' buttons to generate the summary, the category, and/or the tags.
  - When the responder has submitted their summary, it goes into a queue for approval by other responders where all responders can see all summarised answers and it takes a configurable number of approvals (default 3) before it is posted in the "answered questions" section, which is searchable.

### Extension

Perhaps in future extend it to issues of race, size (weight and height), nationality, and so on.

### Knowledge Base topics

#### Can you be trans without surgery?

- Trans men may have a uterus and get pregnant

## Development & Setup

### Dependencies

#### Required

See `mise.toml` for recommended versions. Install them all with `bin/mise install`.

- [**`ddollar/foreman`**](https://github.com/ddollar/foreman): Process manager
- [**`nodejs/node`**](https://github.com/nodejs/node): JavaScript runtime
- [**`pnpm/pnpm`**](https://github.com/pnpm/pnpm): JavaScript package manager
- [**`redis/redis`**](https://github.com/redis/redis): Fast in-memory key-value store
- [**`ruby/ruby`**](https://github.com/ruby/ruby): Ruby runtime

#### Recommended

- [**`jdx/mise`**](https://github.com/jdx/mise): Dependency manager and task runner; `asdf`, but better

This will be installed automatically by `bin/mise` which will bootstrap `mise` if needed, and run it if it's already installed.

`mise` is also used in the GitHub Actions workflow to run the CI tests.

### Development

Start the development server with `bin/mise dev`.

#### Tailscale

When using Tailscale, ensure `$TAILSCALE_IPV4` is set to your local Tailscale IP address.

#### Tasks

| Command              | Description                                  |
| -------------------- | -------------------------------------------- |
| `mise db:reset`      | Reset the database and apply seeds           |
| `mise dev`           | Start the development server using Tailscale |
| `mise dev:localhost` | Start the development server on localhost    |

CI-related Mise tasks are present but not listed. See `mise.toml` for details.

### Authentication

In development, you can browse the app as the demo responder. `mise db:reset` will set the database up for you and create this user. Use `bundle exec rails db:seed` if you only want to apply the seeds for any reason.

#### Email

```plaintext
demo@genderbase.com
```

#### Password

```plaintext
jie1OSh0ek6aith3
```

### TODO

- Reimplement system tests
- Ask the user whether their question can be turned into a knowledge article when the question is closed
  - Default to yes, giving them 7 days to opt out
  - Allow the responder to flag the question as not eligible for the knowledge base
- Use ActionCable to update questions in real time as they are edited or answered

### Notes

#### Devise views

These can be generated for editing with `bundle exec rails g devise:views`.

## Additional Features

### Pronoun sharing

Enter your socials, validate ownership, associate many with your account, allow people to look you up by any of the socials, maybe email too, and get your pronouns.

And an API to let social apps look people up and display them inline or whatever they come up with.

Maybe a privacy option to switch off API lookups or website lookups if you want.

Possibly an option to allow you to authorise lookups individually if you want, though that would disable API lookups. The user looking you up would auth with a social, and you'd see who they are and could choose to allow or deny the lookup.

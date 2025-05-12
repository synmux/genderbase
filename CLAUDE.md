# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Genderbase is a Rails application that provides:

1. A **knowledge base** of information about gender issues for educational purposes
2. A **terminology section** for guidance on appropriate language and terminology
3. An **anonymous Q&A system** where users can ask questions and receive answers from vetted responders

The application allows users to browse existing knowledge articles, terminology definitions, and submit anonymous questions. Vetted responders can answer questions, which can later be converted into knowledge base entries.

## Development Setup

### Requirements

- Ruby 3.4.3
- Node.js 22.15.0+
- Bun 1.2.13+
- Redis
- Foreman (for process management)

The recommended way to install dependencies is with `mise`:

```bash
# Install all required dependencies using mise
bin/mise install
```

### Database Setup

Reset and seed the database:

```bash
mise db:reset
```

This will create a demo responder account:

<!-- trunk-ignore-begin(markdownlint-cli2/MD034/no-bare-urls,gitleaks/generic-api-key) -->
- Email: demo@genderbase.com
- Password: jie1OSh0ek6aith3
<!-- trunk-ignore-end(markdownlint-cli2/MD034/no-bare-urls,gitleaks/generic-api-key) -->

### Starting the Development Server

Start the development server using Tailscale (requires TAILSCALE_IPV4 env var):

```bash
mise dev
```

Or start on localhost:

```bash
mise dev:localhost
```

## Common Development Commands

### JavaScript and CSS

Build JavaScript and CSS:

```bash
# Build both JS and CSS
bun run build

# Build JS only
bun run build:js

# Build CSS only
bun run build:css
```

### Testing

Run all tests:

```bash
# Run all tests
bundle exec rails test test:system

# Prepare test database
bundle exec rails db:test:prepare
```

### Linting and Static Analysis

```bash
# Ruby code linting
bundle exec rubocop

# Security vulnerability scanning
bundle exec brakeman

# Run all CI checks
mise ci
```

## Architecture

### Models

- **Responder**: Users who can respond to questions and create knowledge entries
- **Question**: Questions submitted by users (anonymous or with email)
- **Answer**: Responses to questions from responders
- **Knowledge**: Knowledge base articles created from questions/answers
- **Terminology**: Definitions and guidance on language/terminology

### Key Features

1. **Anonymous Questions and Answers**:
   - Users can submit questions with or without email
   - Both users and responders are given pseudonyms
   - Questions accessed via secure tokens

2. **Knowledge Base Conversion**:
   - Closed questions can be converted to knowledge base entries
   - Requires approval from multiple responders

3. **Terminology Section**:
   - Provides guidance on language and terminology related to gender

## Frontend

The application uses:
- Tailwind CSS (with DaisyUI components)
- Hotwire (Turbo and Stimulus)
- esbuild for JavaScript bundling

## Authentication

Authentication is handled by Devise with Argon2 for password hashing and zxcvbn for password strength validation.

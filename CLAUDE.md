# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- Test: `bundle exec rails test` or `bundle exec rails test:system` or `bundle exec rails test TEST=test/path/to/test_file.rb:LINE_NUMBER`
- Run specific system test: `bundle exec rails test:system TEST=test/system/home_test.rb`
- Lint: `bundle exec rubocop` or `bundle exec rubocop path/to/file.rb`
- Code formatting: `bundle exec rubocop -A && trunk fmt -a` (auto-correct)
- Start app: `mise dev` or `mise dev:localhost` to use localhost instead of tailscale
- Database reset: `mise db:reset`

## Style Guide

- Ruby version: 3.4.3
- Follow Rails conventions and Rubocop Rails Omakase rules
- Indentation: 2 spaces
- Max line length: 120 characters
- Use snake_case for methods, variables, files
- Use CamelCase for classes and modules
- Include type information in comments for complex methods
- Rails models should use validations for data integrity
- Use Rails form objects for complex forms
- Design system uses Tailwind CSS with DaisyUI components

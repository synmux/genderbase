# Genderbase

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Dependencies](#dependencies)
4. [Development](#development)
5. [API Documentation](#api-documentation)
6. [Frontend Implementation](#frontend-implementation)
7. [Rails Integration](#rails-integration)
8. [Running the Application](#running-the-application)
9. [Development Guidelines](#development-guidelines)
10. [Security Considerations](#security-considerations)
11. [Testing](#testing)
12. [Deployment](#deployment)

## Overview

Genderbase is an educational platform providing resources about gender topics. The application has been converted from a Next.js implementation to a static HTML/CSS site with Stimulus for JavaScript interactions, designed to be integrated with a Rails backend.

### Project Goals

- Provide educational resources about gender topics
- Enable question submission and expert responses
- Maintain a knowledge base of articles and terminology
- Support conversation management and summarization
- Ensure accessibility and inclusivity

## Architecture

### Directory Structure

```plaintext
/
├── app/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── tailwind.css
│   │   │   └── application.css
│   │   ├── js/
│   │   │   ├── controllers/
│   │   │   └── application.js
│   │   └── images/
│   ├── views/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── partials/
│   ├── controllers/
│   ├── models/
│   └── javascript/
└── config/
```

### Framework Changes

The application has been converted from Next.js to a static HTML/CSS implementation with the following changes:

- Removed React dependencies and components
- Replaced Next.js routing with standard HTML navigation
- Converted React components to Stimulus controllers
- Maintained Tailwind CSS for styling

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

## API Documentation

### Authentication Endpoints

#### Login

- **Endpoint**: `/api/auth/login`
- **Method**: `POST`
- **Description**: Authenticates a responder and returns a JWT token
- **Request Body**:

```json
{
  "email": "responder@example.com",
  "password": "securepassword"
}
```

#### Logout

- **Endpoint**: `/api/auth/logout`
- **Method**: `POST`
- **Description**: Invalidates the current session
- **Headers**: `Authorization: Bearer {token}`

### Questions Endpoints

#### Submit Question

- **Endpoint**: `/api/questions`
- **Method**: `POST`
- **Description**: Submits a new question
- **Request Body**:

```json
{
  "name": "Anonymous",
  "email": "user@example.com",
  "question": "How do I respectfully ask about pronouns?",
  "context": "Meeting a new colleague"
}
```

#### Get Pending Questions

- **Endpoint**: `/api/questions/pending`
- **Method**: `GET`
- **Description**: Retrieves pending questions
- **Headers**: `Authorization: Bearer {token}`

### Knowledge Base Endpoints

#### Get Articles

- **Endpoint**: `/api/knowledge-base`
- **Method**: `GET`
- **Description**: Retrieves knowledge base articles
- **Query Parameters**:
  - `category` (optional)
  - `search` (optional)
  - `page` (optional)

### Terminology Endpoints

#### Get Terminology

- **Endpoint**: `/api/terminology`
- **Method**: `GET`
- **Description**: Retrieves terminology entries
- **Query Parameters**:
  - `search` (optional)
  - `page` (optional)

## Frontend Implementation

### Stimulus Controllers

#### Theme Controller

```javascript
// controllers/theme_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["toggle"];

  connect() {
    const theme = localStorage.getItem("theme") || "light";
    this.updateTheme(theme);
  }

  toggle() {
    const currentTheme = document.documentElement.classList.contains("dark") ? "dark" : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    this.updateTheme(newTheme);
  }

  updateTheme(theme) {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }
}
```

### HTML Templates

#### Application Layout

```erb
<!-- layouts/application.html.erb -->
<!DOCTYPE html>
<html lang="en" class="<%= cookies[:theme] || 'light' %>">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Genderbase</title>
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>
    <%= stylesheet_link_tag "tailwind", "inter-font", "data-turbo-track": "reload" %>
    <%= stylesheet_link_tag "application", "data-turbo-track": "reload" %>
    <%= javascript_importmap_tags %>
  </head>
  <body class="min-h-screen bg-background font-sans antialiased">
    <div class="relative flex min-h-screen flex-col" data-controller="theme">
      <%= render 'shared/header' %>
      <div class="flex-1">
        <%= yield %>
      </div>
      <%= render 'shared/footer' %>
    </div>
  </body>
</html>
```

## Rails Integration

### Prerequisites

- Ruby (version 3.0.0 or higher)
- Rails (version 7.0 or higher)
- Node.js and Yarn
- PostgreSQL

### Installation Steps

1. Create a new Rails application:

```bash
rails new genderbase --css=tailwind --javascript=stimulus
```

2. Install dependencies:

```bash
bundle add stimulus-rails
bundle add tailwindcss-rails
rails tailwindcss:install
```

3. Configure Tailwind:

```javascript
// config/tailwind.config.js
module.exports = {
  content: ["./app/views/**/*.{erb,haml,html,slim}", "./app/helpers/**/*.rb", "./app/javascript/**/*.js"],
  theme: {
    extend: {
      // Theme configuration
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
```

### Models

```ruby
# app/models/article.rb
class Article < ApplicationRecord
  validates :title, presence: true
  validates :content, presence: true
  validates :category, presence: true
  validates :slug, presence: true, uniqueness: true
end

# app/models/question.rb
class Question < ApplicationRecord
  belongs_to :responder, optional: true
  has_many :answers

  validates :content, presence: true
end
```

### Controllers

```ruby
# app/controllers/knowledge_base_controller.rb
class KnowledgeBaseController < ApplicationController
  def index
    @articles = Article.all
  end

  def show
    @article = Article.find_by(slug: params[:id])
  end
end
```

### Routes

```ruby
# config/routes.rb
Rails.application.routes.draw do
  root to: 'home#index'

  get '/knowledge-base', to: 'knowledge_base#index'
  get '/knowledge-base/:id', to: 'knowledge_base#show'

  get '/how-do-i-say', to: 'how_do_i_say#index'

  resources :questions, only: [:new, :create]
  resources :answered_questions, only: [:index]
end
```

## Running the Application

### Development Environment

1. Install dependencies:

```bash
bundle install
npm install
```

2. Set up the database:

```bash
rails db:create
rails db:migrate
rails db:seed
```

3. Start the development server:

```bash
rails server
```

### Production Environment

1. Precompile assets:

```bash
rails assets:precompile
```

2. Configure environment variables:

```bash
export RAILS_ENV=production
export DATABASE_URL=postgresql://...
```

3. Run migrations:

```bash
rails db:migrate RAILS_ENV=production
```

## Development Guidelines

### Code Style

- Follow Ruby style guide
- Use meaningful variable and method names
- Keep methods focused and small
- Write comprehensive tests

### Git Workflow

1. Create feature branch
2. Make changes
3. Write tests
4. Submit pull request
5. Code review
6. Merge to main

## Security Considerations

### Authentication

- Use JWT for API authentication
- Implement proper password hashing
- Enable CSRF protection
- Use secure session management

### Data Protection

- Validate all user inputs
- Implement rate limiting
- Use HTTPS in production
- Follow GDPR guidelines

## Testing

### Test Types

1. Unit Tests
2. Integration Tests
3. System Tests
4. Security Tests

### Running Tests

```bash
# Run all tests
rails test

# Run specific test file
rails test test/models/article_test.rb

# Run with coverage
COVERAGE=true rails test
```

## Deployment

### Requirements

- Ruby 3.0.0+
- PostgreSQL
- Redis (optional)
- Node.js 14+

### Deployment Steps

1. Prepare application:

```bash
bundle install --without development test
rails assets:precompile
```

2. Configure environment:

```bash
export RAILS_ENV=production
export SECRET_KEY_BASE=...
```

3. Run migrations:

```bash
rails db:migrate RAILS_ENV=production
```

4. Start application:

```bash
rails server -e production
```

### Monitoring

- Set up error tracking (e.g., Sentry)
- Configure logging
- Monitor server resources
- Set up uptime monitoring

## Support and Maintenance

### Regular Tasks

- Update dependencies
- Monitor error logs
- Backup database
- Review security updates

### Troubleshooting

1. Check application logs
2. Monitor server resources
3. Review error tracking
4. Check database performance

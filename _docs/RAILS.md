# Genderbase - Rails Integration Guide

This guide provides detailed instructions for integrating the static HTML/CSS/Stimulus Genderbase codebase into a Ruby on Rails application.

## Prerequisites

- Ruby (version 3.0.0 or higher recommended)
- Rails (version 7.0 or higher recommended)
- Node.js and Yarn (for JavaScript dependencies)
- Basic understanding of Rails application structure

## Step 1: Create or Prepare a Rails Application

If starting from scratch:

```bash
# Create a new Rails application with Stimulus
rails new genderbase --css=tailwind --javascript=stimulus

# Navigate to the app directory
cd genderbase
```

If using an existing Rails app, add Stimulus:

```bash
# Install Stimulus
bundle add stimulus-rails

# Install Tailwind CSS
bundle add tailwindcss-rails

# Initialize Tailwind CSS
rails tailwindcss:install
```

## Step 2: Set Up the Directory Structure

Ensure your Rails app has the following directory structure:

```plaintext
app/
├── assets/
│   ├── images/
│   └── stylesheets/
├── controllers/
├── javascript/
│   └── controllers/
├── models/
└── views/
    ├── layouts/
    └── shared/
```

## Step 3: Configure Tailwind CSS

1. Copy the Tailwind configuration:

```bash
# Copy the tailwind config file from the static site
cp /path/to/static/tailwind.config.ts config/tailwind.config.js
```

2. Update the configuration to work with Rails:

```js
// config/tailwind.config.js
module.exports = {
  content: [
    "./app/views/**/*.{erb,haml,html,slim}",
    "./app/helpers/**/*.rb",
    "./app/javascript/**/*.js",
    "./app/assets/stylesheets/**/*.css",
  ],
  theme: {
    // Copy theme configuration from static site's tailwind.config.ts
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
    // Add other plugins as needed
  ],
};
```

## Step 4: Set Up Stimulus Controllers

1. Create the necessary Stimulus controllers:

```bash
# Create theme controller
touch app/javascript/controllers/theme_controller.js
# Create tabs controller
touch app/javascript/controllers/tabs_controller.js
# Create other controllers as needed
```

2. Implement the Stimulus controllers:

Example for the theme controller:

```js
// app/javascript/controllers/theme_controller.js
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

## Step 5: Create Layout and Partials

1. Create application layout:

```erb
<!-- app/views/layouts/application.html.erb -->
<!DOCTYPE html>
<html lang="en" class="<%= cookies[:theme] || 'light' %>">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Genderbase</title>
    <meta name="description" content="Educational resources about topics of gender">
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

2. Create header partial:

```erb

```

## Step 6: Create Models

Create the necessary models:

```bash
# Create Article model
rails g model Article title:string description:text content:text category:string author:string slug:string

# Create Question model
rails g model Question title:string content:text status:string anonymous:boolean

# Create Answer model
rails g model Answer content:text responder:references question:references

# Create migrations
rails db:migrate
```

## Step 7: Create Controllers and Views

1. Create controllers:

```bash
# Create Home controller
rails g controller Home index

# Create KnowledgeBase controller
rails g controller KnowledgeBase index show

# Create other controllers
rails g controller HowDoISay index
rails g controller Questions new create
rails g controller AnsweredQuestions index
```

2. Implement controllers, for example:

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

3. Create views for each controller, converting from static HTML to ERB, for example:

```erb
<!-- app/views/knowledge_base/index.html.erb -->
<main class="flex-1">
  <section class="w-full py-12 md:py-24 lg:py-32">
    <div class="container px-4 md:px-6">
      <div class="flex flex-col items-center space-y-4 text-center">
        <div class="space-y-2">
          <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Knowledge Base</h1>
          <p class="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Educational resources about gender topics that you can share with partners, friends, parents, or
            coworkers.
          </p>
        </div>
      </div>

      <div class="mx-auto max-w-5xl py-12">
        <div data-controller="tabs" class="w-full">
          <div class="grid w-full grid-cols-6" role="tablist" data-tabs-target="list">
            <button data-tabs-target="trigger" data-action="tabs#select" data-tab="all" class="px-3 py-2 font-medium text-sm rounded-md data-active:bg-primary data-active:text-primary-foreground" role="tab" aria-selected="true">All</button>
            <button data-tabs-target="trigger" data-action="tabs#select" data-tab="basics" class="px-3 py-2 font-medium text-sm rounded-md data-active:bg-primary data-active:text-primary-foreground" role="tab" aria-selected="false">Basics</button>
            <button data-tabs-target="trigger" data-action="tabs#select" data-tab="support" class="px-3 py-2 font-medium text-sm rounded-md data-active:bg-primary data-active:text-primary-foreground" role="tab" aria-selected="false">Support</button>
            <button data-tabs-target="trigger" data-action="tabs#select" data-tab="communication" class="px-3 py-2 font-medium text-sm rounded-md data-active:bg-primary data-active:text-primary-foreground" role="tab" aria-selected="false">Communication</button>
            <button data-tabs-target="trigger" data-action="tabs#select" data-tab="workplace" class="px-3 py-2 font-medium text-sm rounded-md data-active:bg-primary data-active:text-primary-foreground" role="tab" aria-selected="false">Workplace</button>
            <button data-tabs-target="trigger" data-action="tabs#select" data-tab="parenting" class="px-3 py-2 font-medium text-sm rounded-md data-active:bg-primary data-active:text-primary-foreground" role="tab" aria-selected="false">Parenting</button>
          </div>

          <div data-tabs-target="content" data-tab="all" class="mt-6">
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <% @articles.each do |article| %>
                <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div class="flex flex-col space-y-1.5 p-6 pb-2">
                    <h3 class="text-xl font-semibold leading-none tracking-tight"><%= article.title %></h3>
                    <p class="text-sm text-muted-foreground"><%= article.description %></p>
                  </div>
                  <div class="p-6">
                    <p class="text-sm text-muted-foreground">By <%= article.author %></p>
                  </div>
                  <div class="flex items-center p-6 pt-0">
                    <%= link_to knowledge_base_path(article.slug), class: "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 py-2 w-full" do %>
                      Read Article
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1 h-4 w-4">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    <% end %>
                  </div>
                </div>
              <% end %>
            </div>
          </div>

          <% ["basics", "support", "communication", "workplace", "parenting"].each do |category| %>
            <div data-tabs-target="content" data-tab="<%= category %>" class="hidden mt-6">
              <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <% @articles.select { |article| article.category == category }.each do |article| %>
                  <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div class="flex flex-col space-y-1.5 p-6 pb-2">
                      <h3 class="text-xl font-semibold leading-none tracking-tight"><%= article.title %></h3>
                      <p class="text-sm text-muted-foreground"><%= article.description %></p>
                    </div>
                    <div class="p-6">
                      <p class="text-sm text-muted-foreground">By <%= article.author %></p>
                    </div>
                    <div class="flex items-center p-6 pt-0">
                      <%= link_to knowledge_base_path(article.slug), class: "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 py-2 w-full" do %>
                        Read Article
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1 h-4 w-4">
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      <% end %>
                    </div>
                  </div>
                <% end %>
              </div>
            </div>
          <% end %>
        </div>
      </div>
    </div>
  </section>
</main>
```

## Step 8: Set Up Routes

Configure routes in `config/routes.rb`:

```ruby
Rails.application.routes.draw do
  root to: 'home#index'

  # Knowledge Base
  get '/knowledge-base', to: 'knowledge_base#index'
  get '/knowledge-base/:id', to: 'knowledge_base#show', as: :knowledge_base

  # How Do I Say
  get '/how-do-i-say', to: 'how_do_i_say#index'

  # Questions
  get '/ask', to: 'questions#new', as: :new_question
  post '/ask', to: 'questions#create'

  # Answered Questions
  get '/answered-questions', to: 'answered_questions#index'

  # Responder
  get '/responder', to: 'responder#index'

  # Other routes...
end
```

## Step 9: Add Seed Data

Create seed data for your application:

```ruby
# db/seeds.rb
articles = [
  {
    title: "Understanding Gender Identity",
    description: "An introduction to gender identity concepts and terminology.",
    content: "...", # Full article content
    category: "basics",
    author: "Dr. Jane Smith",
    slug: "understanding-gender-identity"
  },
  {
    title: "Supporting Transgender Loved Ones",
    description: "How to be an ally to transgender friends and family members.",
    content: "...", # Full article content
    category: "support",
    author: "Alex Johnson",
    slug: "supporting-transgender-loved-ones"
  },
  # Add more articles...
]

articles.each do |article|
  Article.create!(article)
end

# Run with: rails db:seed
```

## Step 10: Test and Launch

1. Start your Rails server:

```bash
rails server
```

2. Visit [localhost:3000](http://localhost:3000) to test your application

3. Deploy your Rails application to your preferred hosting platform following their specific deployment instructions.

## Additional Tips

1. **Authentication**: Add authentication for the responder section using Devise or another authentication gem.

2. **Active Storage**: Use Active Storage for file uploads if needed.

3. **Action Text**: Consider using Action Text for rich text content in articles and answers.

4. **Turbo**: Implement Turbo for improved page navigation without full page reloads.

5. **Testing**: Write tests for your models, controllers, and views using RSpec or Minitest.

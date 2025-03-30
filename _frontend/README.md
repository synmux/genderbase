# Genderbase - Static HTML/CSS with Stimulus

This repository contains the static HTML/CSS version of Genderbase with Stimulus for JavaScript interactions. This guide will help you merge this frontend into a Rails application.

## Structure Overview

The codebase has been converted from a Next.js application to a static HTML/CSS site with Stimulus controllers for dynamic functionality. The structure is as follows:

```plaintext
genderbase/
├── assets/
│   ├── css/
│   │   ├── tailwind.css        # Main CSS file with Tailwind styles
│   │   └── application.css     # Additional custom styles
│   ├── js/
│   │   ├── controllers/        # Stimulus controllers
│   │   └── application.js      # Main JavaScript file
│   └── images/                 # Image assets
├── views/                      # HTML views
│   ├── layouts/
│   │   └── application.html    # Main layout template
│   ├── partials/
│   │   ├── _header.html        # Header partial
│   │   ├── _footer.html        # Footer partial
│   │   └── ...                 # Other partials
│   ├── pages/
│   │   ├── index.html          # Homepage
│   │   ├── knowledge-base.html # Knowledge base page
│   │   └── ...                 # Other pages
├── README.md                   # This file
└── rails-integration.md        # Rails integration guide
```

## Merging into Rails

This static HTML/CSS/Stimulus codebase can be integrated into a Rails application. Here's how:

### 1. Set Up Rails with Stimulus

Ensure your Rails app has Stimulus installed:

```bash
# If starting a new Rails app
rails new genderbase --javascript=stimulus

# If adding to existing app
rails webpacker:install:stimulus
```

### 2. Copy Assets

1. Copy the CSS files to your Rails app:

   - Copy `assets/css/tailwind.css` to `app/assets/stylesheets/tailwind.css`
   - Copy `assets/css/application.css` to `app/assets/stylesheets/application.css`

2. Configure Tailwind CSS in your Rails app:

   - Install Tailwind CSS in your Rails app following the [official documentation](https://tailwindcss.com/docs/guides/ruby-on-rails)

3. Copy JavaScript controllers:
   - Copy `assets/js/controllers/` to `app/javascript/controllers/`
   - Update your `app/javascript/controllers/index.js` to register these controllers

### 3. Convert HTML to ERB Templates

1. Convert layout files:

   - Copy `views/layouts/application.html` to `app/views/layouts/application.html.erb`
   - Update with Rails-specific tags like <%= yield %>, <%= csrf_meta_tags %>, etc.

2. Convert partials:

   - Copy `views/partials/_header.html` to `app/views/shared/_header.html.erb`
   - Copy `views/partials/_footer.html` to `app/views/shared/_footer.html.erb`
   - Update with Rails helpers for links, etc.

3. Convert page templates:
   - Create appropriate controllers in Rails
   - Copy HTML content from `views/pages/` to corresponding `app/views/` directories
   - Convert to ERB format and use Rails helpers for links, forms, etc.

### 4. Set Up Routes

Configure your Rails routes to match the expected URL patterns:

```ruby
# config/routes.rb
Rails.application.routes.draw do
  root to: 'home#index'

  get '/knowledge-base', to: 'knowledge_base#index'
  get '/knowledge-base/:id', to: 'knowledge_base#show'

  get '/how-do-i-say', to: 'how_do_i_say#index'

  get '/ask', to: 'questions#new'
  post '/ask', to: 'questions#create'

  get '/answered-questions', to: 'answered_questions#index'

  # Other routes...
end
```

### 5. Create Controllers

Create the necessary Rails controllers to handle these routes.

### 6. Database Migration

Create appropriate models and migrations based on the data structure. For example:

```ruby
rails g model Article title:string description:text content:text category:string author:string slug:string
rails g model Question title:string content:text status:string anonymous:boolean
rails g model Answer content:text responder:references question:references
```

For more detailed instructions, see the [rails-integration.md](rails-integration.md) file.

source "https://rubygems.org"

ruby "3.4.3"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 8.0.2"

# Fileutils [https://github.com/ruby/fileutils]
gem "fileutils"

# The modern asset pipeline for Rails [https://github.com/rails/propshaft]
gem "propshaft"

# Use sqlite3 as the database for Active Record
gem "sqlite3"

# Use the Puma web server [https://github.com/puma/puma]
gem "puma"

# Bundle and transpile JavaScript [https://github.com/rails/jsbundling-rails]
gem "jsbundling-rails"

# Bundle and transpile CSS [https://github.com/rails/cssbundling-rails]
gem "cssbundling-rails"

# Hotwire's SPA-like page accelerator [https://turbo.hotwired.dev]
gem "turbo-rails"

# Hotwire's modest JavaScript framework [https://stimulus.hotwired.dev]
gem "stimulus-rails"

# Build JSON APIs with ease [https://github.com/rails/jbuilder]
gem "jbuilder"

# Use Active Model has_secure_password [https://guides.rubyonrails.org/active_model_basics.html#securepassword]
gem "bcrypt"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[ mingw mswin x64_mingw jruby ]

# Use the database-backed adapters for Rails.cache, Active Job, and Action Cable
gem "solid_cache" # Solid Cache [https://github.com/rails/solid_cache]
gem "solid_queue" # Solid Queue [https://github.com/rails/solid_queue]
gem "solid_cable" # Solid Cable [https://github.com/rails/solid_cable]

# Devise authentication [https://github.com/heartcombo/devise]
gem "devise"

# Argon2 for Devise [https://github.com/erdostom/devise-argon2]
gem "devise-argon2"

# Password strength validation for Devise [https://github.com/bitzesty/devise_zxcvbn]
gem "devise_zxcvbn"

# Markdown parsing [https://github.com/gettalong/kramdown]
gem "kramdown"

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
gem "image_processing"

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

# Deploy this application anywhere as a Docker container [https://kamal-deploy.org]
gem "kamal", require: false

# Add HTTP asset caching/compression and X-Sendfile acceleration to Puma [https://github.com/basecamp/thruster/]
gem "thruster", require: false

# Foreman task runner [https://github.com/ddollar/foreman]
gem "foreman", require: false


group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: %i[ mri mingw mswin x64_mingw ], require: "debug/prelude"

  # Static analysis for security vulnerabilities [https://brakemanscanner.org/]
  gem "brakeman", require: false

  # Ruby code style checker [https://github.com/rubocop/rubocop]
  gem "rubocop", require: false

  # Ruby code documentation [https://solargraph.org/]
  gem "solargraph", require: false

  # Omakase Ruby styling [https://github.com/rails/rubocop-rails-omakase/]
  gem "rubocop-rails-omakase", require: false

  # Pry console [https://github.com/pry/pry]
  gem "pry", require: false

  # Pry themes [https://github.com/pry/pry-theme]
  gem "pry-theme", require: false
end

group :development do
  # Use console on exceptions pages [https://github.com/rails/web-console]
  gem "web-console"

  # Livereload for Hotwire [https://github.com/hotwired/hotwire-livereload]
  gem "hotwire-livereload"
end

group :test do
  # Use system testing [https://guides.rubyonrails.org/testing.html#system-testing]
  gem "capybara"

  # WebDriver for Capybara [https://github.com/SeleniumHQ/selenium]
  gem "selenium-webdriver"

  # Code coverage reporting [https://github.com/simplecov-ruby/simplecov]
  gem "simplecov", require: false
end

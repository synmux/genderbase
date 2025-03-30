# Running the Genderbase Static Site

This document provides instructions for running the static HTML/CSS/Stimulus version of Genderbase.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository or download the source code
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

## Building the CSS

To build the Tailwind CSS file:

```bash
npm run build:css
```

This will generate the compiled CSS file in `public/css/tailwind.css`.

## Running the Site

To start a local web server:

```bash
npm start
```

This will start a local server using the `serve` package. By default, the site will be available at http://localhost:3000.

## Development

For development with live CSS updates:

```bash
npm run watch:css
```

This will watch for changes in the CSS files and automatically rebuild the CSS when changes are detected.

## Project Structure

- `assets/` - Source files for CSS and JavaScript
  - `css/` - CSS source files
  - `js/` - JavaScript source files, including Stimulus controllers
- `views/` - HTML views
  - `layouts/` - Layout templates
  - `pages/` - Page templates
- `public/` - Compiled and static assets
  - `css/` - Compiled CSS files

## Merging with Rails

See the [README.md](README.md) and [rails-integration.md](rails-integration.md) files for detailed instructions on how to merge this static site into a Rails application.

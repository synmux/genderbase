# Conversion Summary: Next.js to Static HTML/CSS/Stimulus

This document summarizes the conversion of the Genderbase application from Next.js to a static HTML/CSS site with Stimulus for JavaScript interactions.

## Overview of Changes

### Architecture Changes

- **Removed React dependencies**: Eliminated all React-related dependencies, components, and patterns
- **Replaced NextJS routing**: Converted to standard HTML files with directory-based navigation
- **Simplified JavaScript**: Replaced React components with Stimulus controllers
- **Flattened components**: Converted React components to static HTML with appropriate CSS classes

### Directory Structure Changes

| Original (Next.js) | New (Static)                     | Description     |
| ------------------ | -------------------------------- | --------------- |
| `app/`             | `views/pages/`                   | Page templates  |
| `components/`      | `views/partials/`                | UI components   |
| `app/layout.tsx`   | `views/layouts/application.html` | Layout template |
| `app/globals.css`  | `assets/css/tailwind.css`        | Global CSS      |

### Framework-specific Changes

1. **Client-side Navigation**

   - Before: Next.js Link components and router
   - After: Standard HTML anchor tags

2. **State Management**

   - Before: React hooks and context
   - After: Stimulus controllers with targets and actions

3. **Component Structure**

   - Before: React components with props
   - After: HTML elements with data attributes for Stimulus

4. **Styling**
   - Before: Tailwind CSS within React components
   - After: Tailwind CSS classes on HTML elements

## Key Files Created

### HTML Files

- `views/layouts/application.html` - Main layout template
- `views/pages/index.html` - Home page
- `views/pages/knowledge-base.html` - Knowledge base listing
- `views/pages/knowledge-base/understanding-gender-identity.html` - Sample article page
- `views/pages/ask.html` - Question submission form

### CSS Files

- `assets/css/tailwind.css` - Main Tailwind CSS file
- `assets/css/application.css` - Additional custom styles

### JavaScript Files

- `assets/js/application.js` - Main JavaScript file
- `assets/js/controllers/theme_controller.js` - Controller for dark/light theme toggle
- `assets/js/controllers/tabs_controller.js` - Controller for tabbed interfaces
- `assets/js/controllers/form_controller.js` - Controller for form handling

### Configuration Files

- `tailwind.config.js` - Tailwind CSS configuration
- `package.json` - Dependencies and scripts
- `index.html` - Root redirect file

## Benefits of the Conversion

1. **Simplicity**: Less complexity without React's abstraction layers
2. **Performance**: Faster initial page load with static HTML
3. **Maintainability**: Easier for developers who are primarily Ruby/Rails developers to understand
4. **Integration**: Simpler to merge into a Rails application

## Rails Integration Path

The static version is structured to make integration with Rails straightforward:

1. HTML files can be converted to ERB templates
2. Stimulus controllers work directly with Rails Stimulus integration
3. Tailwind CSS configuration is compatible with Rails Tailwind integration

See the [rails-integration.md](rails-integration.md) file for detailed instructions on integrating with Rails.

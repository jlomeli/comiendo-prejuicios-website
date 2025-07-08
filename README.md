# Comiendo Prejuicios Website

[![Unit Tests CI](https://github.com/yourusername/comiendo-prejuicios-website/actions/workflows/test.yml/badge.svg)](https://github.com/yourusername/comiendo-prejuicios-website/actions/workflows/test.yml)
[![Unit Tests Coverage](https://github.com/yourusername/comiendo-prejuicios-website/actions/workflows/coverage.yml/badge.svg)](https://github.com/yourusername/comiendo-prejuicios-website/actions/workflows/coverage.yml)

A modern, responsive website for a therapy practice built with Astro and Tailwind CSS.

## Features

- Fast, static site generation with Astro
- Responsive design with Tailwind CSS
- Optimized images and assets
- Accessible UI components
- Content collections for services and team members
- Dynamic routing for service pages
- Contact form with validation
- Smooth animations with GSAP

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/comiendo-prejuicios-website.git
cd comiendo-prejuicios-website

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

### Build

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

## Testing

The project uses Vitest for unit testing components and utility functions.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure

- `tests/` - Contains all test files
  - `components/` - Component tests
  - `scripts/` - Utility script tests
  - `utils/` - Test utilities

### Testing Approach

- Component tests verify the correct rendering of UI elements
- Script tests validate client-side functionality
- Mock implementations are used to isolate components from external dependencies

## Accessibility

This project is committed to maintaining WCAG 2.1 AA compliance. We have a comprehensive accessibility plan to ensure all components meet accessibility standards.

### Accessibility Documentation

- `docs/accessibility/a11y-compliance-plan.md` - Detailed accessibility implementation plan
- `docs/accessibility/component-checklist.md` - Component-specific accessibility checklist
- `docs/accessibility/testing-setup.md` - Guide for setting up accessibility testing tools

### Key Accessibility Features

- Semantic HTML structure
- ARIA attributes for enhanced screen reader support
- Keyboard navigation support
- Focus management for interactive elements
- Color contrast compliance
- Logical heading hierarchy
- Accessible form controls and error messages

### Accessibility Testing

```bash
# Install accessibility testing dependencies
npm install --save-dev axe-core @axe-core/playwright

# Run accessibility tests
npm run test:a11y
```

## Project Structure

- `src/` - Source code
  - `components/` - Reusable Astro components
  - `config/` - Configuration files
  - `content/` - Markdown content collections
  - `layouts/` - Page layouts
  - `pages/` - Page components and routes
    - `index.astro` - Home page
    - `about.astro` - About page with team information
    - `services/[slug].astro` - Dynamic service pages
  - `scripts/` - Client-side JavaScript
  - `styles/` - Global CSS styles
  - `types/` - TypeScript type definitions
- `public/` - Static assets
  - `fonts/` - Web fonts
  - `icons/` - SVG icons
  - `images/` - Image assets
- `tests/` - Test files
- `docs/` - Documentation
  - `accessibility/` - Accessibility documentation and guidelines

## License

This project is licensed under the MIT License - see the LICENSE file for details.
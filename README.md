# Comiendo Prejuicios Website

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

## Project Structure

- `src/` - Source code
  - `components/` - Reusable Astro components
  - `config/` - Configuration files
  - `content/` - Markdown content collections
  - `layouts/` - Page layouts
  - `pages/` - Page components and routes
  - `scripts/` - Client-side JavaScript
  - `styles/` - Global CSS styles
  - `types/` - TypeScript type definitions
- `public/` - Static assets
  - `fonts/` - Web fonts
  - `icons/` - SVG icons
  - `images/` - Image assets
- `tests/` - Test files

## License

This project is licensed under the MIT License - see the LICENSE file for details.
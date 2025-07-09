# Accessibility Testing Setup Guide

This guide explains how to set up and use accessibility testing tools for the Comiendo Prejuicios website.

## Automated Testing with axe-core

### Installation

```bash
npm install --save-dev @axe-core/playwright
```

### Integration with Vitest

Create a new test file at `tests/accessibility/a11y-test.ts`:

```typescript
import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

test('should not have any automatically detectable accessibility issues', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Navigate to your local dev server
  await page.goto('http://localhost:3000');
  
  // Analyze the page with axe
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  
  expect(accessibilityScanResults.violations).toEqual([]);
  
  await browser.close();
});
```

### Running Accessibility Tests

```bash
npm run test:a11y
```

Add this script to your `package.json`:

```json
{
  "scripts": {
    "test:a11y": "vitest run tests/accessibility/a11y-test.ts"
  }
}
```

## Component-Level Testing

### Installation

```bash
npm install --save-dev axe-core @testing-library/dom
```

### Example Component Test

```typescript
import { describe, it, expect } from 'vitest';
import { renderHTML } from '../utils/test-utils';
import axe from 'axe-core';

describe('NavBar Component Accessibility', () => {
  it('should not have any accessibility violations', async () => {
    // Create a simplified version of the component or use actual rendering
    const html = `
      <header class="fixed w-full top-0 z-50">
        <nav class="container mx-auto px-6 py-4" aria-label="Main navigation">
          <!-- Component HTML -->
        </nav>
      </header>
    `;
    
    const { container } = renderHTML(html);
    document.body.appendChild(container);
    
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
    
    document.body.removeChild(container);
  });
});
```

## Manual Testing Tools

### Keyboard Navigation Testing

Test keyboard navigation by:

1. Using Tab to navigate through interactive elements
2. Using Enter/Space to activate buttons and links
3. Using Escape to close dialogs/menus
4. Using arrow keys for custom controls

### Screen Reader Testing

#### VoiceOver (macOS)

- Enable: Cmd + F5
- Navigate: Ctrl + Option + arrow keys
- Interact: Ctrl + Option + Space

#### NVDA (Windows)

- Download from: https://www.nvaccess.org/
- Navigate: Tab, arrow keys
- Read current item: NVDA + down arrow

### Color Contrast Testing

#### Browser DevTools

1. Open browser DevTools
2. Use the Accessibility tab or Lighthouse audit
3. Check color contrast ratios

#### WebAIM Contrast Checker

https://webaim.org/resources/contrastchecker/

## CI/CD Integration

### GitHub Actions

Add this to `.github/workflows/accessibility.yml`:

```yaml
name: Accessibility Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  a11y:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Build site
        run: npm run build
      - name: Start server
        run: npm run preview &
      - name: Wait for server
        run: sleep 5
      - name: Run accessibility tests
        run: npm run test:a11y
```

## Recommended Browser Extensions

- axe DevTools (Chrome, Firefox)
- WAVE Evaluation Tool (Chrome, Firefox)
- Accessibility Insights (Chrome)
- Lighthouse (Chrome DevTools)

## Documentation Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [axe-core API Documentation](https://github.com/dequelabs/axe-core/blob/develop/doc/API.md)
- [A11y Project Resources](https://www.a11yproject.com/resources/)
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility) 
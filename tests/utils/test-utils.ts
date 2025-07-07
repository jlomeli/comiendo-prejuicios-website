import * as jsdom from '@testing-library/dom';

/**
 * Renders HTML string and returns testing-library utilities
 * @param html - The HTML string to render
 * @returns The testing-library utilities
 */
export function renderHTML(html: string) {
  const container = document.createElement('div');
  container.innerHTML = html;
  
  return {
    container,
    ...jsdom.getQueriesForElement(container),
  };
}

/**
 * Mocks a simple Astro object with commonly used properties
 * @returns A mocked Astro object
 */
export function mockAstro() {
  return {
    request: {
      url: new URL('http://localhost:3000'),
    },
    props: {},
  };
} 
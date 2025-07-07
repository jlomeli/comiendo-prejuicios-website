import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock GSAP
vi.mock('gsap', () => {
  return {
    gsap: {
      fromTo: vi.fn(),
      to: vi.fn(),
      registerPlugin: vi.fn(),
      utils: {
        toArray: vi.fn().mockImplementation((selector) => {
          if (typeof selector === 'string') {
            return Array.from(document.querySelectorAll(selector));
          }
          return [selector];
        }),
      },
    },
    ScrollTrigger: {},
  };
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
}); 
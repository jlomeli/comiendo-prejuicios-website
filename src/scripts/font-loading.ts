// Font loading optimization using the Font Loading API
interface FontDefinition {
  family: string;
  weight?: string;
  style?: string;
}

// Make this a module
export {};

// Extend Document to include the Font Loading API
declare global {
  interface Document {
    fonts: FontFaceSet;
  }
}

const FONT_TIMEOUT = 3000; // 3 seconds timeout for font loading

const fonts: FontDefinition[] = [
  { family: 'Raleway', weight: '600' },
  { family: 'Open Sans', weight: '400' },
];

// Add a class to indicate fonts are loaded
const markFontsLoaded = () => {
  document.documentElement.classList.add('fonts-loaded');
};

// Handle font loading timeout
const handleTimeout = () => {
  markFontsLoaded();
  // Log warning only in development
  if (process.env.NODE_ENV === 'development') {
    console.warn('Font loading timed out after', FONT_TIMEOUT, 'ms');
  }
};

// Load fonts using Font Loading API with timeout
const loadFonts = async () => {
  if ('fonts' in document) {
    try {
      const fontPromises = fonts.map(font => 
        document.fonts.load(`${font.weight || 'normal'} 1em "${font.family}"`)
      );

      // Race between font loading and timeout
      await Promise.race([
        Promise.all(fontPromises),
        new Promise((_, reject) => setTimeout(() => reject('timeout'), FONT_TIMEOUT))
      ]);

      markFontsLoaded();
    } catch {
      // Handle both timeout and loading errors
      handleTimeout();
    }
  } else {
    // Fallback for browsers without Font Loading API
    markFontsLoaded();
  }
};

// Initialize font loading
void loadFonts(); 
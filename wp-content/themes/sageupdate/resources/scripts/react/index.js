import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App'; // Import the root React component

// Find the DOM element where the React app will be rendered
const rootElement = document.getElementById('react-root');

if (rootElement) {
  // Use React 18's createRoot API to render the App component
  const root = createRoot(rootElement);
  root.render(<App />);
}

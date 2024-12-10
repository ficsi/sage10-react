import domReady from '@roots/sage/client/dom-ready';
import 'scripts/react/index.js'
/**
 * Application entrypoint
 */
domReady(() => {
  console.log('DOM is ready!');

});

import.meta.webpackHot?.accept(console.error);


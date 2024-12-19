/**
 * Compiler configuration
 *
 * @see {@link https://roots.io/sage/docs sage documentation}
 * @see {@link https://bud.js.org/learn/config bud.js configuration guide}
 *
 * @type {import('@roots/bud').Config}
 */

export default async (app) => {
  /**
   * Application assets & entrypoints
   *
   * @see {@link https://bud.js.org/reference/bud.entry}
   * @see {@link https://bud.js.org/reference/bud.assets}
   */
  app
    .entry({
      app: ['@scripts/app.js', '@styles/app.scss'], // Main entry points for JS and CSS
    })
    .assets(['images']) // Include static assets like images
    .watch([
      'resources/views/**/*',
      'app/**/*',
      'resources/styles/**/*',
    ]) // Watch Blade templates and styles
    .setPublicPath('/wp-content/themes/sageupdate/public/'); // Set public path for assets

  // Enable React Fast Refresh (HMR)
  app.react.refresh.enable();

  /**
   * Development server settings
   *
   * Browsersync proxy and server configuration.
   *
   * @see {@link https://bud.js.org/reference/bud.proxy}
   * @see {@link https://bud.js.org/reference/bud.serve}
   */
  app
    .proxy('http://mysite.local') // Proxy to your Laragon WordPress site URL
    .serve({
      port: 3002, // Development server port
      ui: {port: 3003}, // BrowserSync UI port
    })
    .setUrl('http://localhost:3002'); // Ensure the development server URL is set correctly

  /**
   * Enable polling for file changes
   *
   * Polling is used when the file system is not triggering changes correctly,
   * common in WSL and VM environments.
   */
  app.hooks.on('dev.middleware.watchOptions', (watchOptions) => ({
    ...watchOptions,
    poll: 1000, // Poll every 1000ms for changes
  }));

  /**
   * Enable Hot Module Replacement (HMR)
   *
   * HMR allows you to inject updated modules into the browser without a full reload.
   */
  app.hooks.on('dev.middleware.hot', (hot) => ({
    ...hot,
    hmr: true, // Enable HMR for fast updates
  }));

  /**
   * Add extensions for React, Sass, and Tailwind CSS support
   *
   * @see {@link https://bud.js.org/extensions/}
   */
  app.use([
    '@roots/bud-react', // Add React support
    '@roots/bud-sass',  // Add Sass support
    '@roots/bud-tailwindcss', // Add Tailwind CSS support
  ]);

  /**
   * Generate WordPress `theme.json`
   *
   * @note This overwrites `theme.json` on every build.
   *
   * @see {@link https://bud.js.org/extensions/sage/theme.json}
   */
  app.wpjson
    .setSettings({
      color: {
        custom: false,
        customDuotone: false,
        customGradient: false,
        defaultPalette: false,
      },
      typography: {
        customFontSize: false,
      },
    })
    .useTailwindColors() // Use Tailwind colors in theme.json
    .useTailwindFontFamily() // Use Tailwind font families in theme.json
    .useTailwindFontSize(); // Use Tailwind font sizes in theme.json
};

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
      app: ['@scripts/app', '@styles/app'], // Main entry points for JS and CSS
    })
    .assets(['images']) // Include static assets like images
    .watch(['resources/views/**/*', 'app/**/*']) // Watch Blade templates and PHP files
    .proxy('http://mysite.local') // Replace with your Laragon WordPress site URL
    .serve('http://localhost:3000') // Browsersync server for hot reloading
    .setPublicPath('/wp-content/themes/sageupdate/public/');

  // Enable polling for file watching
  app.hooks.on('dev.middleware.watchOptions', (watchOptions) => ({
    ...watchOptions,
    poll: 1000, // Check for changes every 1000ms
  }));
  /**
   * Development server settings
   *
   * Browsersync proxy and server configuration.
   *
   * @see {@link https://bud.js.org/reference/bud.proxy}
   * @see {@link https://bud.js.org/reference/bud.serve}
   */
  app.proxy('http://mysite.local') // Replace with your Laragon site URL (e.g., http://mysite.local)
    .serve('http://localhost:3000') // Browsersync server for hot reloading
    .setUrl('http://localhost:3000'); // Ensure the development server URL is set correctly

  /**
   * Add extensions for React, Sass, and Tailwind CSS support
   *
   * @see {@link https://bud.js.org/extensions/}
   */
  app.use([
    '@roots/bud-react', // Add React support
    '@roots/bud-sass',  // Add Sass support
    '@roots/bud-tailwindcss', // Add Tailwind CSS support (if applicable)
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
    .useTailwindColors()
    .useTailwindFontFamily()
    .useTailwindFontSize();
};

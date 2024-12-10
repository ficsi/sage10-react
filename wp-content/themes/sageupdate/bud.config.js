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

  app.extensions.get('@roots/bud-wordpress-dependencies').disable();
  app.extensions.get('@roots/bud-wordpress-externals').disable();

  app
    .entry('app', ['@scripts/app', '@styles/app.scss'])
    .entry('editor', ['@scripts/editor', '@styles/editor.scss'])
    .assets(['images'])
    .watch(['resources/views/**/*', 'resources/scripts/**/*', 'resources/styles/**/*']) // Files to watch for changes
    .proxy('http://mysite.local') // Your local development URL (WordPress site URL)
    .serve('http://localhost:3003'); // Dev server URL


  /**
   * Set public path
   *
   * @see {@link https://bud.js.org/reference/bud.setPublicPath}
   */
  app.setPublicPath('/app/themes/sage/public/');


  /**
   * Development server settings
   *
   * @see {@link https://bud.js.org/reference/bud.setUrl}
   * @see {@link https://bud.js.org/reference/bud.setProxyUrl}
   * @see {@link https://bud.js.org/reference/bud.watch}
   */
  app
    .setUrl('https://localhost:3030')

    .setProxyUrl('https://mysite.local')
    .watch(['resources/views', 'app']);

  /**
   * Generate WordPress `theme.json`
   *
   * @note This overwrites `theme.json` on every build.
   *
   * @see {@link https://bud.js.org/extensions/sage/theme.json}
   * @see {@link https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json}
   */
  app.wpjson
    .setSettings({
      background: {
        backgroundImage: true,
      },
      color: {
        custom: false,
        customDuotone: false,
        customGradient: false,
        defaultDuotone: false,
        defaultGradients: false,
        defaultPalette: false,
        duotone: [],
      },
      custom: {
        spacing: {},
        typography: {
          'font-size': {},
          'line-height': {},
        },
      },
      spacing: {
        padding: true,
        units: ['px', '%', 'em', 'rem', 'vw', 'vh'],
      },
      typography: {
        customFontSize: false,
      },
    })
    .useTailwindColors()
    .useTailwindFontFamily()
    .useTailwindFontSize();

  app.use([
    '@roots/bud-react', // Add React support
    '@roots/bud-sass',  // Add Sass support
  ])
    .entry({
      app: ['@scripts/app', '@styles/app'], // Main entry points
    })
    .setPublicPath('/app/themes/sage/public/') // Adjust the public path for assets
    .watch(['resources/**/*']); // Watch for changes in resources directory
};

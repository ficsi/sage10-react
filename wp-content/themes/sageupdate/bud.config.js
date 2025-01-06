/**
 * Sage 10 + Bud Configuration
 *
 * @see {@link https://roots.io/sage/docs sage documentation}
 * @see {@link https://bud.js.org/learn/config bud.js configuration guide}
 *
 * @type {import('@roots/bud').Config}
 */
export default async (app) => {
  /**
   * Application Entry Points & Assets
   */
  app
    .entry({
      app: ['@scripts/app.js', '@styles/app.scss'], react: ['@scripts/react/index.js'],  // React entry point
    })
    .assets(['images'])

    .watch(['resources/**/*', 'resources/views/**/*', 'app/**/*'])


    .setPublicPath('/wp-content/themes/sageupdate/public/');

  /**
   * Development Server Configuration
   */
  app
    .proxy('http://mysite.local')
    .serve({
      port: 3002, ui: {port: 3003},
    })
    .setUrl('http://localhost:3002');

  /**
   * React Fast Refresh (HMR)
   */
  app.react.refresh.enable();

  /**
   * Watch and Hot Module Replacement (HMR)
   */
  app.hooks.on('dev.middleware.watchOptions', (watchOptions) => ({
    ...watchOptions, poll: 1000,
  }));

  app.hooks.on('dev.middleware.hot', (hot) => ({
    ...hot, hmr: true,
  }));
  app.hooks.on('devServer.middleware', (server) => {
    server.watch(['resources/styles/**/*.scss', 'public/css/**/*.css']);
  });

  /**
   * Extensions - React, Sass, Tailwind
   */
  app.use(['@roots/bud-react', '@roots/bud-sass', '@roots/bud-tailwindcss']);

  /**
   * WordPress theme.json Generation
   */
  app.wpjson
    .setSettings({
      color: {
        custom: false, customDuotone: false, customGradient: false, defaultPalette: false,
      }, typography: {
        customFontSize: false,
      },
    })
    .useTailwindColors()
    .useTailwindFontFamily()
    .useTailwindFontSize();
};

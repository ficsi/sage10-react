<!doctype html>
<html <?php (language_attributes()); ?>>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php (do_action('get_header')); ?>
    <?php (wp_head()); ?>
  </head>

  <body <?php (body_class()); ?>>
    <?php (wp_body_open()); ?>

    <div id="app">
      <a class="sr-only focus:not-sr-only" href="#main">
        <?php echo e(__('Skip to content')); ?>

      </a>

      <?php echo $__env->make('sections.header', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
      <span>react app bellow....</span>
      <?php echo $__env->make('partials.react', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?> <!-- Include the React app -->
      <span>react app above....</span>

      <main id="main" class="main">
        <?php echo $__env->yieldContent('content'); ?>
      </main>

      <?php if (! empty(trim($__env->yieldContent('sidebar')))): ?>
        <aside class="sidebar">
          <?php echo $__env->yieldContent('sidebar'); ?>
        </aside>
      <?php endif; ?>

      <?php echo $__env->make('sections.footer', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
    </div>

    <?php (do_action('get_footer')); ?>
    <?php (wp_footer()); ?>
  </body>
</html>
<?php /**PATH C:\laragon\www\mysite\wp-content\themes\sageupdate\resources\views/layouts/app.blade.php ENDPATH**/ ?>
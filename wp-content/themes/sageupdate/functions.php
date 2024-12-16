<?php

/*
|--------------------------------------------------------------------------
| Register The Auto Loader
|--------------------------------------------------------------------------
|
| Composer provides a convenient, automatically generated class loader for
| our theme. We will simply require it into the script here so that we
| don't have to worry about manually loading any of our classes later on.
|
*/

if (!file_exists($composer = __DIR__ . '/vendor/autoload.php')) {
    wp_die(__('Error locating autoloader. Please run <code>composer install</code>.', 'sage'));
}

require $composer;

/*
|--------------------------------------------------------------------------
| Register The Bootloader
|--------------------------------------------------------------------------
|
| The first thing we will do is schedule a new Acorn application container
| to boot when WordPress is finished loading the theme. The application
| serves as the "glue" for all the components of Laravel and is
| the IoC container for the system binding all of the various parts.
|
*/

if (!function_exists('\Roots\bootloader')) {
    wp_die(
        __('You need to install Acorn to use this theme.', 'sage'),
        '',
        [
            'link_url'  => 'https://roots.io/acorn/docs/installation/',
            'link_text' => __('Acorn Docs: Installation', 'sage'),
        ]
    );
}

\Roots\bootloader()->boot();

/*
|--------------------------------------------------------------------------
| Register Sage Theme Files
|--------------------------------------------------------------------------
|
| Out of the box, Sage ships with categorically named theme files
| containing common functionality and setup to be bootstrapped with your
| theme. Simply add (or remove) files from the array below to change what
| is registered alongside Sage.
|
*/

collect(['setup', 'filters'])
    ->each(function ($file) {
        if (!locate_template($file = "app/{$file}.php", true, true)) {
            wp_die(
            /* translators: %s is replaced with the relative file path */
                sprintf(__('Error locating <code>%s</code> for inclusion.', 'sage'), $file)
            );
        }
    });


/*
 * ACRON INIT
 */


if (!function_exists('\Roots\bootloader')) {
    wp_die(
        __('You need to install Acorn to use this site.', 'domain'),
        '',
        [
            'link_url'  => 'https://roots.io/acorn/docs/installation/',
            'link_text' => __('Acorn Docs: Installation', 'domain'),
        ]
    );
}

add_action('after_setup_theme', fn() => \Roots\bootloader()->boot(), 0);

///////////////
//add_action('wp_enqueue_scripts', function () {
//    wp_enqueue_script(
//        'react-demo-app', // Handle name
//        asset('react/react-demo/index.js'), // Path to your React app's bundled JS
//        ['wp-element'], // Dependencies, e.g., for React if using WordPress React
//        null,
//        true // Load in the footer
//    );
//});

//Register custom fields for posts down below
function add_custom_fields_to_posts_rest_api(): void
{
    // Define an array of custom field keys you want to expose
    $custom_fields = array('test_scf', 'relation_news', 'repeater_test', 'background_color', 'post_image');

    foreach ($custom_fields as $field) {
        register_rest_field('post', $field, array(
            'get_callback'    => function ($object) use ($field) {
                // Use get_field() for ACF to handle complex fields like groups or repeaters
                return get_field($field, $object['id']);
            },
            'update_callback' => null,
            'schema'          => null,
        ));
    }
}

add_action('rest_api_init', 'add_custom_fields_to_posts_rest_api');


//Register custom fields for pages down below
function add_custom_fields_to_pages_rest_api(): void
{
    $custom_fields = array('custom_field_key1', 'custom_field_key2', 'custom_field_key3'); // Add your field keys here

    foreach ($custom_fields as $field) {
        register_rest_field('page', $field, array(
            'get_callback'    => function ($object) use ($field) {
                return get_post_meta($object['id'], $field, true);
            },
            'update_callback' => null,
            'schema'          => null,
        ));
    }
}

add_action('rest_api_init', 'add_custom_fields_to_pages_rest_api');

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
            'get_callback' => function ($object) use ($field) {
                // Handle relation_news field specifically
                if ($field === 'relation_news') {
                    $related_posts = get_field($field, $object['id']); // Fetch relation_news field

                    if (is_array($related_posts)) {
                        // Iterate over related posts and fetch their default and custom fields
                        return array_map(function ($related_post) {
                            // Ensure $related_post is a WP_Post object
                            if (!($related_post instanceof WP_Post)) {
                                $related_post = get_post($related_post); // Convert ID to WP_Post object
                            }

                            if (!$related_post) return null;

                            // Fetch default WordPress REST API fields
                            $default_fields = [
                                'id'      => $related_post->ID,
                                'title'   => get_the_title($related_post->ID),
                                'content' => apply_filters('the_content', $related_post->post_content),
                                'excerpt' => apply_filters('the_excerpt', $related_post->post_excerpt),
                                'date'    => get_the_date('', $related_post->ID),
                                'link'    => get_permalink($related_post->ID),
                                'slug'    => $related_post->post_name
                            ];

                            // Fetch custom fields for the related post
                            $custom_fields = [
                                'test_scf'         => get_field('test_scf', $related_post->ID),
                                'repeater_test'    => get_field('repeater_test', $related_post->ID),
                                'background_color' => get_field('background_color', $related_post->ID),
                                'post_image'       => get_field('post_image', $related_post->ID),
                            ];

                            // Merge default and custom fields
                            return array_merge($default_fields, ['custom_fields' => $custom_fields]);
                        }, $related_posts);
                    }

                    return null; // Return null if relation_news is not an array
                }

                // For other fields, return their values directly
                return get_field($field, $object['id']);
            },
            'update_callback' => null,
            'schema'          => null,
        ));
    }
}

add_action('rest_api_init', 'add_custom_fields_to_posts_rest_api');



//Register custom fields for pages down below
//function add_custom_fields_to_pages_rest_api(): void
//{
//    $custom_fields = array('custom_field_key1', 'custom_field_key2', 'custom_field_key3'); // Add your field keys here
//
//    foreach ($custom_fields as $field) {
//        register_rest_field('page', $field, array(
//            'get_callback'    => function ($object) use ($field) {
//                return get_post_meta($object['id'], $field, true);
//            },
//            'update_callback' => null,
//            'schema'          => null,
//        ));
//    }
//}
//
//add_action('rest_api_init', 'add_custom_fields_to_pages_rest_api');

//Register Previous and Next posts to wp res api
function add_next_previous_posts_to_rest(): void
{
    register_rest_field('post', 'next_post', array(
        'get_callback' => function ($post) {
            $next_post = get_next_post();
            if ($next_post) {
                return array(
                    'id' => $next_post->ID,
                    'title' => $next_post->post_title,
                    'link' => get_permalink($next_post->ID),
                );
            }
            return null;
        },
        'schema' => null,
    ));

    register_rest_field('post', 'previous_post', array(
        'get_callback' => function ($post) {
            $previous_post = get_previous_post();
            if ($previous_post) {
                return array(
                    'id' => $previous_post->ID,
                    'title' => $previous_post->post_title,
                    'link' => get_permalink($previous_post->ID),
                );
            }
            return null;
        },
        'schema' => null,
    ));
}

add_action('rest_api_init', 'add_next_previous_posts_to_rest');

//Custom route rules for posts
add_action('init', function () {
    add_rewrite_rule('^post/([^/]*)/?', 'index.php?pagename=post&name=$matches[1]', 'top');
});

function my_theme_enqueue_scripts(): void
{
    // Search for a CSS file that starts with 'app' in the public directory
    $css_files = glob(get_template_directory() . '/public/css/app*.css');

    // If any CSS file is found, enqueue the first one
    if (!empty($css_files)) {
        // Get the first matching CSS file (app.css or app.a123d4.css)
        $css_file = $css_files[0];

        // Enqueue the found CSS file
        wp_enqueue_style('theme-style', get_template_directory_uri() . '/public/css/' . basename($css_file), [], null, 'all');
    }
}

add_action('wp_enqueue_scripts', 'my_theme_enqueue_scripts');

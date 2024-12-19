
## Overview

Sage is a WordPress starter theme with block editor support.

- Harness the power of [Laravel](https://laravel.com) and its available packages thanks to [Acorn](https://github.com/roots/acorn)
- Clean, efficient theme templating utilizing [Laravel Blade](https://laravel.com/docs/master/blade)
- Modern frontend development workflow powered by [Bud](https://bud.js.org/)
- Out of the box support for [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

See the [Sage installation documentation](https://roots.io/sage/docs/installation/).




# Need to load WSL and type in terminal:
`/mnt/c/laragon/www/{my-site-name}`

# update bud.config
```  app.use([
    '@roots/bud-react', // Add React support
    '@roots/bud-sass',  // Add Sass support
  ])
    .entry({
      app: ['@scripts/app', '@styles/app'], // Main entry points
    })
    .setPublicPath('/app/themes/sage/public/') // Adjust the public path for assets
    .watch(['resources/**/*']); // Watch for changes in resources directory
```

# need to update functions.php in case want to update/change wp_rest_api

```
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
```


# Use the Host Machine's IP Address
## Find your Windows host IP: 
`cat /etc/resolv.conf | grep nameserver`
## Update the /etc/hosts file in WSL:
`sudo nano /etc/wsl.conf`

```
[boot]
systemd=true

[network]
generateHosts = false
```
`sudo nano /etc/hosts`
## Add the following line, replacing <IP> with the IP address you found:
`<IP> <SITENAME>.local`


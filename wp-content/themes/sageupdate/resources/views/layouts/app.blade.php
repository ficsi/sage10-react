<!doctype html>
<html @php(language_attributes())>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  @php(do_action('get_header'))
  @php(wp_head())

</head>

<body @php(body_class())>
@php(wp_body_open())

<div id="app">
  <a class="sr-only focus:not-sr-only" href="#main">
    {{ __('Skip to content') }}
  </a>

  @include('sections.header')


  <main id="main" class="main">
    {{--        @yield('content')--}}
    @include('partials.react') <!-- Include the React app -->

  </main>

  {{--      @hasSection('sidebar')--}}
  {{--        <aside class="sidebar">--}}
  {{--          @yield('sidebar')--}}
  {{--        </aside>--}}
  {{--      @endif--}}

  @include('sections.footer')
</div>

@php(do_action('get_footer'))
@php(wp_footer())
<script src="{{ asset('js/app.js') }}"></script>
{{--TEMPORARY linking stysheets this way--}}
<link rel="stylesheet" href="/wp-content/themes/sageupdate/resources/styles/app.scss">

</body>
</html>

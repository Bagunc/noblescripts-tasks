const mix = require('laravel-mix')
const webpack = require('webpack')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix .alias({
    "@": "resources/js",
    "~": "resources/scss",
    "@utils": "resources/js/utils",
    "@views": "resources/js/views",
    "@plugins": "resources/js/plugins",
    "@components": "resources/js/components",
  })

  .js('resources/js/app.js', 'public/js')
  .vue()
  .sass('resources/scss/style.scss', 'public/css')

  if (!mix.inProduction()) {
    const LiveReloadPlugin = require('webpack-livereload-plugin')

    mix .browserSync('http://127.0.0.1:8000')
        .webpackConfig({
          plugins: [
            new LiveReloadPlugin(),
            new webpack.DefinePlugin({
              __VUE_OPTIONS_API__: true,
              __VUE_PROD_DEVTOOLS__: true,
            }),
          ]
        })
  }

  mix.disableSuccessNotifications()

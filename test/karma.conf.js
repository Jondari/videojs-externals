module.exports = function (config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '..',

    frameworks: [
      'browserify',
      'jasmine',
    ],

    files: [
      "node_modules/video.js/dist/video.js",
      "src/videojs-externals.js",
      "test/ressources/*.html",
      "test/**/*.specs.js"
    ],

    exclude: [
      'test/bundle.js'
    ],

    plugins: [
      "karma-browserify",
      "karma-jasmine",
      "karma-chrome-launcher",
      "karma-detect-browsers",
      "karma-firefox-launcher",
      "karma-ie-launcher",
      "karma-safari-launcher",
      "karma-mocha-reporter"
    ],

    preprocessors: {
      'src/**/*.js': ['browserify'],
      'test/**/*.js': ['browserify'],
      "test/**/*.html": ["html2js"]
    },

    reporters: ['mocha'],
    port: 9876,
    colors: true,
    autoWatch: false,
    singleRun: true,
    concurrency: Infinity,

    browserify: {
      transform: [
        [
          'babelify',
          {"presets": ["es2015"]}
        ],
        'browserify-shim'
      ]
    }
  })
}

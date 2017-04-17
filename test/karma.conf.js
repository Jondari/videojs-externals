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
      'test/**/*.js': ['browserify']
    },

    reporters: ['mocha'],
    port: 9876,
    colors: true,
    autoWatch: false,
    singleRun: true,
    concurrency: Infinity,

    detectBrowsers: {
      /**
       * For https://github.com/litixsoft/karma-detect-browsers
       * @param availableBrowsers {Array}
       */
      postDetection: function (availableBrowsers) {

        // Manualy insert Chromium
        // Until https://github.com/litixsoft/karma-detect-browsers/issues/22 is resolved
        if (process.env.TRAVIS && !availableBrowsers.includes("Chromium")) {
          availableBrowsers.push("Chromium")
        }
        return availableBrowsers
      },
    },

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

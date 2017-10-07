const fs = require('fs');

module.exports = function (config) {
  var karmaBrowsers = process.env['BROWSERS'] ?
    process.env['BROWSERS'].split(':') :
    [
      'Chromium'
    ];

  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '..',

    browsers: karmaBrowsers,

    frameworks: [
      'browserify',
      'jasmine',
    ],

    files: [
      'node_modules/video.js/dist/video.js',
      'src/videojs-externals.js',
      'test/resources/*.html',
      'test/**/*.specs.js'
    ],

    exclude: [
      'test/unit/dailymotion.specs.js',
      // 'test/unit/mixcloud.specs.js',
      // 'test/unit/soundcloud.specs.js',
      // 'test/unit/youtube.specs.js',
    ],

    protocol: "https",
    // certs from https://github.com/gruntjs/grunt-contrib-connect/tree/master/tasks/certs
    httpsServerOptions: {
      key: fs.readFileSync(`${__dirname}/resources/ssl/server.key`, 'utf8'),
      cert: fs.readFileSync(`${__dirname}/resources/ssl/server.crt`, 'utf8')
    },

    plugins: [
      "karma-browserify",
      "karma-jasmine",
      "karma-chrome-launcher",
      "karma-detect-browsers",
      "karma-firefox-launcher",
      "karma-html2js-preprocessor",
      "karma-ie-launcher",
      "karma-safari-launcher",
      "karma-mocha-reporter"
    ],

    preprocessors: {
      'src/**/*.js': ['browserify'],
      'test/**/*.js': ['browserify'],
      'test/**/*.html': ['html2js']
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
          {
            'presets': ['es2015'],
            'plugins': ['transform-class-properties']
          }
        ],
        'browserify-shim'
      ],

    }
  });
};

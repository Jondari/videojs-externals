const fs = require('fs');

module.exports = function (config) {
  const BROWSERS = process.env['BROWSERS'] ?
    process.env['BROWSERS'].split(':') :
    [
      'MyChromium',
      'Firefox'
    ];
  const SPECS = process.env['SPECS'] ?
    process.env['SPECS'].split(':') : ['*'];
  const EX_SPECS = process.env['EX_SPECS'] ?
    process.env['EX_SPECS'].split(':') :
    [
      // Add a test to exlude in a format like below
      // 'test/unit/dailymotion.specs.js',
      // 'test/unit/jamendo.specs.js',
      // 'test/unit/mixcloud.specs.js',
      // 'test/unit/soundcloud.specs.js',
      // 'test/unit/youtube.specs.js',
    ];

  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '..',

    browsers: BROWSERS,

    frameworks: [
      'browserify',
      'jasmine',
    ],

    files: [
      'node_modules/video.js/dist/video.js',
      'src/videojs-externals.js',
      'test/resources/*.html',
      ...SPECS.map( spec => `test/**/${spec.toLowerCase().trim()}.specs.js`)
    ],

    exclude: EX_SPECS,

    protocol: "http",
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

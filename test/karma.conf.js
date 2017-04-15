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
      'test/**/*.html': ['html2js']
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
          {'presets': ['es2015']}
        ],
        'browserify-shim'
      ]
    }
  });
};

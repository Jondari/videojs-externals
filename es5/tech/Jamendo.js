'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = require('video.js');

var _video2 = _interopRequireDefault(_video);

var _Externals = require('./Externals');

var _Externals2 = _interopRequireDefault(_Externals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file Jamendo.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Jamendo (iframe) Media Controller - Wrapper for HTML5 Media API
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Component = _video2.default.getComponent('Component');
var Tech = _video2.default.getComponent('Tech');
var Html5 = _video2.default.getComponent('Html5');

/**
 * Jamendo Media Controller - Wrapper for HTML5 Tech
 *
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready Ready callback function
 * @extends Html5
 * @class Jamendo
 */

var Jamendo = function (_Html) {
  _inherits(Jamendo, _Html);

  function Jamendo(options, ready) {
    _classCallCheck(this, Jamendo);

    var _this = _possibleConstructorReturn(this, (Jamendo.__proto__ || Object.getPrototypeOf(Jamendo)).call(this, options, ready));

    _this.ready(function () {
      if (_this.src_) {
        _this.setPoster(_this.src_);
      }
    });
    return _this;
  }

  /**
   * Set jamendo source
   *
   * @param {Object=} src Source object
   */


  _createClass(Jamendo, [{
    key: 'src',
    value: function src(_src) {
      if (typeof _src !== 'undefined' && this.src_ !== _src) {
        _src = _Externals2.default.sourceToString(_src);
        this.src_ = _src;
        this.setSrc(_src);

        // Wait till we're ready to change the poster
        // Otherwise the "posterchange" event might be triggered
        // before any listeners are registered
        if (this.ready_) {
          this.setPoster(_src);
        }
      }
      return this.currentSrc();
    }
  }, {
    key: 'setPoster',
    value: function setPoster(jamendoSrc) {
      _get(Jamendo.prototype.__proto__ || Object.getPrototypeOf(Jamendo.prototype), 'setPoster', this).call(this, 'https://imgjam1.jamendo.com/tracks/s1466/' + Jamendo.parseSrc(jamendoSrc) + '/covers/1.300.jpg');
      this.trigger('posterchange');
    }
  }, {
    key: 'currentSrc',
    value: function currentSrc() {
      return this.src_;
    }
  }, {
    key: 'setSrc',
    value: function setSrc(src) {
      // Use the `tracks/file` API to build URL for a redirection to the file
      // https://developer.jamendo.com/v3.0/tracks/file
      // TODO test with more sources to see if the URL will change
      // Otherwise use the API to get the real mp3 URL
      _get(Jamendo.prototype.__proto__ || Object.getPrototypeOf(Jamendo.prototype), 'setSrc', this).call(this, 'https://mp3l.jamendo.com/?trackid=' + Jamendo.parseSrc(src) + '&format=mp31');
      // super.setSrc(`https://api.jamendo.com/v3.0/tracks/file/?client_id=${this.options_.clientId}&id=${Jamendo.parseSrc(src)}`);
    }

    /**
     * Extracts the track ID from a jamendo URL
     * @param src {String}
     */

  }], [{
    key: 'parseSrc',
    value: function parseSrc(src) {
      // https://www.jamendo.com/track/1465419/thunder-god
      var srcPath = new URL(src).pathname;
      var match = /\/?track\/(\d+).+/.exec(srcPath);
      return match ? match[1] : null;
    }
  }]);

  return Jamendo;
}(Html5);

// Add Source Handler pattern functions to this tech


exports.default = Jamendo;
Tech.withSourceHandlers(Jamendo);

/*
 * The default native source handler.
 * This simply passes the source to the video element. Nothing fancy.
 *
 * @param  {Object} source   The source object
 * @param  {Flash} tech  The instance of the Flash tech
 */
Jamendo.nativeSourceHandler = {};

/**
 * Check if Jamendo tech can play the given videotype
 * @param  {String} type    The mimetype to check
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Jamendo.nativeSourceHandler.canPlayType = function (source) {
  return source.indexOf('jamendo') !== -1;
};

/*
 * Check Jamendo can handle the source natively
 *
 * @param  {Object} source  The source object
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Jamendo.nativeSourceHandler.canHandleSource = function (source) {

  // If a type was provided we should rely on that
  if (source.type) {
    return Jamendo.nativeSourceHandler.canPlayType(source.type);
  } else if (source.src) {
    return Jamendo.nativeSourceHandler.canPlayType(source.src);
  } else if (typeof source === 'string') {
    return Jamendo.nativeSourceHandler.canPlayType(source);
  }

  return '';
};

Jamendo.nativeSourceHandler.handleSource = function (source, tech) {
  tech.src(source.src ? source.src : source);
};

/*
 * Clean up the source handler when disposing the player or switching sources..
 * (no cleanup is needed when supporting the format natively)
 */
Jamendo.nativeSourceHandler.dispose = function () {};

// Register the native source handler
Jamendo.registerSourceHandler(Jamendo.nativeSourceHandler);

Component.registerComponent('Jamendo', Jamendo);

Tech.registerTech('Jamendo', Jamendo);
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = require('video.js');

var _video2 = _interopRequireDefault(_video);

var _Externals2 = require('./Externals');

var _Externals3 = _interopRequireDefault(_Externals2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file Dailymotion.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Externals (iframe) Media Controller - Wrapper for HTML5 Media API
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Component = _video2.default.getComponent('Component');
var Tech = _video2.default.getComponent('Tech');

/**
 * Externals Media Controller - Wrapper for HTML5 Media API
 *
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready Ready callback function
 * @extends Tech
 * @class Dailymotion
 */

var Dailymotion = function (_Externals) {
  _inherits(Dailymotion, _Externals);

  function Dailymotion(options, ready) {
    _classCallCheck(this, Dailymotion);

    var _this = _possibleConstructorReturn(this, (Dailymotion.__proto__ || Object.getPrototypeOf(Dailymotion)).call(this, options, ready));

    _this.xhrs_ = {};
    return _this;
  }

  _createClass(Dailymotion, [{
    key: 'dispose',
    value: function dispose() {
      // Don't leave any survivors
      for (var date in this.xhrs_) {
        // jshint ignore:line
        //noinspection JSUnfilteredForInLoop
        this.xhrs_[date].abort();
      }
    }
  }, {
    key: 'createEl',
    value: function createEl() {
      var el_ = _get(Dailymotion.prototype.__proto__ || Object.getPrototypeOf(Dailymotion.prototype), 'createEl', this).call(this, 'iframe', {
        id: this.options_.techId,
        src: 'about:blank'
      });
      el_.className += ' vjs-dailymotion-loading';

      return el_;
    }
  }, {
    key: 'parseSrc',
    value: function parseSrc(src) {
      if (src) {
        // Regex that parse the video ID for any Dailymotion URL
        var regExp = /^.+dailymotion.com\/((video|hub)\/([^_]+))?[^#]*(#video=([^_&]+))?/;
        var srcString = _Externals3.default.sourceToString(src);
        var match = srcString.match(regExp);

        return match ? match[5] || match[3] : null;
      }
    }
  }, {
    key: 'setSrc',
    value: function setSrc(src) {
      this.widgetPlayer.load(this.parseSrc(src));
    }
  }, {
    key: 'isApiReady',
    value: function isApiReady() {
      return window['DM'] && window['DM']['player'];
    }
  }, {
    key: 'injectCss',
    value: function injectCss(overrideStyle) {
      if (!overrideStyle) {
        overrideStyle = '';
      }
      overrideStyle += '.vjs-dailymotion.vjs-dailymotion-loading {padding-top: 52.6%;background: transparent;}';
      _get(Dailymotion.prototype.__proto__ || Object.getPrototypeOf(Dailymotion.prototype), 'injectCss', this).call(this, overrideStyle);
    }
  }, {
    key: 'initTech',
    value: function initTech() {
      if (!this.isApiReady()) {
        return;
      }
      this.src_ = _Externals3.default.sourceToString(this.options_.source);
      var videoId = this.parseSrc(this.src_);

      var dmOpts = _video2.default.mergeOptions(this.options_, {
        video: videoId,
        width: this.options_.width,
        height: this.options_.height,
        params: _video2.default.mergeOptions(this.player_.options_, {
          controls: false, // disable DM controls & buttons for better integration
          'endscreen-enable': false,
          'sharing-enable': false
        })
      });

      this.widgetPlayer = new window.DM.player(this.el_, dmOpts);
      this.setupTriggers();
      this.onStateChange({ type: -1 });
    }
  }, {
    key: 'onReady',
    value: function onReady() {
      this.updateDuration();
      this.updateVolume();
      this.updatePoster();
      this.el_.className.replace(' vjs-dailymotion-loading', ''); // remove loading class
      this.triggerReady();
      this.trigger('loadedmetadata');
      this.trigger('canplay');
    }
  }, {
    key: 'updatePoster',
    value: function updatePoster() {
      var _this2 = this;

      /*jshint camelcase: false */
      try {
        //const track = this.widgetPlayer.getCurrentTrack();
        var videoId = null;
        if ('string' === typeof this.options_.source) {
          videoId = this.options_.source;
        } else if ('object' === _typeof(this.options_.source)) {
          videoId = this.options_.source.src;
        }
        videoId = this.parseSrc(videoId);
        var apiUrl = 'https://api.dailymotion.com/video/' + videoId + '?fields=thumbnail_large_url';
        var date = Date.now();
        this.xhrs_[date] = _video2.default.xhr(apiUrl, { responseType: 'json' }, function (err, data) {
          delete _this2.xhrs_[date];
          if (data.body.thumbnail_large_url) {
            _this2.setPoster(data.body.thumbnail_large_url);
          }
        });
      } catch (e) {
        console.log('unable to set poster', e);
      }
    }
  }, {
    key: 'setupTriggers',
    value: function setupTriggers() {
      var _this3 = this;

      this.widgetPlayer.vjsTech = this;

      var _loop = function _loop() {
        var eventName = Dailymotion.Events[i];
        /*jshint loopfunc: true */
        _this3.widgetPlayer.addEventListener(eventName, function (data) {
          _this3.eventHandler(_video2.default.mergeOptions({ type: eventName }, data));
        });
      };

      for (var i = Dailymotion.Events.length - 1; i >= 0; i--) {
        _loop();
      }
    }
  }, {
    key: 'onStateChange',
    value: function onStateChange(event) {
      console.debug('event: ', event);
      var state = event.type;
      this.lastState = state;
      switch (state) {
        case -1:
          if (this.options_.autoplay) {
            this.trigger('loadstart');
            this.trigger('waiting');
          }
          break;
        case 'apiready':
          this.onReady();
          break;
        case 'video_end':
          this.updateEnded();
          this.updatePaused();
          this.trigger('ended');
          break;
        case 'start':
        case 'video_start':
          this.trigger('loadedmetadata');
          this.trigger('durationchange');
          this.trigger('canplay');
          this.updatePaused();
          break;
        case 'durationchange':
          this.updateDuration();
          break;
        case 'volumechange':
          this.updateVolume();
          break;
        case 'timeupdate':
          this.currentTime_ = this.widgetPlayer.currentTime;
          break;
        case 'progress':
          this.buffered_ = this.widgetPlayer.bufferedTime;
          break;
        case 'pause':
          this.updatePaused();
          this.trigger('pause');
          break;
        case 'play':
          this.updatePaused();
          this.trigger('play');
          break;
        default:
          _get(Dailymotion.prototype.__proto__ || Object.getPrototypeOf(Dailymotion.prototype), 'onStateChange', this).call(this, event);
      }
    }
  }, {
    key: 'updateVolume',
    value: function updateVolume() {
      var vol = this.widgetPlayer.volume;
      if (typeof this.volumeBefore_ === 'undefined') {
        this.volumeBefore_ = vol;
      }
      if (this.volume_ !== vol) {
        this.volume_ = vol;
        this.trigger('volumechange');
      }
    }
  }, {
    key: 'updateEnded',
    value: function updateEnded() {
      this.ended_ = this.widgetPlayer.ended;
    }
  }, {
    key: 'updatePaused',
    value: function updatePaused() {
      this.paused_ = this.widgetPlayer.paused;
    }
  }, {
    key: 'updateDuration',
    value: function updateDuration() {
      this.duration_ = this.widgetPlayer.duration;
    }
  }, {
    key: 'buffered',
    value: function buffered() {
      return _video2.default.createTimeRange(0, this.buffered_ || 0);
    }
  }, {
    key: 'ended',
    value: function ended() {
      return this.ended_;
    }
  }, {
    key: 'duration',
    value: function duration() {
      return this.duration_;
    }
  }, {
    key: 'currentTime',
    value: function currentTime() {
      return this.currentTime_;
    }
  }, {
    key: 'setCurrentTime',
    value: function setCurrentTime(seconds) {
      this.widgetPlayer.seek(seconds);
      this.currentTime_ = seconds;
    }
  }, {
    key: 'play',
    value: function play() {
      this.widgetPlayer.play();
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.widgetPlayer.pause();
    }
  }, {
    key: 'seek',
    value: function seek(time) {
      this.widgetPlayer.seek(time);
    }
  }, {
    key: 'paused',
    value: function paused() {
      return this.paused_;
    }
  }, {
    key: 'muted',
    value: function muted() {
      return this.muted_;
    }
  }, {
    key: 'volume',
    value: function volume() {
      return this.volume_;
    }
  }, {
    key: 'setVolume',
    value: function setVolume(percentAsDecimal) {
      if (percentAsDecimal !== this.volume_) {
        var isInitialState = this.widgetPlayer.bufferedTime === 0 && this.widgetPlayer.currentTime === 0;
        // Trigger a load before setting the volume otherwise it won't work
        if (isInitialState) {
          this.widgetPlayer.seek(0);
        }
        this.widgetPlayer.setVolume(percentAsDecimal);
        this.updateVolume();
      }
    }
  }, {
    key: 'setMuted',
    value: function setMuted(muted) {
      this.muted_ = muted;
      if (muted) {
        this.volumeBefore_ = this.volume_;
      }
      this.setVolume(muted ? 0 : this.volumeBefore_);
    }
  }]);

  return Dailymotion;
}(_Externals3.default);

Dailymotion.prototype.options_ = {
  api: '//api.dmcdn.net/all.js',
  embed: '//www.dailymotion.com/embed/video/',
  visibility: 'visible'
};

Dailymotion.prototype.className_ = 'dailymotion';

/* Dailymotion Support Testing -------------------------------------------------------- */

Dailymotion.isSupported = function () {
  return true;
};

// Add Source Handler pattern functions to this tech
Tech.withSourceHandlers(Dailymotion);

/*
 * The default native source handler.
 * This simply passes the source to the video element. Nothing fancy.
 *
 * @param  {Object} source   The source object
 * @param  {Flash} tech  The instance of the Flash tech
 */
Dailymotion.nativeSourceHandler = {};

/**
 * Check if Flash can play the given videotype
 * @param  {String} type    The mimetype to check
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Dailymotion.nativeSourceHandler.canPlayType = function (type) {
  return type.indexOf('dailymotion') !== -1;
};

/*
 * Check Dailymotion can handle the source natively
 *
 * @param  {Object} source  The source object
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Dailymotion.nativeSourceHandler.canHandleSource = function (source) {

  // If a type was provided we should rely on that
  if (source.type) {
    return Dailymotion.nativeSourceHandler.canPlayType(source.type);
  } else if (source.src) {
    return Dailymotion.nativeSourceHandler.canPlayType(source.src);
  } else if (typeof source === 'string') {
    return Dailymotion.nativeSourceHandler.canPlayType(source);
  }

  return '';
};

Dailymotion.nativeSourceHandler.handleSource = function (source, tech) {
  tech.src(source.src);
};

/*
 * Clean up the source handler when disposing the player or switching sources..
 * (no cleanup is needed when supporting the format natively)
 */
Dailymotion.nativeSourceHandler.dispose = function () {};

// Register the native source handler
Dailymotion.registerSourceHandler(Dailymotion.nativeSourceHandler);

Dailymotion.Events = ['apiready', 'loaded', 'play', 'playing', 'pause', 'loadedmetadata', 'durationchange', 'ended', 'timeupdate', 'progress', 'seeking', 'seeked', 'subtitlechange', 'volumechange', 'error', 'video_start', 'video_end', 'waiting'];

Component.registerComponent('Dailymotion', Dailymotion);

Tech.registerTech('Dailymotion', Dailymotion);

exports.default = Dailymotion;
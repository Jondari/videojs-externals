'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = require('video.js');

var _video2 = _interopRequireDefault(_video);

var _Externals2 = require('./Externals');

var _Externals3 = _interopRequireDefault(_Externals2);

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file Youtube.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Externals (iframe) Media Controller - Wrapper for HTML5 Media API
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Documentation at https://developers.google.com/youtube/iframe_api_reference
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Component = _video2.default.getComponent('Component');
var Tech = _video2.default.getComponent('Tech');

/**
 * Externals Media Controller - Wrapper for HTML5 Media API
 *
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready Ready callback function
 * @extends Tech
 * @class Youtube
 */

var Youtube = function (_Externals) {
  _inherits(Youtube, _Externals);

  function Youtube(options, ready) {
    _classCallCheck(this, Youtube);

    return _possibleConstructorReturn(this, (Youtube.__proto__ || Object.getPrototypeOf(Youtube)).call(this, options, ready));
  }

  _createClass(Youtube, [{
    key: 'dispose',
    value: function dispose() {
      _window2.default.clearInterval(this.volumeChangeInterval);
    }
  }, {
    key: 'createEl',
    value: function createEl() {

      var el_ = _get(Youtube.prototype.__proto__ || Object.getPrototypeOf(Youtube.prototype), 'createEl', this).call(this, 'div', {
        id: this.options_.techId
      });

      return el_;
    }
  }, {
    key: 'injectCss',
    value: function injectCss() {
      var css = '.vjs-' + this.className_ + ' .vjs-big-play-button { display: none; }';
      _get(Youtube.prototype.__proto__ || Object.getPrototypeOf(Youtube.prototype), 'injectCss', this).call(this, css);
    }
  }, {
    key: 'loadApi',
    value: function loadApi() {
      _get(Youtube.prototype.__proto__ || Object.getPrototypeOf(Youtube.prototype), 'loadApi', this).call(this);
      _window2.default.onYouTubeIframeAPIReady = this.onYoutubeReady.bind(this);
    }
  }, {
    key: 'onStateChange',
    value: function onStateChange(event) {
      var state = event.data;
      console.debug('state: ', state);
      switch (state) {
        case -1:
          this.trigger('loadstart');
          this.trigger('loadedmetadata');
          break;

        case YT.PlayerState.PLAYING:
          this.trigger('timeupdate');
          this.trigger('durationchange');
          this.trigger('play');
          this.trigger('playing');
          this.updateVolume();

          if (this.isSeeking) {
            this.onSeeked();
          }
          break;

        case YT.PlayerState.ENDED:
          this.trigger('ended');
          break;

        case YT.PlayerState.PAUSED:
          this.trigger('canplay');
          if (this.isSeeking) {
            this.onSeeked();
          } else {
            this.trigger('pause');
          }
          break;

        case YT.PlayerState.BUFFERING:
          this.trigger('timeupdate');
          this.trigger('waiting');
          this.trigger('canplay');
          break;
        default:
          this.super(event);
      }
      this.lastState = state;
    }
  }, {
    key: 'parseSrc',
    value: function parseSrc(src) {
      if (src) {
        // Regex that parse the video ID for any Youtube URL
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = src.match(regExp);

        if (match && match[2].length === 11) {
          return match[2];
        }
      }
    }
  }, {
    key: 'onReady',
    value: function onReady() {
      _get(Youtube.prototype.__proto__ || Object.getPrototypeOf(Youtube.prototype), 'onReady', this).call(this);
      this.updateVolume();
    }
  }, {
    key: 'isApiReady',
    value: function isApiReady() {
      return _window2.default['YT'] && _window2.default['YT']['Player'];
    }
  }, {
    key: 'onYoutubeReady',
    value: function onYoutubeReady() {
      YT.ready(function () {
        this.initTech();
      }.bind(this));
    }
  }, {
    key: 'initTech',
    value: function initTech() {
      if (!this.isApiReady()) {
        return;
      }
      this.src_ = _Externals3.default.sourceToString(this.options_.source);
      var videoId = this.parseSrc(this.src_);

      var ytOpts = _video2.default.mergeOptions(this.options_, {
        controls: 0,
        playsinline: 1,
        rel: 0,
        showinfo: 0,
        autohide: 1,
        disablekb: 1,
        end: 0,
        modestbranding: 1,
        fs: 1
      });

      this.widgetPlayer = new YT.Player(this.options_.techId, {
        videoId: videoId,
        playerVars: ytOpts,
        events: {
          onReady: this.onReady.bind(this),
          onPlaybackQualityChange: this.onPlayerPlaybackQualityChange.bind(this),
          onStateChange: this.onStateChange.bind(this),
          onError: this.onPlayerError.bind(this)
        }
      });
      _get(Youtube.prototype.__proto__ || Object.getPrototypeOf(Youtube.prototype), 'initTech', this).call(this);
    }
  }, {
    key: 'setupTriggers',
    value: function setupTriggers() {}
  }, {
    key: 'onPlayerPlaybackQualityChange',
    value: function onPlayerPlaybackQualityChange() {}
  }, {
    key: 'setSrc',
    value: function setSrc(source) {
      if (!source) {
        return;
      }

      this.src_ = source;
      var videoId = this.parseSrc(source);

      if (!this.options_.poster) {
        // TODO is this the right place to put it?
        if (videoId) {
          // Set the low resolution first
          this.setPoster('//img.youtube.com/vi/' + videoId + '/0.jpg');
        }
      }

      this.widgetPlayer.loadVideoById(videoId);
    }
  }, {
    key: 'ended',
    value: function ended() {
      return this.widgetPlayer ? this.lastState === YT.PlayerState.ENDED : false;
    }
  }, {
    key: 'duration',
    value: function duration() {
      return this.widgetPlayer ? this.widgetPlayer.getDuration() : 0;
    }
  }, {
    key: 'currentTime',
    value: function currentTime() {
      return this.widgetPlayer && this.widgetPlayer.getCurrentTime();
    }
  }, {
    key: 'setCurrentTime',
    value: function setCurrentTime(seconds) {
      if (this.lastState === YT.PlayerState.PAUSED) {
        this.timeBeforeSeek = this.currentTime();
      }

      //FIXME replace this (warn autoplay)
      if (!this.isSeeking) {
        this.wasPausedBeforeSeek = this.paused();
      }

      this.seekTarget = seconds;
      this.widgetPlayer.seekTo(seconds, true);
      this.trigger('timeupdate');
      this.trigger('seeking');
      this.isSeeking = true;

      // A seek event during pause does not return an event to trigger a seeked event,
      // so run an interval timer to look for the currentTime to change
      if (this.lastState === YT.PlayerState.PAUSED && this.timeBeforeSeek !== seconds) {
        this.clearInterval(this.checkSeekedInPauseInterval);
        // TODO stop seeking after a while
        this.checkSeekedInPauseInterval = this.setInterval(function () {
          if (this.lastState !== YT.PlayerState.PAUSED || !this.isSeeking) {
            // If something changed while we were waiting for the currentTime to change,
            //  clear the interval timer
            this.clearInterval(this.checkSeekedInPauseInterval);
            this.seekTarget = null;
          } else if (this.currentTime() !== this.timeBeforeSeek) {
            this.trigger('timeupdate');
            this.onSeeked();
          }
        }.bind(this), 250);
      }
    }
  }, {
    key: 'onSeeked',
    value: function onSeeked() {
      // We are forced to do an approximative seek because youtube doesn't have a SEEKED event...
      if (Math.round(this.currentTime()) !== Math.round(this.seekTarget)) {
        return;
      }

      this.clearInterval(this.checkSeekedInPauseInterval);
      this.seekTarget = null;
      this.isSeeking = false;

      if (this.wasPausedBeforeSeek) {
        this.pause();
      }

      this.trigger('seeked');
    }
  }, {
    key: 'updateVolume',
    value: function updateVolume() {
      var vol = this.volume();
      if (typeof this.volumeBefore_ === 'undefined') {
        this.volumeBefore_ = vol;
      }
      if (this.volumeBefore_ !== vol) {
        this.trigger('volumechange');
      }
    }
  }, {
    key: 'play',
    value: function play() {
      this.widgetPlayer.playVideo();
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.widgetPlayer.pauseVideo();
    }
  }, {
    key: 'paused',
    value: function paused() {
      return this.widgetPlayer && this.lastState !== YT.PlayerState.PLAYING && this.lastState !== YT.PlayerState.BUFFERING;
    }
  }, {
    key: 'muted',
    value: function muted() {
      return this.muted_;
    }
  }, {
    key: 'volume',
    value: function volume() {
      return this.widgetPlayer && this.widgetPlayer.getVolume() / 100.0;
    }
  }, {
    key: 'setVolume',
    value: function setVolume(percentAsDecimal) {
      var _this2 = this;

      this.volumeBefore_ = this.volume();
      if (percentAsDecimal !== this.volumeBefore_) {
        this.widgetPlayer.setVolume(percentAsDecimal * 100.0);

        // Wait for a second until YT actually changes the volume
        this.volumeChangeInterval = _window2.default.setInterval(function () {
          _this2.updateVolume();
          if (_this2.volume() === percentAsDecimal) {
            _window2.default.clearInterval(_this2.volumeChangeInterval);
          }
        }, 50);
        _window2.default.setTimeout(function () {
          _window2.default.clearInterval(_this2.volumeChangeInterval);
        }, 1000);
      }
    }
  }, {
    key: 'setMuted',
    value: function setMuted(muted) {
      this.muted_ = muted;
      if (muted) {
        this.volumeBefore_ = this.volume();
      }
      this.widgetPlayer.setVolume(muted ? 0 : this.volumeBefore_);
      this.updateVolume();
    }
  }]);

  return Youtube;
}(_Externals3.default);

Youtube.prototype.options_ = {
  api: '//www.youtube.com/iframe_api',
  visibility: 'visible'
};

Youtube.prototype.className_ = 'youtube';

/* Youtube Support Testing -------------------------------------------------------- */

Youtube.isSupported = function () {
  return true;
};

// Add Source Handler pattern functions to this tech
Tech.withSourceHandlers(Youtube);

/*
 * The default native source handler.
 * This simply passes the source to the video element. Nothing fancy.
 *
 * @param  {Object} source   The source object
 * @param  {Flash} tech  The instance of the Flash tech
 */
Youtube.nativeSourceHandler = {};

/**
 * Check if Flash can play the given videotype
 * @param  {String} source    The mimetype to check
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Youtube.nativeSourceHandler.canPlayType = function (source) {
  return source.indexOf('youtube') !== -1;
};

/*
 * Check Youtube can handle the source natively
 *
 * @param  {Object} source  The source object
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Youtube.nativeSourceHandler.canHandleSource = function (source) {

  // If a type was provided we should rely on that
  if (source.type) {
    return Youtube.nativeSourceHandler.canPlayType(source.type);
  } else if (source.src) {
    return Youtube.nativeSourceHandler.canPlayType(source.src);
  } else if (typeof source === 'string') {
    return Youtube.nativeSourceHandler.canPlayType(source);
  }

  return '';
};

Youtube.nativeSourceHandler.handleSource = function (source, tech) {
  tech.src(source.src);
};

/*
 * Clean up the source handler when disposing the player or switching sources..
 * (no cleanup is needed when supporting the format natively)
 */
Youtube.nativeSourceHandler.dispose = function () {};

Youtube.Events = 'ready,play,playProgress,loadProgress,pause,seek,finish,error'.split(',');

// Register the native source handler
Youtube.registerSourceHandler(Youtube.nativeSourceHandler);

Component.registerComponent('Youtube', Youtube);

Tech.registerTech('Youtube', Youtube);

exports.default = Youtube;
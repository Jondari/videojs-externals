'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = require('video.js');

var _video2 = _interopRequireDefault(_video);

var _Externals2 = require('./Externals');

var _Externals3 = _interopRequireDefault(_Externals2);

require('../lib/mixcloud');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file MixcloudExternal.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Externals (iframe) Media Controller - Wrapper for HTML5 Media API
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * API documentation https://www.mixcloud.com/developers/widget/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Component = _video2.default.getComponent('Component');
var Tech = _video2.default.getComponent('Tech');

/**
 * Externals Media Controller - Wrapper for HTML5 Media API
 *
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready Ready callback function
 * @extends Tech
 * @class MixcloudExternal
 */

var MixcloudExternal = function (_Externals) {
  _inherits(MixcloudExternal, _Externals);

  function MixcloudExternal(options, ready) {
    _classCallCheck(this, MixcloudExternal);

    return _possibleConstructorReturn(this, (MixcloudExternal.__proto__ || Object.getPrototypeOf(MixcloudExternal)).call(this, options, ready));
  }

  _createClass(MixcloudExternal, [{
    key: 'createEl',
    value: function createEl() {
      this.src_ = _Externals3.default.sourceToString(this.options_.source);
      // https://www.mixcloud.com/developers/#embedding
      // https://www.mixcloud.com/oembed/?format=json&url=...
      // or construct iframe from https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2Fmonstercat%2Fmonstercat-best-of-2014-album-mix%2F&hide_cover=1&mini=1&light=1
      return _get(MixcloudExternal.prototype.__proto__ || Object.getPrototypeOf(MixcloudExternal.prototype), 'createEl', this).call(this, 'iframe', {
        width: '100%',
        height: '100%',
        src: this.generateIframeSrc(this.src_)
      });
    }
  }, {
    key: 'isApiReady',
    value: function isApiReady() {
      return window['Mixcloud'];
    }
  }, {
    key: 'onStateChange',
    value: function onStateChange(event) {
      var state = event.type;
      console.debug("event: ", event);
      switch (state) {
        case -1:
          this.trigger('loadstart');
          this.trigger('waiting');
          break;

        case "ended":
          this.updatePause();
          this.trigger('ended');
          break;

        case "play":
          if (this.paused_) {
            this.paused_ = false;
            this.trigger('play');
            this.trigger('playing');
          }
          break;

        case "progress":
          var _event$data = _slicedToArray(event.data, 2),
              position = _event$data[0],
              duration = _event$data[1];

          this.trigger('progress');
          if (position !== this.currentTime_) {
            this.currentTime_ = position;
            this.trigger('timeupdate');
          }

          if (duration !== this.duration_) {
            this.duration_ = duration;
            this.trigger('durationchange');
          }
          break;

        case "pause":
          this.paused_ = true;
          this.trigger('pause');
          break;

        case "buffering":
          this.trigger('buffering');
          break;

        case "error":
          this.onPlayerError();
          break;
      }
    }
  }, {
    key: 'parseSrc',
    value: function parseSrc(src) {
      if (src) {
        // Regex that parse the video ID for any Mixcloud URL
        var regExp = /^(https?:\/\/)?(www.|api.)?mixcloud.com(\/[^#\?&]+)/i;
        var match = src.match(regExp);

        return match ? match[3] : null;
      }
      return null;
    }
  }, {
    key: 'generateIframeSrc',
    value: function generateIframeSrc(src) {
      var videoId = this.parseSrc(src);
      return '//www.mixcloud.com/widget/iframe/?feed=' + encodeURIComponent(videoId);
    }
  }, {
    key: 'onReady',
    value: function onReady() {
      _get(MixcloudExternal.prototype.__proto__ || Object.getPrototypeOf(MixcloudExternal.prototype), 'initTech', this).call(this);
      _get(MixcloudExternal.prototype.__proto__ || Object.getPrototypeOf(MixcloudExternal.prototype), 'onReady', this).call(this);
    }
  }, {
    key: 'initTech',
    value: function initTech() {
      var _this2 = this;

      // We need to handle the widgetplayer not being loaded properly
      // In the ready event it will actually get to know which methods it can call
      // Beforehand the aren't there, so .load won't exist
      var timeoutId = setTimeout(function () {
        if (_this2.el_ && (!_this2.isReady_ || !_this2.widgetPlayer.load)) {
          _get(MixcloudExternal.prototype.__proto__ || Object.getPrototypeOf(MixcloudExternal.prototype), 'onReady', _this2).call(_this2);
        }
      }, 2000);

      this.widgetPlayer = Mixcloud.PlayerWidget(this.el_.querySelector("iframe"));
      this.widgetPlayer.ready.then(function () {
        clearTimeout(timeoutId);
        _this2.onReady();
        _this2.trigger('loadedmetadata');
        _this2.trigger('durationchange');
        _this2.trigger('canplay');
      });
    }
  }, {
    key: 'setupTriggers',
    value: function setupTriggers() {
      var _this3 = this;

      this.widgetPlayer.vjsTech = this;

      var _loop = function _loop() {
        var eventName = MixcloudExternal.Events[i];
        var self = _this3;
        _this3.widgetPlayer.events[eventName].on(function () {
          self.eventHandler(_video2.default.mergeOptions({ type: eventName }, { data: arguments }));
        });
      };

      for (var i = MixcloudExternal.Events.length - 1; i >= 0; i--) {
        _loop();
      }
    }
  }, {
    key: 'ended',
    value: function ended() {
      return this.duration() === this.currentTime();
    }

    /**
     * Request to enter fullscreen
     *
     * @method enterFullScreen
     */

  }, {
    key: 'enterFullScreen',
    value: function enterFullScreen() {
      this.widgetPlayer.webkitEnterFullScreen();
    }

    /**
     * Request to exit fullscreen
     *
     * @method exitFullScreen
     */

  }, {
    key: 'exitFullScreen',
    value: function exitFullScreen() {
      this.widgetPlayer.webkitExitFullScreen();
    }
  }, {
    key: 'updateVolume',
    value: function updateVolume() {
      var _this4 = this;

      this.widgetPlayer.getVolume(function (volume) {
        _this4.volume_ = volume;
        _this4.trigger('volumechange');
      });
    }
  }, {
    key: 'updatePoster',
    value: function updatePoster() {
      var _this5 = this;

      try {
        this.widgetPlayer.getCurrentSound(function (sound) {
          if (!sound) {
            return;
          }
          var artworkUrl = sound['artwork_url'];
          if (artworkUrl) {
            _this5.setPoster(artworkUrl.replace('large.jpg', 't500x500.jpg'));
          }
          var waveformUrl = sound['waveform_url'];
          if (waveformUrl) {
            _this5.subPosterImage.update(waveformUrl.replace('wis', 'w1').replace('json', 'png'));
          }
          _this5.update(sound);
        });
      } catch (e) {
        console.log('unable to set poster', e);
      }
    }
  }, {
    key: 'setSrc',
    value: function setSrc(src) {
      var _this6 = this;

      this.src_ = src;
      // If initialized without a source, no methods are initialized
      if (this.widgetPlayer.load) {
        this.widgetPlayer.load(this.parseSrc(this.src_)).then(function () {
          _this6.trigger("canplay");
        });
      } else {
        var iframe = this.el_.querySelector("iframe");
        iframe.src = this.generateIframeSrc(src);
        this.initTech();
      }
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
    value: function setCurrentTime(position) {
      var _this7 = this;

      this.widgetPlayer.seek(position).then(function () {
        _this7.widgetPlayer.getPosition().then(function (newTime) {
          if (newTime !== _this7.currentTime_) {
            _this7.currentTime_ = newTime;
            _this7.trigger('timeupdate');
          }
          _this7.trigger("seeked");
        });
      });
      this.trigger("seeking");
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
      var _this8 = this;

      if (percentAsDecimal !== this.volume_) {
        this.volume_ = percentAsDecimal;
        this.muted_ = !this.volume_;
        this.widgetPlayer.setVolume(this.volume_).then(function () {
          _this8.trigger("volumechange");
        });
      }
    }
  }, {
    key: 'setMuted',
    value: function setMuted(muted) {
      this.muted_ = muted;
      this.widgetPlayer.setVolume(this.muted_ ? 0 : this.volume_);
      this.updateVolume();
    }
  }]);

  return MixcloudExternal;
}(_Externals3.default);

exports.default = MixcloudExternal;


MixcloudExternal.prototype.className_ = 'mixcloud';

MixcloudExternal.prototype.options_ = {
  api: '//widget.mixcloud.com/media/js/widgetApi.js',
  visibility: 'hidden',
  children: ['subPosterImage']
};

/* MixcloudExternal Support Testing -------------------------------------------------------- */

MixcloudExternal.isSupported = function () {
  return true;
};

// Add Source Handler pattern functions to this tech
Tech.withSourceHandlers(MixcloudExternal);

/*
 * The default native source handler.
 * This simply passes the source to the video element. Nothing fancy.
 *
 * @param  {Object} source   The source object
 * @param  {Flash} tech  The instance of the Flash tech
 */
MixcloudExternal.nativeSourceHandler = {};

/**
 * Check if Flash can play the given videotype
 * @param  {String} type    The mimetype to check
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
MixcloudExternal.nativeSourceHandler.canPlayType = function (source) {
  return source.indexOf('mixcloud') !== -1;
};

/*
 * Check MixcloudExternal can handle the source natively
 *
 * @param  {Object} source  The source object
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
MixcloudExternal.nativeSourceHandler.canHandleSource = function (source) {

  // If a type was provided we should rely on that
  if (source.type) {
    return MixcloudExternal.nativeSourceHandler.canPlayType(source.type);
  } else if (source.src) {
    return MixcloudExternal.nativeSourceHandler.canPlayType(source.src);
  } else if (typeof source === 'string') {
    return MixcloudExternal.nativeSourceHandler.canPlayType(source);
  }

  return '';
};

MixcloudExternal.nativeSourceHandler.handleSource = function (source, tech) {
  tech.src(source.src);
};

/*
 * Clean up the source handler when disposing the player or switching sources..
 * (no cleanup is needed when supporting the format natively)
 */
MixcloudExternal.nativeSourceHandler.dispose = function () {};

MixcloudExternal.Events = ["progress", "buffering", "play", "pause", "ended", "error"];

// Register the native source handler
MixcloudExternal.registerSourceHandler(MixcloudExternal.nativeSourceHandler);

Component.registerComponent('Mixcloud', MixcloudExternal);

Tech.registerTech('Mixcloud', MixcloudExternal);
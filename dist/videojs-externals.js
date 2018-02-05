/**
 * videojs-externals
 * @version 2.0.0-alpha
 * @copyright 2018 Benjamin Pott
 * @license MIT
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.videojsExternals = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file sub-poster-image.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Component = _video2.default.getComponent('Component');
var PosterImage = _video2.default.getComponent('PosterImage');

/**
 * The component that handles showing the poster image.
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Button
 * @class SubPosterImage
 */

var SubPosterImage = function (_PosterImage) {
  _inherits(SubPosterImage, _PosterImage);

  function SubPosterImage(player, options) {
    _classCallCheck(this, SubPosterImage);

    return _possibleConstructorReturn(this, (SubPosterImage.__proto__ || Object.getPrototypeOf(SubPosterImage)).call(this, player, options));
  }

  /**
   * Event handler for updates to the player's poster source
   *
   * @method update
   */


  _createClass(SubPosterImage, [{
    key: 'update',
    value: function update(url) {

      this.setSrc(url);

      // If there's no poster source we should display:none on this component
      // so it's not still clickable or right-clickable
      if (url) {
        this.show();
      } else {
        this.hide();
      }
    }
  }]);

  return SubPosterImage;
}(PosterImage);

Component.registerComponent('SubPosterImage', SubPosterImage);
exports.default = SubPosterImage;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function () {
  var e = window.Mixcloud,
      n = {
    noConflict: function noConflict() {
      return window.Mixcloud = e, n;
    }
  };
  window.Mixcloud = n;
}(), window.Mixcloud.Callbacks = function () {
  var e = [];
  return {
    apply: function apply(n, t) {
      for (var o = 0; o < e.length; o++) {
        e[o].apply(n, t);
      }
    }, external: {
      on: function on(n) {
        e.push(n);
      }, off: function off(n) {
        for (var t = 0; t < e.length; t++) {
          if (e[t] === n) {
            e.splice(t, 1);
            break;
          }
        }
      }
    }
  };
}, function () {
  function e(e, n) {
    return (typeof e === "undefined" ? "undefined" : _typeof(e))[0] === n;
  }

  var n = 1,
      t = 2;
  window.Mixcloud.Deferred = function () {
    function o(e) {
      i(n, e);
    }

    function r(e) {
      i(t, e);
    }

    function i(t, i) {
      if (!l) {
        if (s.resolve = s.reject = function () {}, t === n) {
          if (i === s.promise) return void r(new TypeError());
          if (i instanceof u) return void i.then(o, r);
          if (e(i, "f") || e(i, "o")) {
            var a;
            try {
              a = i.then;
            } catch (d) {
              return void r(d);
            }
            if (e(a, "f")) {
              try {
                a.call(i, o, r);
              } catch (d) {
                l || r(d);
              }
              return;
            }
          }
        }
        f = i, l = t, c();
      }
    }

    function c() {
      setTimeout(function () {
        for (var e = 0; e < d.length; e++) {
          d[e][l - 1].call(void 0, f);
        }d = [];
      }, 0);
    }

    function a(n, t) {
      function o(e) {
        return function (n) {
          try {
            r.resolve(e.call(this, n));
          } catch (t) {
            r.reject(t);
          }
        };
      }

      var r = window.Mixcloud.Deferred();
      return d.push([e(n, "f") ? o(n) : function (e) {
        r.resolve(e);
      }, e(t, "f") ? o(t) : function (e) {
        r.reject(e);
      }]), l && c(), r.promise;
    }

    function u() {
      this.then = a;
    }

    var f,
        d = [],
        l = 0,
        s = { resolve: o, reject: r, promise: new u() };
    return s;
  };
}(), function (e) {
  function n(n) {
    if (n.origin === o || n.origin === e.location.origin) {
      var t;
      try {
        t = JSON.parse(n.data);
      } catch (r) {
        return;
      }
      if ("playerWidget" === t.mixcloud) for (var c = 0; c < i.length; c++) {
        i[c].window === n.source && i[c].callback(t.type, t.data);
      }
    }
  }

  function t(e, n) {
    // Patch to allow making calls to any iframe
    // Not exactly secure, but we aren't sharing any sensitive information
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
    // The very first call ("api") was being blocked, so no events and methods could be discovered
    e.postMessage(JSON.stringify(n), '*');
  }

  var o = "https://www.mixcloud.com",
      r = 0,
      i = [];
  e.Mixcloud.PlayerWidget = function (n) {
    function o(e, n) {
      "ready" === e ? t(u, { type: "getApi" }) : "api" === e ? c(n) : "event" === e ? d[n.eventName].apply(s, n.args) : "methodResponse" === e && l[n.methodId] && (l[n.methodId].resolve(n.value), delete l[n.methodId]);
    }

    function c(n) {
      var t;
      for (t = 0; t < n.methods.length; t++) {
        s[n.methods[t]] = a(n.methods[t]);
      }for (t = 0; t < n.events.length; t++) {
        d[n.events[t]] = e.Mixcloud.Callbacks(), s.events[n.events[t]] = d[n.events[t]].external;
      }f.resolve(s);
    }

    function a(n) {
      return function () {
        return r++, l[r] = e.Mixcloud.Deferred(), t(u, {
          type: "method",
          data: { methodId: r, methodName: n, args: Array.prototype.slice.call(arguments) }
        }), l[r].promise;
      };
    }

    var u = n.contentWindow,
        f = e.Mixcloud.Deferred(),
        d = {},
        l = {},
        s = { ready: f.promise, events: {} };
    return i.push({ window: u, callback: o }), t(u, { type: "getApi" }), s;
  }, e.addEventListener ? e.addEventListener("message", n, !1) : e.attachEvent("onmessage", n);
}(window);
},{}],3:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Externals":5}],4:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

var _Externals2 = require('./Externals');

var _Externals3 = _interopRequireDefault(_Externals2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file Deezer.js
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
 * @class Deezer
 */

var Deezer = function (_Externals) {
  _inherits(Deezer, _Externals);

  function Deezer(options, ready) {
    _classCallCheck(this, Deezer);

    return _possibleConstructorReturn(this, (Deezer.__proto__ || Object.getPrototypeOf(Deezer)).call(this, options, ready));
  }

  _createClass(Deezer, [{
    key: 'injectCss',
    value: function injectCss() {
      var css = '.vjs-' + this.className_ + ' > .vjs-poster { display:block; width:50%; background-size:contain; background-position: 0 50%; background-color: #000; }\n    .vjs-' + this.className_ + ' .vjs-tech > .vjs-poster {  display:block; background-color: rgba(76, 50, 65, 0.35);}\n    .vjs-deezer-info{position:absolute;padding:3em 1em 1em 1em;left:50%;top:0;right:0;bottom:0;\n      text-align: center; pointer-events: none; text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.69);}';
      _get(Deezer.prototype.__proto__ || Object.getPrototypeOf(Deezer.prototype), 'injectCss', this).call(this, css);
    }
  }, {
    key: 'createEl',
    value: function createEl() {

      var source = null;
      if ('string' === typeof this.options_.source) {
        source = this.options_.source;
      } else if ('object' === _typeof(this.options_.source)) {
        source = this.options_.source.src;
      }

      source = this.parseSrc(source);

      var el_ = _get(Deezer.prototype.__proto__ || Object.getPrototypeOf(Deezer.prototype), 'createEl', this).call(this, 'div', {
        width: '100%',
        height: '100%',
        src: '//www.deezer.com/plugins/player?type=tracks&id=' + source + '\n      &format=classic&color=007FEB&autoplay=' + this.options_.autoplay + '\n      &playlist=' + this.options_.playList + '&width=100%&height=100%'
      });

      this.infosEl_ = _video2.default.createEl('div', {
        className: 'vjs-deezer-info'
      });

      var deezerEl = _video2.default.createEl('div', {
        id: 'dz-root'
      });

      el_.firstChild.style.visibility = this.options_.visibility;
      el_.appendChild(this.infosEl_);
      el_.appendChild(deezerEl);

      return el_;
    }
  }, {
    key: 'isApiReady',
    value: function isApiReady() {
      return window['DZ'] && window['DZ']['player'];
    }
  }, {
    key: 'onStateChange',
    value: function onStateChange(event) {
      var state = event.type;
      switch (state) {
        case -1:
          this.trigger('loadstart');
          this.trigger('waiting');
          break;

        case 'player_loaded':
          this.trigger('loadedmetadata');
          this.trigger('durationchange');
          this.trigger('canplay');
          this.updatePause();
          break;

        case 'track_end':
          this.updatePause();
          this.trigger('ended');
          break;

        case 'player_play':
          this.updateDuration();
          this.updatePause();
          this.trigger('play');
          break;

        case 'player_position':
          this.trigger('playing');
          this.currentTime_ = event[0];
          this.duration_ = event[1];
          this.trigger('timeupdate');
          break;

        case 'player_paused':
          this.updatePause();
          this.trigger('pause');
          break;

      }
    }
  }, {
    key: 'parseSrc',
    value: function parseSrc(src) {
      if (src) {
        // Regex that parse the video ID for any Dailymotion URL
        var regExp = /^https?:\/\/(?:www\.)?deezer\.com\/(track|album|playlist)\/(\d+)$/;
        var match = src.match(regExp);

        return match ? match[2] || match[2] : null;
      }
    }
  }, {
    key: 'onReady',
    value: function onReady() {
      _get(Deezer.prototype.__proto__ || Object.getPrototypeOf(Deezer.prototype), 'onReady', this).call(this);
      this.updateDuration();
      this.updateVolume();
      this.updatePoster();
    }
  }, {
    key: 'initTech',
    value: function initTech() {
      DZ.init({
        channelUrl: window.location.protocol + '//' + window.location.hostname,
        appId: this.options_.appId,
        player: {
          container: this.options_.techId,
          width: 800,
          height: 300,
          onload: this.onReady.bind(this)
        }
      });
      this.widgetPlayer = DZ.player;
      _get(Deezer.prototype.__proto__ || Object.getPrototypeOf(Deezer.prototype), 'initTech', this).call(this);
    }
  }, {
    key: 'setupTriggers',
    value: function setupTriggers() {
      var _this2 = this;

      this.widgetPlayer.vjsTech = this;
      for (var i = Deezer.Events.length - 1; i >= 0; i--) {
        var eventName = Deezer.Events[i];
        /*jshint loopfunc: true */
        DZ.Event.subscribe(eventName, function (data, event) {
          _this2.eventHandler(_video2.default.mergeOptions({ type: event || data }, data));
        });
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
    value: function enterFullScreen() {}

    /**
     * Request to exit fullscreen
     *
     * @method exitFullScreen
     */

  }, {
    key: 'exitFullScreen',
    value: function exitFullScreen() {}
  }, {
    key: 'updatePause',
    value: function updatePause() {
      this.paused_ = !this.widgetPlayer.isPlaying();
    }
  }, {
    key: 'updateDuration',
    value: function updateDuration() {
      var track = this.widgetPlayer.getCurrentTrack();
      this.duration_ = track && track.duration || 0;
      this.trigger('durationchange');
    }
  }, {
    key: 'updateVolume',
    value: function updateVolume() {
      this.volume_ = this.widgetPlayer.getVolume();
      this.trigger('volumechange');
    }
  }, {
    key: 'updatePoster',
    value: function updatePoster() {
      var _this3 = this;

      try {
        //const track = this.widgetPlayer.getCurrentTrack();
        var track = {};
        if ('string' === typeof this.options_.source) {
          track.id = this.options_.source;
        } else if ('object' === _typeof(this.options_.source)) {
          track.id = this.options_.source.src;
        }

        track.id = this.parseSrc(track.id);

        DZ.api('/track/' + track.id, function (response) {
          _this3.setPoster('' + response.album['cover_big']);
          _this3.update(response);
        });
      } catch (e) {
        console.log('unable to set poster', e);
      }
    }
  }, {
    key: 'update',
    value: function update(sound) {
      this.infosEl_.innerHTML = sound.title;
    }
  }, {
    key: 'src',
    value: function src(source) {

      if (!source || !source.src) {
        if ('string' === typeof this.options_.source) {
          source = this.options_.source;
        } else if ('object' === _typeof(this.options_.source)) {
          source = this.options_.source.src;
        }

        source = this.parseSrc(source);
      }

      this.widgetPlayer.playTracks([source]);
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
      this.trigger('seeking');
      this.widgetPlayer.seekTo(position * 1000);
    }
  }, {
    key: 'play',
    value: function play() {
      this.widgetPlayer.play();
      this.updatePause();
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.widgetPlayer.pause();
      this.updatePause();
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
        this.volume_ = percentAsDecimal;
        this.muted_ = !this.volume_;
        this.widgetPlayer.setVolume(this.volume_);
        this.updateVolume();
      }
    }
  }, {
    key: 'setMuted',
    value: function setMuted(muted) {
      this.muted_ = muted;
      this.widgetPlayer.setMute(this.muted_);
      this.updateVolume();
    }
  }]);

  return Deezer;
}(_Externals3.default);

Deezer.prototype.className_ = 'deezer';

Deezer.prototype.options_ = {
  api: 'https://cdns-files.dzcdn.net/js/min/dz.js',
  appId: 213642,
  playList: false,
  visibility: 'hidden',
  children: ['subPosterImage']
};

/* Deezer Support Testing -------------------------------------------------------- */

Deezer.isSupported = function () {
  return true;
};

// Add Source Handler pattern functions to this tech
Tech.withSourceHandlers(Deezer);

/*
 * The default native source handler.
 * This simply passes the source to the video element. Nothing fancy.
 *
 * @param  {Object} source   The source object
 * @param  {Flash} tech  The instance of the Flash tech
 */
Deezer.nativeSourceHandler = {};

/**
 * Check if Flash can play the given videotype
 * @param  {String} type    The mimetype to check
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Deezer.nativeSourceHandler.canPlayType = function (source) {
  return source.indexOf('deezer') !== -1;
};

/*
 * Check Deezer can handle the source natively
 *
 * @param  {Object} source  The source object
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Deezer.nativeSourceHandler.canHandleSource = function (source) {

  // If a type was provided we should rely on that
  if (source.type) {
    return Deezer.nativeSourceHandler.canPlayType(source.type);
  } else if (source.src) {
    return Deezer.nativeSourceHandler.canPlayType(source.src);
  }

  return '';
};

Deezer.nativeSourceHandler.handleSource = function (source, tech) {
  tech.src(source.src);
};

/*
 * Clean up the source handler when disposing the player or switching sources..
 * (no cleanup is needed when supporting the format natively)
 */
Deezer.nativeSourceHandler.dispose = function () {};

Deezer.Events = 'player_loaded,player_play,player_paused,player_position,player_buffering,volume_changed,shuffle_changed,mute_changed,track_end,'.split(',');

// Register the native source handler
Deezer.registerSourceHandler(Deezer.nativeSourceHandler);

Component.registerComponent('Deezer', Deezer);

Tech.registerTech('Deezer', Deezer);

exports.default = Deezer;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Externals":5}],5:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file videojs-externals.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Externals (iframe) Media Controller - Wrapper for HTML5 Media API
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Component = _video2.default.getComponent('Component');
//const ClickableComponent = videojs.getComponent('ClickableComponent');
var Tech = _video2.default.getComponent('Tech');

/**
 * Externals Media Controller - Wrapper for HTML5 Media API
 *
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready Ready callback function
 * @extends Tech
 * @class Externals
 */

var Externals = function (_Tech) {
  _inherits(Externals, _Tech);

  function Externals(options, ready) {
    _classCallCheck(this, Externals);

    var _this = _possibleConstructorReturn(this, (Externals.__proto__ || Object.getPrototypeOf(Externals)).call(this, options, ready));

    var url = options.source ? options.source.src : null;
    _this.params = {
      id: _this.options_.techId,
      autoplay: parseInt(options.autoplay),
      chromeless: parseInt(options.controls),
      html: 1,
      info: 1,
      logo: 1,
      controls: 'html',
      wmode: 'opaque',
      format: 'json',
      url: url
    };
    _this.paused_ = true;

    // If we are not on a server, don't specify the origin (it will crash)
    if (window.location.protocol !== 'file:') {
      _this.params.origin = window.location.protocol + '//' + window.location.hostname;
    }

    _this.videoId = _this.parseSrc(url);
    // Set the vjs-youtube class to the player
    // Parent is not set yet so we have to wait a tick
    setTimeout(function () {
      _this.loadApi();
    });
    return _this;
  }

  /**
   *
   * @returns {string}
   * @private
   */


  _createClass(Externals, [{
    key: 'injectCss',
    value: function injectCss(overrideStyle) {
      var css = // iframe blocker to catch mouse events
      '.vjs-' + this.className_ + ' .vjs-iframe-blocker { display: none; }\n      .vjs-' + this.className_ + '.vjs-user-inactive .vjs-iframe-blocker { display: block; }\n      .vjs-' + this.className_ + ' .vjs-poster { background-size: cover; }';

      if (overrideStyle) {
        css += overrideStyle;
      }

      var head = document.head || document.getElementsByTagName('head')[0];

      var style = document.createElement('style');
      style.type = 'text/css';

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }

      head.appendChild(style);
    }
  }, {
    key: 'parseSrc',
    value: function parseSrc(src) {
      return src;
    }
  }, {
    key: 'createEl',
    value: function createEl(type, options, blocker) {

      var el = _video2.default.createEl('div', {
        id: 'vjs-tech' + this.options_.techId,
        className: 'vjs-tech vjs-tech-' + this.className_
      });

      var iframeContainer = _video2.default.createEl(type, _video2.default.mergeOptions({
        id: this.options_.techId,
        scrolling: 'no',
        marginWidth: 0,
        marginHeight: 0,
        frameBorder: 0,
        webkitAllowFullScreen: '',
        mozallowfullscreen: '',
        allowFullScreen: ''
      }, options));

      iframeContainer.style.visibility = this.options_.visibility;
      iframeContainer.style.width = '100%';
      iframeContainer.style.height = '100%';
      iframeContainer.style.top = '0';
      iframeContainer.style.left = '0';
      iframeContainer.style.position = 'absolute';

      el.appendChild(iframeContainer);
      var isOnMobile = this.isOnMobile();
      if (!isOnMobile && blocker !== false || blocker) {
        var divBlocker = _video2.default.createEl('div', {
          className: 'vjs-iframe-blocker',
          style: 'position:absolute;top:0;left:0;width:100%;height:100%'
        });

        // In case the blocker is still there and we want to pause
        _video2.default.on(divBlocker, 'click', _video2.default.bind(this, this.togglePlayPause));
        _video2.default.on(divBlocker, 'tap', _video2.default.bind(this, this.togglePlayPause));
        _video2.default.on(divBlocker, 'touchend', _video2.default.bind(this, this.togglePlayPause));

        el.appendChild(divBlocker);
      }

      var tagPlayer = (0, _video2.default)(this.options_.playerId);

      tagPlayer.addClass('vjs-' + this.className_);
      if (isOnMobile) {
        tagPlayer.addClass('vjs-' + this.className_ + '-mobile');
      }

      return el;
    }
  }, {
    key: 'togglePlayPause',
    value: function togglePlayPause() {
      if (this.paused()) {
        this.play();
      } else {
        this.pause();
      }
    }
  }, {
    key: 'isOnMobile',
    value: function isOnMobile() {
      return _video2.default.browser.IS_EDGE || _video2.default.browser.IS_ANDROID || _video2.default.browser.IS_IOS;
    }
  }, {
    key: 'addScriptTag',
    value: function addScriptTag() {
      var r = false,
          self = this,
          d = document,
          s = d.getElementsByTagName('head')[0] || d.documentElement;
      var js = d.createElement('script');
      js.async = true;
      js.type = 'text/javascript';
      js.onload = js.onreadystatechange = function () {
        var rs = this.readyState;
        if (!r && (!rs || /loaded|complete/.test(rs))) {
          r = true;
          // Handle memory leak in IE
          js.onload = js.onreadystatechange = null;
          self.initTech();
        }
      };

      js.src = this.options_.api;
      s.insertBefore(js, s.firstChild);
    }
  }, {
    key: 'loadApi',
    value: function loadApi() {
      if (!this.isApiReady()) {
        //Add to the queue because the Externals API is not ready
        Externals.apiReadyQueue.push(this);
        this.addScriptTag();
        this.injectCss();
      } else {
        this.initTech();
      }
    }
  }, {
    key: 'isApiReady',
    value: function isApiReady() {
      return false;
    }
  }, {
    key: 'initTech',
    value: function initTech() {
      this.setupTriggers();
      this.onStateChange({ data: -1, type: -1 });
    }
  }, {
    key: 'setupTriggers',
    value: function setupTriggers() {
      this.widgetPlayer.vjsTech = this;
      for (var i = Externals.Events.length - 1; i >= 0; i--) {
        var listener = _video2.default.bind(this, this.eventHandler);
        this.widgetPlayer.addEventListener(Externals.Events[i], listener);
      }
    }
  }, {
    key: 'eventHandler',
    value: function eventHandler(e) {
      if (!e) {
        return;
      }
      this.onStateChange(e);
    }

    /**
     * Handle state change events coming from the external API.
     *
     * It's here that you're expected to trigger the majority of your events.
     * Events to trigger are the HTML5 media events and videojs events:
     *   - https://www.w3.org/TR/html5/embedded-content-0.html#mediaevents
     *   - http://docs.videojs.com/Player.html#event:canplay
     * @param event
     */

  }, {
    key: 'onStateChange',
    value: function onStateChange(event) {
      var state = event.type;
      this.lastState = state;
      switch (state) {
        case -1:
          this.trigger('loadstart');
          this.trigger('waiting');
          break;

        case 'apiready':
          this.trigger('loadedmetadata');
          this.trigger('canplay');
          this.trigger('durationchange');
          this.onReady();
          break;

        case 'ended':
          break;

        case 'play':
          this.trigger('playing');
          break;

        case 'pause':
          break;

        case 'seeked':
          break;

        case 'timeupdate':
          break;

        case 'error':
          this.onPlayerError();
          break;
        default:
          console.debug("Unknown event ", event);
          this.trigger(event);
      }
    }
  }, {
    key: 'onReady',
    value: function onReady() {
      this.triggerReady();
    }
  }, {
    key: 'poster',
    value: function poster() {
      return this.poster_;
    }
  }, {
    key: 'setPoster',
    value: function setPoster(poster) {
      if (poster === undefined || poster === '') {
        poster = Externals._generateFallbackPoster();
      }
      this.poster_ = poster;
      this.trigger('posterchange');
    }

    /**
     * Set video
     *
     * @param {Object=} src Source object
     */

  }, {
    key: 'src',
    value: function src(_src) {
      if (typeof _src !== 'undefined' && this.src_ !== _src) {
        _src = Externals.sourceToString(_src);
        this.src_ = _src;
        this.setSrc(_src);
      }
      return this.currentSrc();
    }

    /**
     * Should call the external API to change the source
     *
     * @param src {SourceObject|String}
     * @abstract
     */

  }, {
    key: 'setSrc',
    value: function setSrc(src) {
      throw 'Not yet implemented but called with ' + src;
    }

    /**
     * Helper to get the simple source string
     *
     * @param source {SourceObject|String}
     * @returns {String}
     */

  }, {
    key: 'currentSrc',
    value: function currentSrc() {
      return this.src_;
    }
  }, {
    key: 'play',
    value: function play() {}
  }, {
    key: 'ended',
    value: function ended() {
      if (this.isReady_) {
        return this.lastState === 0;
      } else {
        // We will play it when the API will be ready
        return false;
      }
    }
  }, {
    key: 'pause',
    value: function pause() {}
  }, {
    key: 'paused',
    value: function paused() {
      return false;
    }

    /**
     * Get the position / current time in seconds
     * @returns {number}
     */

  }, {
    key: 'currentTime',
    value: function currentTime() {
      return 0;
    }

    /**
     * Seek to the given position in seconds
     * @param position {Number}
     */

  }, {
    key: 'setCurrentTime',
    value: function setCurrentTime(position) {
      this.currentTime = position;
    }
  }, {
    key: 'duration',
    value: function duration() {
      return 0;
    }
  }, {
    key: 'volume',
    value: function volume() {
      return this.volume_;
    }

    /**
     * Request to enter fullscreen
     *
     * @method enterFullScreen
     */

  }, {
    key: 'enterFullScreen',
    value: function enterFullScreen() {}

    /**
     * Request to exit fullscreen
     *
     * @method exitFullScreen
     */

  }, {
    key: 'exitFullScreen',
    value: function exitFullScreen() {}
  }, {
    key: 'setVolume',
    value: function setVolume(percentAsDecimal) {
      if (typeof percentAsDecimal !== 'undefined' && percentAsDecimal !== this.volume_) {
        this.volume_ = percentAsDecimal;
        this.trigger('volumechange');
      }
    }
  }, {
    key: 'buffered',
    value: function buffered() {
      return [];
    }
  }, {
    key: 'controls',
    value: function controls() {
      return false;
    }
  }, {
    key: 'muted',
    value: function muted() {
      return this.muted_;
    }
  }, {
    key: 'setMuted',
    value: function setMuted(muted) {
      this.muted_ = muted;
    }
  }, {
    key: 'supportsFullScreen',
    value: function supportsFullScreen() {
      return true;
    }
  }, {
    key: 'onPlayerError',
    value: function onPlayerError(e) {
      this.errorNumber = e ? e.data : null;
      this.trigger('error');
    }
  }, {
    key: 'error',
    value: function error() {
      return { code: 'External unknown error (' + this.errorNumber + ')' };
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      this.player().poster("");
      _get(Externals.prototype.__proto__ || Object.getPrototypeOf(Externals.prototype), 'dispose', this).call(this);
    }
  }], [{
    key: '_generateFallbackPoster',
    value: function _generateFallbackPoster() {
      var canvas = document.createElement("canvas");
      canvas.height = 100;
      canvas.width = 450;
      var context = canvas.getContext("2d");
      context.font = "90px serif";
      context.fillText("No poster", 0, 70);
      return canvas.toDataURL();
    }
  }, {
    key: 'sourceToString',
    value: function sourceToString(source) {
      return source && 'object' === (typeof source === 'undefined' ? 'undefined' : _typeof(source)) ? source.src : source || null;
    }
  }]);

  return Externals;
}(Tech);

Externals.prototype.className_ = ' vjs-externals';
Externals.prototype.widgetPlayer = {};

Externals.prototype.options_ = {
  visibility: 'hidden'
};

Externals.apiReadyQueue = [];

/* Externals Support Testing -------------------------------------------------------- */

/*
 * Set the tech's volume control support status
 *
 * @type {Boolean}
 */
Externals.prototype['featuresVolumeControl'] = true;

/*
 * Set the tech's playbackRate support status
 *
 * @type {Boolean}
 */
Externals.prototype['featuresPlaybackRate'] = false;

/*
 * Set the tech's status on moving the video element.
 * In iOS, if you move a video element in the DOM, it breaks video playback.
 *
 * @type {Boolean}
 */
Externals.prototype['movingMediaElementInDOM'] = false;

/*
 * Set the the tech's fullscreen resize support status.
 * HTML video is able to automatically resize when going to fullscreen.
 * (No longer appears to be used. Can probably be removed.)
 */
Externals.prototype['featuresFullscreenResize'] = false;

/*
 * Set the tech's timeupdate event support status
 * (this disables the manual timeupdate events of the Tech)
 */
Externals.prototype['featuresTimeupdateEvents'] = false;

/*
 * Set the tech's progress event support status
 * (this disables the manual progress events of the Tech)
 */
Externals.prototype['featuresProgressEvents'] = false;

/*
 * Sets the tech's status on native text track support
 *
 * @type {Boolean}
 */
Externals.prototype['featuresNativeTextTracks'] = true;

/*
 * Sets the tech's status on native audio track support
 *
 * @type {Boolean}
 */
Externals.prototype['featuresNativeAudioTracks'] = true;

/*
 * Sets the tech's status on native video track support
 *
 * @type {Boolean}
 */
Externals.prototype['featuresNativeVideoTracks'] = false;

/**
 * List of events the External will listen to coming from whatever they are wrapping
 *
 * Example:
 *  If wrapping an iframe and it will send 'buffering' to update the buffering progress,
 *  Add it here.
 * @type {*|string[]}
 */
Externals.Events = 'apiready,ad_play,ad_start,ad_timeupdate,ad_pause,ad_end,video_start,\n  \'video_end,play,playing,pause,ended,canplay,canplaythrough,timeupdate,progress,seeking,\n  \'seeked,volumechange,durationchange,fullscreenchange,error'.split(',');

Component.registerComponent('Externals', Externals);

Tech.registerTech('Externals', Externals);

exports.default = Externals;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Externals":5}],7:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lib/mixcloud":2,"./Externals":5}],8:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

var _Externals2 = require('./Externals');

var _Externals3 = _interopRequireDefault(_Externals2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file Soundcloud.js
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
 * @class Soundcloud
 */

var Soundcloud = function (_Externals) {
  _inherits(Soundcloud, _Externals);

  function Soundcloud(options, ready) {
    _classCallCheck(this, Soundcloud);

    options.autoplay = !!options.autoplay;
    return _possibleConstructorReturn(this, (Soundcloud.__proto__ || Object.getPrototypeOf(Soundcloud)).call(this, options, ready));
  }

  _createClass(Soundcloud, [{
    key: 'injectCss',
    value: function injectCss() {
      var css = '.vjs-' + this.className_ + ' > .vjs-poster { display:block; width:50%; }\n    .vjs-' + this.className_ + ' .vjs-tech { }\n    .vjs-' + this.className_ + ' .vjs-tech > .vjs-poster {  display:block; }\n    .vjs-' + this.className_ + '.vjs-has-started .vjs-poster {display:block;}\n    .vjs-soundcloud-info{position:absolute;display: flex;justify-content: center;align-items: center;left:50%;top:0;right:0;bottom:0;\n      text-align: center; pointer-events: none; text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.69);}';
      _get(Soundcloud.prototype.__proto__ || Object.getPrototypeOf(Soundcloud.prototype), 'injectCss', this).call(this, css);
    }
  }, {
    key: 'createEl',
    value: function createEl() {
      this.src_ = _Externals3.default.sourceToString(this.options_.source);

      var el_ = _get(Soundcloud.prototype.__proto__ || Object.getPrototypeOf(Soundcloud.prototype), 'createEl', this).call(this, 'iframe', {
        width: '100%',
        height: '100%',
        src: 'https://w.soundcloud.com/player/?url=' + this.src_ + '&auto_play=' + this.options_.autoplay + '&buying=false&liking=false&sharing=false&show_comments=false&show_playcount=false&show_user=false'
      });

      this.infosEl_ = _video2.default.createEl('div', {
        className: 'vjs-soundcloud-info'
      });

      el_.firstChild.style.visibility = this.options_.visibility;
      el_.appendChild(this.infosEl_);

      return el_;
    }
  }, {
    key: 'isApiReady',
    value: function isApiReady() {
      return window['SC'];
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

        case SC.Widget.Events.READY:
          this.onReady();
          this.trigger('loadedmetadata');
          this.trigger('durationchange');
          this.trigger('canplay');
          break;

        case SC.Widget.Events.FINISH:
          this.updatePause();
          this.trigger('ended');
          break;

        case SC.Widget.Events.PLAY:
          this.updatePause();
          this.trigger('play');
          this.trigger('waiting');
          break;

        case SC.Widget.Events.PLAY_PROGRESS:
          this.currentTime_ = this.duration_ * 1000 * event.relativePosition / 1000;
          this.trigger('canplay');
          this.trigger('playing');
          //this.trigger('timeupdate');
          break;

        case SC.Widget.Events.PAUSE:
          this.updatePause();
          this.trigger('pause');
          break;

        case SC.Widget.Events.SEEK:
          this.currentTime_ = event.currentPosition / 1000;
          this.trigger('seeked');
          break;

        case SC.Widget.Events.LOAD_PROGRESS:
          this.trigger('timeupdate');
          break;

        case SC.Widget.Events.ERROR:
          if (this.src_) {
            this.onPlayerError();
          }
          break;
      }
    }
  }, {
    key: 'parseSrc',
    value: function parseSrc(src) {
      if (src) {
        // Regex that parse the video ID for any Soundcloud URL
        var regExp = /^(https?:\/\/)?(www.|api.)?soundcloud.com\//i;
        var match = src.match(regExp);

        return match ? match[5] || match[3] : null;
      }
    }
  }, {
    key: 'onReady',
    value: function onReady() {
      this.updatePause();
      this.updateDuration();
      this.updateVolume();
      this.updatePoster();
      this.triggerReady();
    }
  }, {
    key: 'initTech',
    value: function initTech() {
      this.widgetPlayer = SC.Widget(this.options_.techId);
      _get(Soundcloud.prototype.__proto__ || Object.getPrototypeOf(Soundcloud.prototype), 'initTech', this).call(this);
    }
  }, {
    key: 'setupTriggers',
    value: function setupTriggers() {
      var _this2 = this;

      this.widgetPlayer.vjsTech = this;

      var _loop = function _loop() {
        var eventName = Soundcloud.Events[i];
        /*jshint loopfunc: true */
        _this2.widgetPlayer.bind(eventName, function (data) {
          _this2.eventHandler(_video2.default.mergeOptions({ type: eventName }, data));
        });
      };

      for (var i = Soundcloud.Events.length - 1; i >= 0; i--) {
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
    key: 'updatePause',
    value: function updatePause() {
      var _this3 = this;

      this.widgetPlayer.isPaused(function (paused) {
        _this3.paused_ = paused;
      });
    }
  }, {
    key: 'updateDuration',
    value: function updateDuration() {
      var _this4 = this;

      this.widgetPlayer.getDuration(function (duration) {
        _this4.duration_ = duration / 1000;
        _this4.trigger('durationchange');
      });
    }
  }, {
    key: 'updateVolume',
    value: function updateVolume() {
      var _this5 = this;

      this.widgetPlayer.getVolume(function (volume) {
        _this5.volume_ = volume;
        _this5.trigger('volumechange');
      });
    }
  }, {
    key: 'updatePoster',
    value: function updatePoster() {
      var _this6 = this;

      try {
        this.widgetPlayer.getCurrentSound(function (sound) {
          if (!sound) {
            return;
          }
          var artworkUrl = sound['artwork_url'];
          if (artworkUrl) {
            _this6.setPoster(artworkUrl.replace('large.jpg', 't500x500.jpg'));
          } else {
            _this6.setPoster();
          }
          var waveformUrl = sound['waveform_url'];
          if (waveformUrl) {
            _this6.subPosterImage.update(waveformUrl.replace('wis', 'w1').replace('json', 'png'));
          }
          _this6.update(sound);
        });
      } catch (e) {
        console.log('unable to set poster', e);
      }
    }
  }, {
    key: 'update',
    value: function update(sound) {
      this.infosEl_.innerHTML = sound.title;
    }
  }, {
    key: 'setSrc',
    value: function setSrc(src) {
      var _this7 = this;

      this.widgetPlayer.load(src, {
        'auto_play': this.options_.autoplay,
        'callback': function callback() {
          _this7.onStateChange({ type: SC.Widget.Events.READY });
        }
      });
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
      var newPosition = position * 1000;
      console.debug("seekTo: ", newPosition);
      this.widgetPlayer.seekTo(newPosition);
      this.trigger('seeking');
    }
  }, {
    key: 'play',
    value: function play() {
      this.widgetPlayer.play();
      this.updatePause();
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.widgetPlayer.pause();
      this.updatePause();
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
        this.volume_ = percentAsDecimal;
        this.muted_ = !this.volume_;
        this.widgetPlayer.setVolume(this.volume_);
        this.updateVolume();
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

  return Soundcloud;
}(_Externals3.default);

Soundcloud.prototype.className_ = 'soundcloud';

Soundcloud.prototype.options_ = {
  api: '//w.soundcloud.com/player/api.js',
  visibility: 'hidden',
  children: ['subPosterImage']
};

/* Soundcloud Support Testing -------------------------------------------------------- */

Soundcloud.isSupported = function () {
  return true;
};

// Add Source Handler pattern functions to this tech
Tech.withSourceHandlers(Soundcloud);

/*
 * The default native source handler.
 * This simply passes the source to the video element. Nothing fancy.
 *
 * @param  {Object} source   The source object
 * @param  {Flash} tech  The instance of the Flash tech
 */
Soundcloud.nativeSourceHandler = {};

/**
 * Check if Flash can play the given videotype
 * @param  {String} type    The mimetype to check
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Soundcloud.nativeSourceHandler.canPlayType = function (source) {
  return source.indexOf('soundcloud') !== -1;
};

/*
 * Check Soundcloud can handle the source natively
 *
 * @param  {Object} source  The source object
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Soundcloud.nativeSourceHandler.canHandleSource = function (source) {

  // If a type was provided we should rely on that
  if (source.type) {
    return Soundcloud.nativeSourceHandler.canPlayType(source.type);
  } else if (source.src) {
    return Soundcloud.nativeSourceHandler.canPlayType(source.src);
  } else if (typeof source === 'string') {
    return Soundcloud.nativeSourceHandler.canPlayType(source);
  }

  return '';
};

Soundcloud.nativeSourceHandler.handleSource = function (source, tech) {
  tech.src(source.src);
};

/*
 * Clean up the source handler when disposing the player or switching sources..
 * (no cleanup is needed when supporting the format natively)
 */
Soundcloud.nativeSourceHandler.dispose = function () {};

Soundcloud.Events = 'ready,play,playProgress,loadProgress,pause,seek,finish,error'.split(',');

// Register the native source handler
Soundcloud.registerSourceHandler(Soundcloud.nativeSourceHandler);

Component.registerComponent('Soundcloud', Soundcloud);

Tech.registerTech('Soundcloud', Soundcloud);

exports.default = Soundcloud;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Externals":5}],9:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

var _Externals2 = require('./Externals');

var _Externals3 = _interopRequireDefault(_Externals2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file spotify.js
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
 * @class Spotify
 */

var Spotify = function (_Externals) {
  _inherits(Spotify, _Externals);

  function Spotify(options, ready) {
    _classCallCheck(this, Spotify);

    return _possibleConstructorReturn(this, (Spotify.__proto__ || Object.getPrototypeOf(Spotify)).call(this, options, ready));
  }

  _createClass(Spotify, [{
    key: 'createEl',
    value: function createEl() {
      var _this2 = this;

      var source = null;
      if ('string' === typeof this.options_.source) {
        source = this.options_.source;
      } else if ('object' === _typeof(this.options_.source)) {
        source = this.options_.source.src;
      }

      var el_ = _get(Spotify.prototype.__proto__ || Object.getPrototypeOf(Spotify.prototype), 'createEl', this).call(this, 'iframe', {
        width: '100%',
        height: '100%',
        onload: function onload() {
          return _this2.onStateChange({ type: 'apiready' });
        },
        src: 'https://embed.spotify.com/?uri=' + source
      }, false);

      el_.firstChild.style.visibility = this.options_.visibility;

      var tagPlayer = (0, _video2.default)(this.options_.playerId);
      tagPlayer.controls(false);

      return el_;
    }
  }, {
    key: 'addScriptTag',
    value: function addScriptTag() {
      this.initTech();
    }
  }, {
    key: 'isApiReady',
    value: function isApiReady() {
      return true;
    }
  }, {
    key: 'parseSrc',
    value: function parseSrc(src) {
      return src;
    }
  }, {
    key: 'setupTriggers',
    value: function setupTriggers() {
      //SPOTIFY don't have embed api
    }
  }, {
    key: 'ended',
    value: function ended() {
      return false;
    }
  }, {
    key: 'play',
    value: function play() {}
  }, {
    key: 'pause',
    value: function pause() {}

    /**
     * Request to enter fullscreen
     *
     * @method enterFullScreen
     */

  }, {
    key: 'enterFullScreen',
    value: function enterFullScreen() {}

    /**
     * Request to exit fullscreen
     *
     * @method exitFullScreen
     */

  }, {
    key: 'exitFullScreen',
    value: function exitFullScreen() {}
  }, {
    key: 'src',
    value: function src(_src) {
      if (typeof _src !== 'undefined') {
        this.el_.src(_src);
      }
    }
  }]);

  return Spotify;
}(_Externals3.default);

Spotify.prototype.className_ = 'spotify';

Spotify.prototype.options_ = {
  api: '',
  visibility: 'show'
};

/* Spotify Support Testing -------------------------------------------------------- */

Spotify.isSupported = function () {
  return true;
};

// Add Source Handler pattern functions to this tech
Tech.withSourceHandlers(Spotify);

/*
 * The default native source handler.
 * This simply passes the source to the video element. Nothing fancy.
 *
 * @param  {Object} source   The source object
 * @param  {Flash} tech  The instance of the Flash tech
 */
Spotify.nativeSourceHandler = {};

/**
 * Check if Flash can play the given videotype
 * @param  {String} type    The mimetype to check
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Spotify.nativeSourceHandler.canPlayType = function (source) {
  return source.indexOf('spotify') !== -1;
};

/*
 * Check Spotify can handle the source natively
 *
 * @param  {Object} source  The source object
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Spotify.nativeSourceHandler.canHandleSource = function (source) {

  // If a type was provided we should rely on that
  if (source.type) {
    return Spotify.nativeSourceHandler.canPlayType(source.type);
  } else if (source.src) {
    return Spotify.nativeSourceHandler.canPlayType(source.src);
  }

  return '';
};

Spotify.nativeSourceHandler.handleSource = function (source, tech) {
  tech.src(source.src);
};

/*
 * Clean up the source handler when disposing the player or switching sources..
 * (no cleanup is needed when supporting the format natively)
 */
Spotify.nativeSourceHandler.dispose = function () {};

Spotify.Events = ''.split(',');

// Register the native source handler
Spotify.registerSourceHandler(Spotify.nativeSourceHandler);

Component.registerComponent('Spotify', Spotify);

Tech.registerTech('Spotify', Spotify);

exports.default = Spotify;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Externals":5}],10:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

var _Externals2 = require('./Externals');

var _Externals3 = _interopRequireDefault(_Externals2);

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file Vimeo.js
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
 * @class Vimeo
 */

var Vimeo = function (_Externals) {
    _inherits(Vimeo, _Externals);

    function Vimeo(options, ready) {
        _classCallCheck(this, Vimeo);

        return _possibleConstructorReturn(this, (Vimeo.__proto__ || Object.getPrototypeOf(Vimeo)).call(this, options, ready));
    }

    _createClass(Vimeo, [{
        key: 'createEl',
        value: function createEl() {

            var vimeoSource = null;
            if ('string' === typeof this.options_.source) {
                vimeoSource = this.options_.source;
            } else if ('object' === _typeof(this.options_.source)) {
                vimeoSource = this.options_.source.src;
            }

            vimeoSource = this.parseSrc(vimeoSource);

            var el_ = _get(Vimeo.prototype.__proto__ || Object.getPrototypeOf(Vimeo.prototype), 'createEl', this).call(this, 'iframe', {
                id: this.options_.techId,
                src: this.options_.embed + '/' + vimeoSource + '??api=1&player_id=' + this.options_.techId + '&fullscreen=1&autoplay=' + this.options_.autoplay
            });

            (0, _video2.default)(this.options_.playerId);
            return el_;
        }
    }, {
        key: 'parseSrc',
        value: function parseSrc(src) {
            if (src) {
                // Regex that parse the video ID for any Vimeo URL
                var regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
                var match = src.match(regExp);

                if (match && match[5]) {
                    return match[5];
                }
            }
        }
    }, {
        key: 'isApiReady',
        value: function isApiReady() {
            return _window2.default['Vimeo'] && _window2.default['Vimeo']['Player'];
        }
    }, {
        key: 'addScriptTag',
        value: function addScriptTag() {
            var self = this;
            if (_window2.default['requirejs']) {
                var requirejs = _window2.default['requirejs'];
                requirejs([this.options_.api], function (Vimeo) {
                    _window2.default['Vimeo'] = { Player: Vimeo };
                    self.initTech();
                });
            } else {
                var r = false,
                    d = document,
                    s = d.getElementsByTagName('head')[0] || d.documentElement;
                var js = d.createElement('script');
                js.async = true;
                js.type = 'text/javascript';
                js.onload = js.onreadystatechange = function () {
                    var rs = this.readyState;
                    if (!r && (!rs || /loaded|complete/.test(rs))) {
                        r = true;
                        // Handle memory leak in IE
                        js.onload = js.onreadystatechange = null;
                        self.initTech();
                    }
                };

                js.src = this.options_.api;
                s.insertBefore(js, s.firstChild);
            }
        }
    }, {
        key: 'initTech',
        value: function initTech() {
            if (!this.isApiReady()) {
                return;
            }
            var source = null;
            if ('string' === typeof this.options_.source) {
                source = this.options_.source;
            } else if ('object' === _typeof(this.options_.source)) {
                source = this.options_.source.src;
            }

            source = this.parseSrc(source);

            var vimOpts = _video2.default.mergeOptions(this.options_, {
                id: source,
                byline: 0,
                color: '#00adef',
                portrait: 0,
                fullscreen: 1
            });

            this.widgetPlayer = new _window2.default.Vimeo.Player(this.options_.techId, vimOpts);
            this.widgetPlayer.ready().then(_video2.default.bind(this, this.onReady));
            _get(Vimeo.prototype.__proto__ || Object.getPrototypeOf(Vimeo.prototype), 'initTech', this).call(this);
            this.onStateChange({ type: -1 });
        }
    }, {
        key: 'onReady',
        value: function onReady() {
            _get(Vimeo.prototype.__proto__ || Object.getPrototypeOf(Vimeo.prototype), 'onReady', this).call(this);
            this.onStateChange({ type: 'loaded' });
        }
    }, {
        key: 'setupTriggers',
        value: function setupTriggers() {
            var _this2 = this;

            this.widgetPlayer.vjsTech = this;

            var _loop = function _loop() {
                var eventName = Vimeo.Events[i];
                /*jshint loopfunc: true */
                _this2.widgetPlayer.on(eventName, function (data) {
                    _this2.eventHandler(_video2.default.mergeOptions({ type: eventName }, data));
                });
            };

            for (var i = Vimeo.Events.length - 1; i >= 0; i--) {
                _loop();
            }
        }
    }, {
        key: 'onStateChange',
        value: function onStateChange(event) {
            var state = event.type;
            this.lastState = state;
            _get(Vimeo.prototype.__proto__ || Object.getPrototypeOf(Vimeo.prototype), 'onStateChange', this).call(this, event);
            if (event.volume) {
                this.updateVolume();
            }
            if (event.duration && this.duration_ !== event.duration) {
                this.duration_ = event.duration;
                this.trigger('durationchange');
            }
            switch (state) {
                case 'loaded':
                    this.trigger('loadedmetadata');
                    this.trigger('durationchange');
                    this.trigger('canplay');
                    break;
                case 'timeupdate':
                    if (event.seconds) {
                        this.currentTime_ = event.seconds;
                        this.trigger('timeupdate');
                    }
                    break;
                case 'progress':
                    if (event.percent) {
                        this.buffered_ = event.percent;
                        this.trigger('progress');
                    }
                    break;
                case 'pause':
                    this.trigger('pause');
                    break;
                case 'play':
                    this.trigger('play');
                    break;
                case 'end':
                    this.updateEnded();
                    break;
            }
            this.updatePaused();
        }
    }, {
        key: 'updateVolume',
        value: function updateVolume() {
            var _this3 = this;

            this.widgetPlayer.getVolume().then(function (volume) {
                _this3.volume_ = volume;
                if (_this3.volume_ !== volume) {
                    _this3.trigger('volumechange');
                }
            });
        }
    }, {
        key: 'updateEnded',
        value: function updateEnded() {
            var _this4 = this;

            this.widgetPlayer.getEnded().then(function (ended) {
                _this4.ended_ = ended;
                if (ended) {
                    _this4.trigger('ended');
                }
            });
        }
    }, {
        key: 'updatePaused',
        value: function updatePaused() {
            var _this5 = this;

            this.widgetPlayer.getPaused().then(function (paused) {
                if (paused !== _this5.paused_) {
                    _this5.paused_ = paused;
                    if (paused) {
                        _this5.trigger('pause');
                    }
                }
            });
        }
    }, {
        key: 'updateDuration',
        value: function updateDuration() {
            var _this6 = this;

            this.widgetPlayer.getDuration().then(function (duration) {
                _this6.duration_ = duration;
            });
        }
    }, {
        key: 'buffered',
        value: function buffered() {
            return _video2.default.createTimeRange(0, this.buffered_ * this.duration_ || 0);
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
            var _this7 = this;

            this.widgetPlayer.setCurrentTime(seconds).then(function (seconds) {
                _this7.currentTime_ = seconds;
            });
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
                this.widgetPlayer.setVolume(percentAsDecimal).then(function () {
                    _this8.updateVolume();
                });
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

    return Vimeo;
}(_Externals3.default);

Vimeo.prototype.options_ = {
    api: '//player.vimeo.com/api/player.js',
    embed: '//player.vimeo.com/video',
    visibility: 'visible'
};

Vimeo.prototype.className_ = 'Vimeo';

/* Vimeo Support Testing -------------------------------------------------------- */

Vimeo.isSupported = function () {
    return true;
};

// Add Source Handler pattern functions to this tech
Tech.withSourceHandlers(Vimeo);

/*
 * The default native source handler.
 * This simply passes the source to the video element. Nothing fancy.
 *
 * @param  {Object} source   The source object
 * @param  {Flash} tech  The instance of the Flash tech
 */
Vimeo.nativeSourceHandler = {};

/**
 * Check if Flash can play the given videotype
 * @param  {String} type    The mimetype to check
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Vimeo.nativeSourceHandler.canPlayType = function (source) {
    return source.indexOf('vimeo') !== -1;
};

/*
 * Check Vimeo can handle the source natively
 *
 * @param  {Object} source  The source object
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Vimeo.nativeSourceHandler.canHandleSource = function (source) {

    // If a type was provided we should rely on that
    if (source.type) {
        return Vimeo.nativeSourceHandler.canPlayType(source.type);
    } else if (source.src) {
        return Vimeo.nativeSourceHandler.canPlayType(source.src);
    }

    return '';
};

Vimeo.nativeSourceHandler.handleSource = function (source, tech) {
    tech.src(source.src);
};

/*
 * Clean up the source handler when disposing the player or switching sources..
 * (no cleanup is needed when supporting the format natively)
 */
Vimeo.nativeSourceHandler.dispose = function () {};

// Register the native source handler
Vimeo.registerSourceHandler(Vimeo.nativeSourceHandler);

Vimeo.Events = 'loaded,play,ended,timeupdate,progress,seeked,texttrackchange,cuechange,volumechange,error'.split(',');

Component.registerComponent('Vimeo', Vimeo);

Tech.registerTech('Vimeo', Vimeo);

exports.default = Vimeo;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Externals":5,"global/window":12}],11:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Externals":5,"global/window":12}],12:[function(require,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],13:[function(require,module,exports){
'use strict';

require('./tech/Externals');

require('./tech/Dailymotion');

require('./tech/Deezer');

require('./tech/Jamendo');

require('./tech/Mixcloud');

require('./tech/Soundcloud');

require('./tech/Spotify');

require('./tech/Vimeo');

require('./tech/Youtube');

require('./component/sub-poster-image');
},{"./component/sub-poster-image":1,"./tech/Dailymotion":3,"./tech/Deezer":4,"./tech/Externals":5,"./tech/Jamendo":6,"./tech/Mixcloud":7,"./tech/Soundcloud":8,"./tech/Spotify":9,"./tech/Vimeo":10,"./tech/Youtube":11}]},{},[13])(13)
});
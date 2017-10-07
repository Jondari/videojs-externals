'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _video = require('video.js');

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
  }], [{
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
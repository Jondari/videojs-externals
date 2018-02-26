/**
 * @file videojs-externals.js
 * Externals (iframe) Media Controller - Wrapper for HTML5 Media API
 */
import videojs from 'video.js';

const Component = videojs.getComponent('Component');
//const ClickableComponent = videojs.getComponent('ClickableComponent');
const Tech = videojs.getComponent('Tech');

/**
 * Externals Media Controller - Wrapper for HTML5 Media API
 *
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready Ready callback function
 * @extends Tech
 * @class Externals
 */

class Externals extends Tech {
  constructor(options, ready) {
    super(options, ready);
    let url = options.source ? options.source.src : null;
    this.params = {
      id: this.options_.techId,
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
    this.paused_ = true;

    // If we are not on a server, don't specify the origin (it will crash)
    if (window.location.protocol !== 'file:') {
      this.params.origin = window.location.protocol + '//' + window.location.hostname;
    }

    this.videoId = this.parseSrc(url);
    // Set the vjs-youtube class to the player
    // Parent is not set yet so we have to wait a tick
    setTimeout(() => {
      this.loadApi();
    });
  }

  /**
   *
   * @returns {string}
   * @private
   */
  static _generateFallbackPoster() {
    let canvas = document.createElement("canvas");
    canvas.height = 100;
    canvas.width = 450;
    let context = canvas.getContext("2d");
    context.font = "90px serif";
    context.fillText("No poster", 0, 70);
    return canvas.toDataURL()
  }

  injectCss(overrideStyle) {
    let css = // iframe blocker to catch mouse events
      `.vjs-${this.className_} .vjs-iframe-blocker { display: none; }
      .vjs-${this.className_}.vjs-user-inactive .vjs-iframe-blocker { display: block; }
      .vjs-${this.className_} .vjs-poster { background-size: cover; }`;

    if (overrideStyle) {
      css += overrideStyle;
    }

    let head = document.head || document.getElementsByTagName('head')[0];

    let style = document.createElement('style');
    style.type = 'text/css';

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
  }

  parseSrc(src) {
    return src;
  }

  createEl(type, options, blocker) {

    let el = videojs.createEl('div', {
      id: 'vjs-tech' + this.options_.techId,
      className: 'vjs-tech vjs-tech-' + this.className_,
    });

    let iframeContainer = videojs.createEl(type, videojs.mergeOptions({
      id: this.options_.techId,
      scrolling: 'no',
      marginWidth: 0,
      marginHeight: 0,
      frameBorder: 0,
      webkitAllowFullScreen: '',
      mozallowfullscreen: '',
      allowFullScreen: '',
    }, options));

    iframeContainer.style.visibility = this.options_.visibility;
    iframeContainer.style.width = '100%';
    iframeContainer.style.height = '100%';
    iframeContainer.style.top = '0';
    iframeContainer.style.left = '0';
    iframeContainer.style.position = 'absolute';

    el.appendChild(iframeContainer);
    const isOnMobile = this.isOnMobile();
    if ((!isOnMobile && blocker !== false) || blocker) {
      let divBlocker = videojs.createEl('div',
        {
          className: 'vjs-iframe-blocker',
          style: 'position:absolute;top:0;left:0;width:100%;height:100%'
        });

      // In case the blocker is still there and we want to pause
      videojs.on(divBlocker, 'click', videojs.bind(this, this.togglePlayPause));
      videojs.on(divBlocker, 'tap', videojs.bind(this, this.togglePlayPause));
      videojs.on(divBlocker, 'touchend', videojs.bind(this, this.togglePlayPause));

      el.appendChild(divBlocker);
    }

    const tagPlayer = videojs(this.options_.playerId);

    tagPlayer.addClass(`vjs-${this.className_}`);
    if (isOnMobile) {
      tagPlayer.addClass(`vjs-${this.className_}-mobile`);
    }

    return el;
  }

  togglePlayPause() {
    if (this.paused()) {
      this.play();
    } else {
      this.pause();
    }
  }

  isOnMobile() {
    return videojs.browser.IS_EDGE || videojs.browser.IS_ANDROID || videojs.browser.IS_IOS;
  }

  addScriptTag() {
    var r = false,
      self = this,
      d = document,
      s = d.getElementsByTagName('head')[0] || d.documentElement;
    var js = d.createElement('script');
    js.async = true;
    js.type = 'text/javascript';
    js.onload = js.onreadystatechange = function() {
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

  loadApi() {
    if (!this.isApiReady()) {
      //Add to the queue because the Externals API is not ready
      Externals.apiReadyQueue.push(this);
      this.addScriptTag();
      this.injectCss();
    } else {
      this.initTech();
    }
  }

  isApiReady() {
    return false;
  }

  initTech() {
    this.setupTriggers();
    this.onStateChange({data: -1, type: -1});
  }

  setupTriggers() {
    this.widgetPlayer.vjsTech = this;
    for (var i = Externals.Events.length - 1; i >= 0; i--) {
      var listener = videojs.bind(this, this.eventHandler);
      this.widgetPlayer.addEventListener(Externals.Events[i], listener);
    }
  }

  eventHandler(e) {
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
  onStateChange(event) {
    let state = event.type;
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

  onReady() {
    this.triggerReady();
  }

  poster() {
    return this.poster_;
  }

  setPoster(poster) {
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
  src(src) {
    if (typeof src !== 'undefined' && this.src_ !== src) {
      src = Externals.sourceToString(src);
      this.src_ = src;
      this.setSrc(src);
    }
    return this.currentSrc();
  }

  /**
   * Should call the external API to change the source
   *
   * @param src {SourceObject|String}
   * @abstract
   */
  setSrc(src) {
    throw `Not yet implemented but called with ${src}`;
  }

  /**
   * Helper to get the simple source string
   *
   * @param source {SourceObject|String}
   * @returns {String}
   */
  static sourceToString(source) {
    return source && 'object' === (typeof source) ? source.src : (source || null);
  }

  currentSrc() {
    return this.src_;
  }

  play() {
  }

  ended() {
    if (this.isReady_) {
      return this.lastState === 0;
    } else {
      // We will play it when the API will be ready
      return false;
    }
  }

  pause() {
  }

  paused() {
    return false;
  }

  /**
   * Get the position / current time in seconds
   * @returns {number}
   */
  currentTime() {
    return 0;
  }

  /**
   * Seek to the given position in seconds
   * @param position {Number}
   */
  setCurrentTime(position) {
    this.currentTime = position;
  }

  duration() {
    return 0;
  }

  volume() {
    return this.volume_;
  }

  /**
   * Request to enter fullscreen
   *
   * @method enterFullScreen
   */
  enterFullScreen() {
  }

  /**
   * Request to exit fullscreen
   *
   * @method exitFullScreen
   */
  exitFullScreen() {
  }


  setVolume(percentAsDecimal) {
    if (typeof(percentAsDecimal) !== 'undefined' && percentAsDecimal !== this.volume_) {
      this.volume_ = percentAsDecimal;
      this.trigger('volumechange');
    }
  }

  buffered() {
    return [];
  }

  controls() {
    return false;
  }

  muted() {
    return this.muted_;
  }

  setMuted(muted) {
    this.muted_ = muted;
  }

  supportsFullScreen() {
    return true;
  }

  onPlayerError(e) {
    this.errorNumber = e ? e.data : null;
    this.trigger('error');
  }

  error() {
    return {code: 'External unknown error (' + this.errorNumber + ')'};
  }
}


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
 * Techs should normally update the time themselves.
 */
Externals.prototype['featuresTimeupdateEvents'] = true;

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
Externals.Events = `apiready,ad_play,ad_start,ad_timeupdate,ad_pause,ad_end,video_start,
  'video_end,play,playing,pause,ended,canplay,canplaythrough,timeupdate,progress,seeking,
  'seeked,volumechange,durationchange,fullscreenchange,error`.split(',');

Component.registerComponent('Externals', Externals);

Tech.registerTech('Externals', Externals);


export default Externals;

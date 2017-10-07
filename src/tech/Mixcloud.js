/**
 * @file MixcloudExternal.js
 * Externals (iframe) Media Controller - Wrapper for HTML5 Media API
 *
 * API documentation https://www.mixcloud.com/developers/widget/
 */
import videojs from 'video.js';
import Externals from './Externals';
import '../lib/mixcloud'

const Component = videojs.getComponent('Component');
const Tech = videojs.getComponent('Tech');

/**
 * Externals Media Controller - Wrapper for HTML5 Media API
 *
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready Ready callback function
 * @extends Tech
 * @class MixcloudExternal
 */

export default class MixcloudExternal extends Externals {
  constructor(options, ready) {
    super(options, ready);
  }

  createEl() {
    this.src_ = Externals.sourceToString(this.options_.source);


    // TODO return a div that will be filled by oEmbed
    // https://www.mixcloud.com/developers/#embedding
    // https://www.mixcloud.com/oembed/?format=json&url=...
    // or construct iframe from https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2Fmonstercat%2Fmonstercat-best-of-2014-album-mix%2F&hide_cover=1&mini=1&light=1
    return super.createEl('iframe', {
      width: '100%',
      height: '100%',
      src: this.generateIframeSrc(this.src_)
    });
  }

  isApiReady() {
    return window['Mixcloud'];
  }

  onStateChange(event) {
    let state = event.type;
    console.debug("event: ", event)
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
        var [position, duration] = event.data;
        this.trigger('progress');
        if (position !== this.currentTime_) {
          this.currentTime_ = position;
          this.trigger('timeupdate')
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

  parseSrc(src) {
    if (src) {
      // Regex that parse the video ID for any Mixcloud URL
      var regExp = /^(https?:\/\/)?(www.|api.)?mixcloud.com(\/[^#\?&]+)/i;
      var match = src.match(regExp);

      return match ? match[3] : null;
    }
    return null;
  }

  generateIframeSrc(src) {
    const videoId = this.parseSrc(src)
    return `//www.mixcloud.com/widget/iframe/?feed=${encodeURIComponent(videoId)}`;
  }

  onReady() {
    super.initTech();
    super.onReady();
  }

  initTech() {
    this.widgetPlayer = Mixcloud.PlayerWidget(this.el_.querySelector("iframe"));
    this.widgetPlayer.ready.then(() => {
      this.onReady();
      this.trigger('loadedmetadata');
      this.trigger('durationchange');
      this.trigger('canplay');
    })
    // We need to handle the widgetplayer not being loaded properly
    // In the ready event it will actually get to know which methods it can call
    // Beforehand the aren't there, so .load won't exist
    setTimeout(() => {
      if (!this.isReady_ || !this.widgetPlayer.load) {
        super.onReady()
      }
    }, 2000)
  }

  setupTriggers() {
    this.widgetPlayer.vjsTech = this;
    for (var i = MixcloudExternal.Events.length - 1; i >= 0; i--) {
      const eventName = MixcloudExternal.Events[i];
      const self = this;
      this.widgetPlayer.events[eventName].on(function () {
        self.eventHandler(videojs.mergeOptions({type: eventName}, {data: arguments}));
      });
    }
  }

  ended() {
    return this.duration() === this.currentTime();
  }

  /**
   * Request to enter fullscreen
   *
   * @method enterFullScreen
   */
  enterFullScreen() {
    this.widgetPlayer.webkitEnterFullScreen();
  }

  /**
   * Request to exit fullscreen
   *
   * @method exitFullScreen
   */
  exitFullScreen() {
    this.widgetPlayer.webkitExitFullScreen();
  }

  updateVolume() {
    this.widgetPlayer.getVolume((volume) => {
      this.volume_ = volume;
      this.trigger('volumechange');
    });
  }

  updatePoster() {
    try {
      this.widgetPlayer.getCurrentSound((sound) => {
        if (!sound) {
          return;
        }
        let artworkUrl = sound['artwork_url'];
        if (artworkUrl) {
          this.setPoster(artworkUrl.replace('large.jpg', 't500x500.jpg'));
        }
        let waveformUrl = sound['waveform_url'];
        if (waveformUrl) {
          this.subPosterImage.update(waveformUrl.replace('wis', 'w1').replace('json', 'png'));
        }
        this.update(sound);
      });
    } catch (e) {
      console.log('unable to set poster', e);
    }
  }

  setSrc(src) {
    this.src_ = src;
    // If initialized without a source, no methods are initialized
    if (this.widgetPlayer.load) {
      this.widgetPlayer.load(this.parseSrc(this.src_)).then(() => {
        this.trigger("canplay");
      });
    } else {
      const iframe = this.el_.querySelector("iframe");
      iframe.src = this.generateIframeSrc(src);
      this.initTech();
    }
  }

  duration() {
    return this.duration_;
  }

  currentTime() {
    return this.currentTime_;
  }

  setCurrentTime(position) {
    this.widgetPlayer.seek(position).then(() => {
      this.trigger("seeked");
    });
    this.trigger("seeking");
  }

  play() {
    this.widgetPlayer.play();
  }

  pause() {
    this.widgetPlayer.pause();
  }

  paused() {
    return this.paused_;
  }

  muted() {
    return this.muted_;
  }

  volume() {
    return this.volume_;
  }

  setVolume(percentAsDecimal) {
    if (percentAsDecimal !== this.volume_) {
      this.volume_ = percentAsDecimal;
      this.muted_ = !this.volume_;
      this.widgetPlayer.setVolume(this.volume_).then(() => {
        this.trigger("volumechange");
      });
    }
  }

  setMuted(muted) {
    this.muted_ = muted;
    this.widgetPlayer.setVolume(this.muted_ ? 0 : this.volume_);
    this.updateVolume();
  }
}

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
  return (source.indexOf('mixcloud') !== -1);
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
MixcloudExternal.nativeSourceHandler.dispose = function () {
};


MixcloudExternal.Events = [
  "progress",
  "buffering",
  "play",
  "pause",
  "ended",
  "error"
];

// Register the native source handler
MixcloudExternal.registerSourceHandler(MixcloudExternal.nativeSourceHandler);

Component.registerComponent('Mixcloud', MixcloudExternal);

Tech.registerTech('Mixcloud', MixcloudExternal);

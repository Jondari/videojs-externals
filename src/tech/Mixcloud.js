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
    var url = new URL(this.src_);

    const iframeSrc = `//www.mixcloud.com/widget/iframe/?feed=${encodeURIComponent(url.pathname)}`;

    // TODO return a div that will be filled by oEmbed
    // https://www.mixcloud.com/developers/#embedding
    // https://www.mixcloud.com/oembed/?format=json&url=...
    // or construct iframe from https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2Fmonstercat%2Fmonstercat-best-of-2014-album-mix%2F&hide_cover=1&mini=1&light=1
    return super.createEl('iframe', {
      width: '100%',
      height: '100%',
      src: iframeSrc
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
        this.paused_ = false;
        this.trigger('play');
        break;

      case "progress":
        this.currentTime_ = ((this.duration_ * 1000) * event.relativePosition) / 1000;
        this.trigger('playing');
        this.trigger('timeupdate');
        break;

      case "pause":
        this.paused_ = true;
        this.trigger('pause');
        break;

      // case SC.Widget.Events.SEEK:
      //   this.currentTime_ = event.currentPosition / 1000
      //   this.trigger('seeked');
      //   break;

      case "buffering":
        this.trigger('timeupdate');
        break;

      case "error":
        this.onPlayerError();
        break;
    }
  }

  parseSrc(src) {
    if (src) {
      // Regex that parse the video ID for any MixcloudExternal URL
      var regExp = /^(https?:\/\/)?(www.|api.)?mixcloud.com\//i;
      var match = src.match(regExp);

      return match ? match[5] || match[3] : null;
    }
  }
  //
  // onReady() {
  //   this.updatePause();
  //   this.updateDuration();
  //   this.updateVolume();
  //   this.updatePoster();
  //   this.triggerReady();
  // }

  initTech() {
    this.widgetPlayer = Mixcloud.PlayerWidget(this.el_.querySelector("iframe"));
    this.widgetPlayer.ready.then(() => {
      this.onReady();
      this.trigger('loadedmetadata');
      this.trigger('durationchange');
      this.trigger('canplay');
    })
      // .catch(() => {
      //   console.error("Couldn't init Mixcloud player", arguments);
      //   this.onReady();
      // });
    super.initTech();
  }

  setupTriggers() {
    this.widgetPlayer.vjsTech = this;
    for (var i = MixcloudExternal.Events.length - 1; i >= 0; i--) {
      const eventName = MixcloudExternal.Events[i];
      this.widgetPlayer.events[eventName] = (data) => {
        this.eventHandler(videojs.mergeOptions({type: eventName}, data));
      };
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

  updateDuration() {
    this.widgetPlayer.getDuration((duration) => {
      this.duration_ = duration / 1000;
      this.trigger('durationchange');
    });
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
    this.widgetPlayer.load(src, {
        'auto_play': this.options_.autoplay,
        'callback': () => {
          this.onStateChange({type: SC.Widget.Events.READY});
        }
      }
    );
  }

  duration() {
    return this.duration_;
  }

  currentTime() {
    return this.currentTime_;
  }

  setCurrentTime(position) {
    const newPosition = position * 1000;
    console.debug("seekTo: ", newPosition)
    this.widgetPlayer.seekTo(newPosition);
    this.trigger('seeking');
  }

  play() {
    this.widgetPlayer.play();
  }

  pause() {
    this.widgetPlayer.pause();
    this.updatePause();
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
      this.widgetPlayer.setVolume(this.volume_);
      this.updateVolume();
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

/**
 * @file Jamendo.js
 * Jamendo (iframe) Media Controller - Wrapper for HTML5 tech to play Jamendo URLs
 */
import videojs from 'video.js';

import Externals from './Externals';
import utils from '../lib/utils'

const Component = videojs.getComponent('Component');
const Tech = videojs.getComponent('Tech');
const Html5 = videojs.getComponent('Html5');

/**
 * Jamendo Media Controller - Wrapper for HTML5 Tech
 *
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready Ready callback function
 * @extends Html5
 * @class Jamendo
 */

export default class Jamendo extends Html5 {

  constructor(options, ready) {
    super(options, ready);

    this.clientId = options.clientId;

    this.ready(() => {
      if (this.src_) {
        this.setPoster(this.src_)
      }
    })
  }

  /**
   * Set jamendo source
   *
   * @param {Object=} src Source object
   */
  src(src) {
    if (typeof src !== 'undefined' && this.src_ !== src) {
      src = Externals.sourceToString(src);
      this.src_ = src;
      this.setSrc(src);

      // Wait till we're ready to change the poster
      // Otherwise the "posterchange" event might be triggered
      // before any listeners are registered
      if (this.ready_) {
        this.setPoster(src);
      }
    }
    return this.currentSrc();
  }

  setPoster(jamendoSrc) {
    let promise;
    let trackId = Jamendo.parseSrc(jamendoSrc);
    let fallbackUrl = `https://imgjam1.jamendo.com/tracks/s1466/${trackId}/covers/1.300.jpg`;
    if (this.clientId) {
      // Use the API to get the right image URL and more data about the track
      // Doc https://developer.jamendo.com/v3.0/tracks
      // TODO possibly do this only once and save the promise in the class
      promise = new Promise((resolve, reject) => {
        let queryParams = utils.encodeQueryData({
          client_id: this.clientId,
          id: trackId,
          imagesize: 600
        });
        videojs.xhr({
          url: `https://api.jamendo.com/v3.0/tracks/?${queryParams}`,
          json: true,
        }, (error, response, body) => {
          let posterUrl = fallbackUrl;
          if (!error && body.results && body.results.length > 0) {
            let track = body.results[0];
            posterUrl = track.image || posterUrl;
          }

          // The player may have been destroyed before getting the response
          // TODO maybe also check that we're setting the poster for the right source?
          // TODO the track may have changed in the meantime
          this.el_ && resolve(posterUrl);
        })
      })
    } else {
      promise = Promise.resolve(fallbackUrl);
    }
    promise.then((posterUrl) => {
      super.setPoster(posterUrl);
      this.trigger('posterchange');
    })
  }

  currentSrc() {
    return this.src_;
  }

  setSrc(src) {
    // Use the `tracks/file` API to build URL for a redirection to the file
    // https://developer.jamendo.com/v3.0/tracks/file
    // Otherwise use the API to get the real mp3 URL
    super.setSrc(`https://mp3l.jamendo.com/?trackid=${Jamendo.parseSrc(src)}&format=mp31`);
  }

  /**
   * Extracts the track ID from a jamendo URL
   * @param src {String}
   */
  static parseSrc(src) {
    // https://www.jamendo.com/track/1465419/thunder-god
    const srcPath = new URL(src).pathname;
    const match = /\/?track\/(\d+).+/.exec(srcPath);
    return match ? match[1] : null
  }

}

// Add Source Handler pattern functions to this tech
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
  return (source.indexOf('jamendo') !== -1);
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
Jamendo.nativeSourceHandler.dispose = function () {
};

// Register the native source handler
Jamendo.registerSourceHandler(Jamendo.nativeSourceHandler);

Component.registerComponent('Jamendo', Jamendo);

Tech.registerTech('Jamendo', Jamendo);

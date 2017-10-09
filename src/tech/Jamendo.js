/**
 * @file Jamendo.js
 * Jamendo (iframe) Media Controller - Wrapper for HTML5 Media API
 */
import videojs from 'video.js';

import Externals from './Externals';

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

  currentSrc() {
    return this.src_;
  }

  setSrc(src) {
    // Use the `tracks/file` API to build URL for a redirection to the file
    // https://developer.jamendo.com/v3.0/tracks/file
    // TODO test with more sources to see if the URL will change
    // Otherwise use the API to get the real mp3 URL
    super.setSrc(`https://mp3l.jamendo.com/?trackid=${Jamendo.parseSrc(src)}&format=mp31`);
    // super.setSrc(`https://api.jamendo.com/v3.0/tracks/file/?client_id=${this.options_.clientId}&id=${Jamendo.parseSrc(src)}`);
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
  tech.src(source.src);
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

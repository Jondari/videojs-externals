/*
 Create a spy for all functions of a given object
 by spying on the object's prototype
 @param o {Object} object to invade
 */

function getSourceString(stringOrSourceObject) {
  return 'object' === typeof stringOrSourceObject ? stringOrSourceObject.src : stringOrSourceObject;
}

var widgetPlayerTest = function (done) {
  this.player.ready(() => {
    var source = null;
    if (this.source) {
      source = ( typeof this.source) === 'string' ? this.source : this.source.src;
    }
    var iframe = document.getElementsByTagName('iframe')[0];
    expect(iframe).toBeTruthy();
    expect(iframe.src).toMatch(new RegExp(`w.soundcloud.com/player/\\?url=${source}.*`));
    done();
  });
};

var playTest = function (done) {
  this.player.ready(() => {
    // Register for when soundcloud will actually start playing
    let player = this.player;
    player.on('play', () => {
      expect(this.player.paused()).toBeFalsy();
      this.player.one('playing', () => {
        setTimeout(() => {
          expect(this.player.currentTime()).toBeGreaterThan(0);
          done();
        }, 1000);
      });
    });

    // Async request
    player.play();
  });
};
var seekTo30Test = function (done) {
  let player = this.player;
  player.ready(() => {
    var seconds = 30;
    player.on('play', () => {
      player.currentTime(seconds);
    });
    player.on('seeked', () => {
      expect(Math.round(player.currentTime())).toEqual(seconds);
      done();
    });
    player.play();
  });
};
var changeVolumeTest = function (done) {
  return this.player.ready(() => {
    var volume = 0.5;
    this.player.on('volumechange', () => {
      expect(this.player.volume()).toEqual(volume);
      done();
    });
    this.player.volume(volume);

  });
};
/*
 Try changing the source with a string
 It should trigger the 'newSource' event

 The input is the same as vjs.Player.src (that's what's called)
 Which calls @see Soundcloud::src

 @param newSource [Object] { type: <String>, src: <String>}
 @param newSource [String] The URL
 @return [Function] To pass to karma for testing a source change
 */
var changeSourceTest = function (newSource) {
  var newSourceString;
  newSourceString = getSourceString(newSource);
  return function (done) {
    let player = this.player;
    player.one('ready', () => {
      player.one('canplay', () => {
        var playerSrc = getSourceString(player.src());
        console.debug('changed source to', playerSrc);
        console.debug('expecting', newSourceString);
        expect(playerSrc).toEqual(newSourceString);
        done();
      });
      console.debug('changing source to ', newSource);
      player.src(newSource);
    });
  };
};

import {MainTestFactory} from './base/base';
import BaseTestConfiguration from './base/BaseTestConfiguration';
import HtmlSourceTestSuiteGenerator from './base/generators/HtmlSourceTestSuiteGenerator';
import NoSourceTestSuiteGenerator from './base/generators/NoSourceTestSuiteGenerator';
import ObjectSourceTestSuiteGenerator from './base/generators/ObjectSourceTestSuiteGenerator';
import StringSourceTestSuiteGenerator from './base/generators/StringSourceTestSuiteGenerator';

const MIME_TYPE = 'audio/soundcloud';
const basicConfiguration = new BaseTestConfiguration(
  'Soundcloud',
  widgetPlayerTest,
  playTest,
  seekTo30Test,
  changeVolumeTest,
  changeSourceTest
);

var apiSource = {
  src: 'https://api.soundcloud.com/tracks/216846955&amp;auto_play=false&amp;hide_related=false&amp;' +
  'show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true',
  type: 'audio/soundcloud'
};
var extraTests = [
  function () {
    it('should take api object sources', basicConfiguration.changeSourceTest(apiSource));
  },
  function () {
    it('should take api string sources', basicConfiguration.changeSourceTest(apiSource.src));
  }
];

const htmlSourceTestSuiteGenerator = new HtmlSourceTestSuiteGenerator(
  basicConfiguration,
  {src: 'https://soundcloud.com/vaughan-1-1/this-is-what-crazy-looks-like', type: MIME_TYPE},
  {src: 'https://soundcloud.com/user504272/teki-latex-dinosaurs-with-guns-cyberoptix-remix', type: MIME_TYPE},
  extraTests
);
const noSourceTestSuiteGenerator = new NoSourceTestSuiteGenerator(
  basicConfiguration,
  null,
  {src: 'https://soundcloud.com/pegboardnerds/pegboard-nerds-here-it-comes', type: MIME_TYPE},
  'test/resources/videojs_from_script.html',
  extraTests
);
const objectSourceTestSuiteGenerator = new ObjectSourceTestSuiteGenerator(
  basicConfiguration,
  {src: 'https://soundcloud.com/oshi/kali-uchi', type: MIME_TYPE},
  {src: 'https://soundcloud.com/apexrise/or-nah', type: MIME_TYPE},
  'test/resources/videojs_from_script.html',
  extraTests
);
const stringSourceTestSuiteGenerator = new StringSourceTestSuiteGenerator(
  basicConfiguration,
  {src: 'https://soundcloud.com/hipster-online/04-sweet-home-alabama', type: MIME_TYPE},
  {src: 'https://soundcloud.com/nordemusic/missing-you-ft-lucas-nord', type: MIME_TYPE},
  'test/resources/videojs_from_script.html',
  extraTests
);


var testFactory = new MainTestFactory(basicConfiguration);

testFactory.addTestSuiteFactory(htmlSourceTestSuiteGenerator);
testFactory.addTestSuiteFactory(noSourceTestSuiteGenerator);
testFactory.addTestSuiteFactory(objectSourceTestSuiteGenerator);
testFactory.addTestSuiteFactory(stringSourceTestSuiteGenerator);

testFactory.generate();


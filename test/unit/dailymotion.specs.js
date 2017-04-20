/*
 Create a spy for all functions of a given object
 by spying on the object's prototype
 @param o {Object} object to invade
 */

function getSourceString(stringOrSourceObject) {
  return 'object' === typeof stringOrSourceObject ? stringOrSourceObject.src : stringOrSourceObject
}

function getDailymotionVideoId(source){
  return videojs.getComponent("Dailymotion").prototype.parseSrc(getSourceString(source))
}

var widgetPlayerTest = function (done) {
  this.player.ready(() => {
    var iframe = document.getElementsByTagName('iframe')[0];
    expect(iframe).toBeTruthy();
    var sourceId = getDailymotionVideoId(this.source);
    expect(iframe.src).toMatch(new RegExp(`^https?://www.dailymotion.com/embed/video/${sourceId}`));
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

import {MainTestFactory} from './base/base'
import BaseTestConfiguration from './base/BaseTestConfiguration'
import HtmlSourceTestSuiteGenerator from './base/generators/HtmlSourceTestSuiteGenerator'
import NoSourceTestSuiteGenerator from './base/generators/NoSourceTestSuiteGenerator'
import ObjectSourceTestSuiteGenerator from './base/generators/ObjectSourceTestSuiteGenerator'
import StringSourceTestSuiteGenerator from './base/generators/StringSourceTestSuiteGenerator'

const MIME_TYPE = "video/dailymotion";
const basicConfiguration = new BaseTestConfiguration(
  "Dailymotion",
  widgetPlayerTest,
  playTest,
  seekTo30Test,
  changeVolumeTest,
  changeSourceTest
)

const htmlSourceTestSuiteGenerator = new HtmlSourceTestSuiteGenerator(
  basicConfiguration,
  {src: 'http://www.dailymotion.com/video/x5j0y0q_les-candidats-les-plus-badass-de-la-presidentielle-2017_fun', type: MIME_TYPE},
  {src: 'http://www.dailymotion.com/video/x51h80y_emilija-veljkovic-u-seniorskoj-rukometnoj-reprezentaciji-srbije-10-novembar-2016-rtv-bor_news', type: MIME_TYPE}
);
const noSourceTestSuiteGenerator = new NoSourceTestSuiteGenerator(
  basicConfiguration,
  null,
  {src: 'https://soundcloud.com/pegboardnerds/pegboard-nerds-here-it-comes', type: MIME_TYPE},
  'test/resources/videojs_from_script.html'
);
const objectSourceTestSuiteGenerator = new ObjectSourceTestSuiteGenerator(
  basicConfiguration,
  {src: 'https://soundcloud.com/oshi/kali-uchi', type: MIME_TYPE},
  {src: 'https://soundcloud.com/apexrise/or-nah', type: MIME_TYPE},
  'test/resources/videojs_from_script.html'
);
const stringSourceTestSuiteGenerator = new StringSourceTestSuiteGenerator(
  basicConfiguration,
  {src: 'https://soundcloud.com/hipster-online/04-sweet-home-alabama', type: MIME_TYPE},
  {src: 'https://soundcloud.com/nordemusic/missing-you-ft-lucas-nord', type: MIME_TYPE},
  'test/resources/videojs_from_script.html'
);


var testFactory = new MainTestFactory(basicConfiguration)

testFactory.addTestSuiteFactory(htmlSourceTestSuiteGenerator)
// testFactory.addTestSuiteFactory(noSourceTestSuiteGenerator)
// testFactory.addTestSuiteFactory(objectSourceTestSuiteGenerator)
// testFactory.addTestSuiteFactory(stringSourceTestSuiteGenerator)

testFactory.generate()


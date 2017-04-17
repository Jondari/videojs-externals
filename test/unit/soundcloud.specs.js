/*
 Create a spy for all functions of a given object
 by spying on the object's prototype
 @param o {Object} object to invade
 */

var widgetPlayerTest = function (done) {
  this.player.ready(() => {
    var source = ( typeof this.source) === "string" ? this.source : this.source.src;
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
      player.pause();
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
  newSourceString = 'object' === typeof newSource ? newSource.src : newSource;
  return function (done) {
    let player = this.player;
    player.one('canplay', () => {
      player.one('canplay', () => {
        console.debug('changed source for to', newSource);
        expect(player.src()).toEqual(newSourceString);
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
import ObjectSourceTestSuiteGenerator from './base/generators/ObjectSourceTestSuiteGenerator'
import StringSourceTestSuiteGenerator from './base/generators/StringSourceTestSuiteGenerator'

var basicConfiguration = new BaseTestConfiguration(
  "Soundcloud",
  widgetPlayerTest,
  playTest,
  seekTo30Test,
  changeVolumeTest,
  changeSourceTest
)

var testFactory = new MainTestFactory(basicConfiguration)

const MIME_TYPE = "audio/soundcloud";
testFactory.addTestSuiteFactory(new HtmlSourceTestSuiteGenerator(
  basicConfiguration,
  {src: 'https://soundcloud.com/vaughan-1-1/this-is-what-crazy-looks-like', type: MIME_TYPE},
  {src: 'https://soundcloud.com/user504272/teki-latex-dinosaurs-with-guns-cyberoptix-remix', type: MIME_TYPE}
))
testFactory.addTestSuiteFactory(new StringSourceTestSuiteGenerator(
  basicConfiguration,
  {src: 'https://soundcloud.com/hipster-online/04-sweet-home-alabama', type: MIME_TYPE},
  {src: 'https://soundcloud.com/nordemusic/missing-you-ft-lucas-nord', type: MIME_TYPE},
  'test/resources/videojs_from_script.html'
))
testFactory.addTestSuiteFactory(new ObjectSourceTestSuiteGenerator(
  basicConfiguration,
  {src: 'https://soundcloud.com/oshi/kali-uchi', type: MIME_TYPE},
  {src: 'https://soundcloud.com/apexrise/or-nah', type: MIME_TYPE},
  'test/resources/videojs_from_script.html'
))

testFactory.generate()

// describe('videojs-soundcloud plugin', function () {
//
//   describe('created with no source', function () {
//     beforeEach(function () {
//       console.debug('beforeEach with no source tag');
//       this.source = 'https://soundcloud.com/monstercat/pegboard-nerds-self-destruct';
//       this.vFromScript = window.__html__['test/resources/videojs_from_script.html'];
//       document.body.innerHTML = this.vFromScript;
//       expect(document.getElementById(this.videoTagId)).not.toBeNull();
//       this.player = videojs(this.videoTagId, {
//         'techOrder': ['soundcloud']
//       });
//     });
//
//     /* To use with @see changeSourceTest */
//     var secondSource = {
//       src: 'https://soundcloud.com/pegboardnerds/pegboard-nerds-here-it-comes',
//       type: 'audio/soundcloud'
//     };
//     var apiSource = {
//       src: 'https://api.soundcloud.com/tracks/216846955&amp;auto_play=false&amp;hide_related=false&amp;' +
//       'show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true',
//       type: 'audio/soundcloud'
//     };
//     it('should change object sources', changeSourceTest(secondSource));
//     it('should change string sources', changeSourceTest(secondSource.src));
//     it('should take api object sources', changeSourceTest(apiSource));
//     it('should take api string sources', changeSourceTest(apiSource.src));
//   });
// });
//

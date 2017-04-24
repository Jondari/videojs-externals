var _ = require('lodash-compat');

export default class TestSuiteGenerator {
  basicConfiguration;
  firstSourceObject;
  secondSourceObject;
  extraTestGenerators;

  /**
   *
   * When overriding, set the description otherwise your tests won't have one...
   *
   * @param basicConfiguration {BaseTestConfiguration}
   * @param firstSourceObject {SourceObject}
   * @param secondSourceObject {SourceObject}
   * @param extraTestGenerators {Function[]}
   *          Functions that take no parameters and that make further jasmine calls e.g `describe`, `it`, etc.
   *          The are bound to the generator (this = current generator),
   *           therefore they can make calls to the private methods and generators
   */
  constructor(basicConfiguration,
              firstSourceObject,
              secondSourceObject,
              extraTestGenerators) {
    this.description = 'TO BE filled';
    this.basicConfiguration = basicConfiguration;
    this.firstSourceObject = firstSourceObject;
    this.secondSourceObject = secondSourceObject;
    this.extraTestGenerators = extraTestGenerators || [];
    this.techNameForVjs = basicConfiguration.techName.toLowerCase();
  }

  /**
   * Main method. Creates a jasmine test suite.
   */
  generate() {
    var self = this;
    describe(this.description, function () {
      self._generateTests();
      self._generateCommonTests();
      self._generateExtraTests();
    });
  }

  /**
   * To be overridden by child classes
   *
   * beforeEach, afterEach, it, etc. should be put in here
   *
   * @private
   * @abstract
   */
  _generateTests() {
    throw 'not implemented';
  }


  _generateCommonTests() {
    // TODO add test for track without artwork
    it('should create widget player', this._generateWidgetPlayerTest());
    it('should play the song', this._generatePlayTest());
    it('should seek to 30 seconds', this._generateSeekTo30Test());
    it('should halve the volume', this._generateHalveVolumeTest());

    it('should change object sources', this._generateChangeSourceTest(this.secondSourceObject));
    it('should change string sources', this._generateChangeSourceTest(this.secondSourceObject.src));
  }

  /**
   * Create a function with a jasmine test that tries to load a new source into the tech
   *
   * @param newSource {SourceObject|String}
   * @returns {Function}
   * @private
   */
  _generateChangeSourceTest(newSource) {
    var getSourceString = videojs.getComponent('Externals').sourceToString;
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
  }

  /**
   * Create a function with a jasmine test that tries to halve the volume
   * @returns {Function}
   * @private
   */
  _generateHalveVolumeTest() {
    return function (done) {
      return this.player.ready(() => {
        var volume = 0.5;
        this.player.on('volumechange', () => {
          expect(this.player.volume()).toEqual(volume);
          done();
        });
        this.player.volume(volume);

      });
    };
  }

  /**
   * Create a function with a jasmine test that tries to play the current source
   *
   * @returns {Function}
   * @private
   */
  _generatePlayTest() {
    return function (done) {
      this.player.ready(() => {
        // Register for when player will actually start playing
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
  }

  /**
   * Create a function with a jasmine test that tries to seek to 30 seconds
   * Of course that means you should use sources that are greater than 30 seconds in length
   *
   * @returns {Function}
   * @private
   */
  _generateSeekTo30Test() {
    return function (done) {
      let player = this.player;
      player.ready(() => {
        var seconds = 30;
        player.on('play', () => {
          console.debug('playing -> gonna seek');
          player.currentTime(seconds);
        });
        player.on('seeked', () => {
          let time = player.currentTime();
          console.debug('seeked to ', time);
          expect(Math.round(time)).toEqual(seconds);
          done();
        });
        player.play();
      });
    };
  }

  /**
   * Create a function with a jasmine test that checks if a widget player is created for the tech.
   *
   * @returns {Function}
   * @private
   */
  _generateWidgetPlayerTest() {
    const iframeSourceTest = this.basicConfiguration.iframeSourceTest;
    return function (done) {
      this.player.ready(() => {
        var iframe = document.getElementsByTagName('iframe')[0];
        expect(iframe).toBeTruthy();
        iframeSourceTest(iframe.src, this.source);
        done();
      });
    };
  }

  _generateExtraTests() {
    this.extraTestGenerators.forEach((generator) => generator.apply(this));
  }
}

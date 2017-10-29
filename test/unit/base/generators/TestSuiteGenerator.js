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
    this.playerOptions = {
        techOrder: [this.techNameForVjs],
        [this.techNameForVjs]: this.basicConfiguration.techOptions || {}
      }
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
    if (this.basicConfiguration.iframeSourceTest) {
      it('should create widget player', this._generateWidgetPlayerTest());
    }
    if (!this.basicConfiguration.toggledTests.poster) {
      it('should have a poster', this._generatePosterTest());
    }
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
        this.player.one('playing', () => {
          this.player.one('volumechange', () => {
            let volume = this.player.volume();
            console.debug('volume change: ', volume);
            expect(volume).toEqual(volume);
            done();
          });
          this.player.volume(volume);
        });
        this.player.play();
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

            // Check the time at most 5 times every time it's updated
            const MAX_PROGRESS_UPDATES = 10;
            var currentProgressUpdates = 0;
            this.player.on('timeupdate', () => {
              let time = this.player.currentTime();
              if (currentProgressUpdates < MAX_PROGRESS_UPDATES && time <= 0) {
                ++currentProgressUpdates;
              } else {
                expect(time).toBeGreaterThan(0);
                done();
              }
            })
          });
        });

        // Async request
        player.play();
      });
    };
  }

  /**
   * Create a function with a jasmine test that verifies that a poster was retrieved
   *
   * @returns {Function}
   * @private
   */
  _generatePosterTest() {
    return function (done) {
      const doCheck = () => {
        expect(this.player.poster()).toBeDefined("");
        expect(this.player.poster()).not.toEqual("");
        done();
      }
      this.player.on('posterchange', () => {
        if (this.player.poster() !== '') {
          doCheck()
        } else {
          this.player.one('posterchange', () => {
            doCheck()
          })
        }
      })
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
        expect(iframe).toBeDefined();
        iframeSourceTest(iframe.src, this.source);
        done();
      });
    };
  }

  _generateExtraTests() {
    this.extraTestGenerators.forEach((generator) => generator.apply(this));
  }
}

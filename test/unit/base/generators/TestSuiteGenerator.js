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
    it('should create widget player', this.basicConfiguration.widgetObjectTest);
    it('should play the song', this.basicConfiguration.playTest);
    it('should seek to 30 seconds', this.basicConfiguration.seekTo30Test);
    it('should half the volume', this.basicConfiguration.changeVolumeTest);

    it('should change object sources', this.basicConfiguration.changeSourceTest(this.secondSourceObject));
    it('should change string sources', this.basicConfiguration.changeSourceTest(this.secondSourceObject.src));
  }


  _generateExtraTests() {
    this.extraTestGenerators.forEach((generator) => generator());
  }
}

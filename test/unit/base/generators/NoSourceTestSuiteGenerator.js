import TestSuiteGenerator from './TestSuiteGenerator';

export default class NoSourceTestSuiteGenerator extends TestSuiteGenerator {
  htmlResourcePath;

  constructor(basicConfiguration,
              firstSourceObject,
              secondSourceObject,
              htmlResourcePath,
              extraTestGenerators) {
    super(basicConfiguration, firstSourceObject, secondSourceObject, extraTestGenerators);
    this.description = 'created with no source';
    this.htmlResourcePath = htmlResourcePath;
  }

  _generateTests() {
    var self = this;

    beforeEach(function () {
      this.source = null;
      this.vFromScript = window.__html__[self.htmlResourcePath];
      document.body.innerHTML = this.vFromScript;
      expect(document.getElementById(this.videoTagId)).not.toBeNull();
      this.player = videojs(this.videoTagId, {
        'techOrder': [self.techNameForVjs]
      });
    });
  }

  /**
   * Not all common tests can be used (e.g playing the source or halving the volume)
   * @private
   */
  _generateCommonTests() {
    it('should create widget player', this._generateWidgetPlayerTest());
    it('should change object sources', this._generateChangeSourceTest(this.secondSourceObject));
    it('should change string sources', this._generateChangeSourceTest(this.secondSourceObject.src));
  }
}

import TestSuiteGenerator from './TestSuiteGenerator'

export default class ObjectSourceTestSuiteGenerator extends TestSuiteGenerator {
  htmlResourcePath;

  constructor(basicConfiguration,
              firstSourceObject,
              secondSourceObject,
              htmlResourcePath,
              extraTestGenerators) {
    super(basicConfiguration, firstSourceObject, secondSourceObject, extraTestGenerators);
    this.description = 'created with javascript object source'
    this.htmlResourcePath = htmlResourcePath;
  }

  _generateTests() {
    // Necessary for use with jasmine as `this` is kinda reserved for jasmine
    // binding `this` to something else will most likely break tests
    var self = this;
    beforeEach(function () {
      this.source = self.firstSourceObject;
      this.vFromScript = window.__html__[self.htmlResourcePath];
      document.body.innerHTML = this.vFromScript;
      expect(document.getElementById(this.videoTagId)).not.toBeNull();
      this.player = videojs(this.videoTagId, {
        'techOrder': [self.techNameForVjs],
        'sources': [this.source]
      });
    });
  }
}

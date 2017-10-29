import TestSuiteGenerator from './TestSuiteGenerator';

export default class StringSourceTestSuiteGenerator extends TestSuiteGenerator {
  htmlResourcePath;

  constructor(basicConfiguration,
              firstSourceObject,
              secondSourceObject,
              htmlResourcePath,
              extraTestGenerators) {
    super(basicConfiguration, firstSourceObject, secondSourceObject, extraTestGenerators);
    this.description = 'created with javascript string source';
    this.htmlResourcePath = htmlResourcePath;
  }

  _generateTests() {
    var self = this;

    beforeEach(function () {
      this.source = self.firstSourceObject;
      this.vFromScript = window.__html__[self.htmlResourcePath];
      document.body.innerHTML = this.vFromScript;
      expect(document.getElementById(this.videoTagId)).not.toBeNull();
      let options = Object.assign({
        'sources': [this.source.src]
      }, self.playerOptions);
      this.player = videojs(this.videoTagId, options);
    });
  }
}

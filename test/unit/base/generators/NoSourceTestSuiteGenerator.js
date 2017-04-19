import TestSuiteGenerator from './TestSuiteGenerator'

export default class NoSourceTestSuiteGenerator extends TestSuiteGenerator {
  htmlResourcePath;

  constructor(basicConfiguration,
              firstSourceObject,
              secondSourceObject,
              htmlResourcePath,
              extraTestGenerators) {
    super(basicConfiguration, firstSourceObject, secondSourceObject, extraTestGenerators);
    this.description = 'created with no source'
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

    var apiSource = {
      src: 'https://api.soundcloud.com/tracks/216846955&amp;auto_play=false&amp;hide_related=false&amp;' +
      'show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true',
      type: 'audio/soundcloud'
    };
    it('should take api object sources', this.basicConfiguration.changeSourceTest(apiSource));
    it('should take api string sources', this.basicConfiguration.changeSourceTest(apiSource.src));
  }

  /**
   * Not all common tests can be used (e.g playing the source or halving the volume)
   * @private
   */
  _generateCommonTests() {
    it('should create widget player', this.basicConfiguration.widgetObjectTest);
    it('should change object sources', this.basicConfiguration.changeSourceTest(this.secondSourceObject));
    it('should change string sources', this.basicConfiguration.changeSourceTest(this.secondSourceObject.src));
  }
}

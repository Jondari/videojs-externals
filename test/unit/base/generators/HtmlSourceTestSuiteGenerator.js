import TestSuiteGenerator from './TestSuiteGenerator';

export default class HtmlSourceTestSuiteGenerator extends TestSuiteGenerator {

  /**
   *
   * @param basicConfiguration {BaseTestConfiguration}
   * @param firstSourceObject {Object}
   * @param secondsSourceObject {Object}
   * @param [extraTestGenerators] {Function[]}
   */
  constructor(basicConfiguration,
              firstSourceObject,
              secondsSourceObject,
              extraTestGenerators) {
    super(basicConfiguration, firstSourceObject, secondsSourceObject, extraTestGenerators);
    this.description = 'created with html video>source';
    this.basicConfiguration = basicConfiguration;
    this.firstSourceObject = firstSourceObject;
    this.secondSourceObject = secondsSourceObject;
  }

  _generateTests() {
    // Necessary for use with jasmine as `this` is kinda reserved for jasmine
    // binding `this` to something else will most likely break tests
    var self = this;

    beforeEach(function () {
      this.source = self.firstSourceObject;
      expect(this.player).toBeUndefined();
      document.body.innerHTML = `
      <video
        id="${this.videoTagId}"
        controls="controls"
        width="100%"
        height="360"
        class="video-js vjs-default-skin"
        data-setup='${JSON.stringify(self.playerOptions)}'
        >
          <source src="${this.source.src}" type="${this.source.type}">
      </video>`;

      // Setup the HTML properties


      expect(document.getElementById(this.videoTagId)).not.toBeNull();
      this.player = videojs(this.videoTagId);
    });
  }
}

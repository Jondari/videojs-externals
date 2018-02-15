var spyOnAllClassFunctions = function(o) {
  return Object.keys(o.prototype).filter((item) => {
    return o.prototype[item] instanceof Function;
  }).forEach(function(funcName) {
    return spyOn(o.prototype, funcName).and.callThrough();
  });
};

export class MainTestFactory {

  /**
   * @param basicConfiguration {BaseTestConfiguration}
   */
  constructor(basicConfiguration) {
    this.basicConfiguration = basicConfiguration
    this.techName = basicConfiguration.techName
    this.testSuiteFactories = []
  }

  addTestSuiteFactory(testSuiteFactory) {
    this.testSuiteFactories.push(testSuiteFactory)
  }

  generate() {
    var self = this;
    describe(`videojs-externals ${this.techName} tech`, function() {


      beforeEach(function() {
        this.plugin = videojs.getComponent(self.techName);
        this.pluginPrototype = this.plugin.prototype;
        spyOnAllClassFunctions(this.plugin);
        this.videoTagId = 'myStuff';
      });
      afterEach(function(done) {
        setTimeout(() => {
          var player = videojs.players[this.videoTagId];
          if (player) {
            player.dispose();
          }
          expect(document.getElementsByTagName('iframe').length).toEqual(0);
          expect(videojs.players[this.videoTagId]).toBeFalsy();
          return done();
        }, 1);
      });


      self.testSuiteFactories.forEach(function(factory) {
        factory.generate()
      })
    })
  }
}


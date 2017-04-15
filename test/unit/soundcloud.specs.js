/*
 Create a spy for all functions of a given object
 by spying on the object's prototype
 @param o {Object} object to invade
 */

var spyOnAllClassFunctions = function (o) {
  return Object.keys(o.prototype).filter((item) => {
    return o.prototype[item] instanceof Function;
  }).forEach(function (funcName) {
    return spyOn(o.prototype, funcName).and.callThrough();
  });
};

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

var sourceObjectTest = function (done) {
  this.player.ready(() => {
    var iframe = document.getElementsByTagName('iframe')[0];
    expect(iframe).toBeTruthy();
    expect(iframe.src).toMatch(new RegExp('w.soundcloud.com/player/\\?url=' + this.source + '.*'));
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

describe('videojs-soundcloud plugin', function () {

  beforeEach(function () {
    this.plugin = videojs.getComponent('Soundcloud');
    this.pluginPrototype = this.plugin.prototype;
    spyOnAllClassFunctions(this.plugin);
    this.videoTagId = 'myStuff';
    this.source = 'https://soundcloud.com/vaughan-1-1/this-is-what-crazy-looks-like';
  });
  afterEach(function (done) {
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


  describe('created with html video>source', function () {
    beforeEach(function () {
      console.debug('before each', this.player);
      expect(this.player).toBeUndefined();
      this.vFromTag = window.__html__['test/resources/videojs_from_tag.html'];
      document.body.innerHTML = this.vFromTag;
      expect(document.getElementById(this.videoTagId)).not.toBeNull();
      this.player = videojs(this.videoTagId);
    });

    it('should create soundcloud iframe', sourceObjectTest);
    it('should play the song', playTest);
    it('should half the volume', changeVolumeTest);

    /* To use with @see changeSourceTest */
    var secondSource = {
      src: 'https://soundcloud.com/user504272/teki-latex-dinosaurs-with-guns-cyberoptix-remix',
      type: 'audio/soundcloud'
    };
    it('should change object sources', changeSourceTest(secondSource));
    it('should change string sources', changeSourceTest(secondSource.src));
  });


  describe('created with javascript string source', function () {

    beforeEach(function () {
      console.debug('beforeEach with video and source tag');
      this.source = 'https://soundcloud.com/hipster-online/04-sweet-home-alabama';
      this.vFromScript = window.__html__['test/resources/videojs_from_script.html'];
      document.body.innerHTML = this.vFromScript;
      expect(document.getElementById(this.videoTagId)).not.toBeNull();
      this.player = videojs(this.videoTagId, {
        'techOrder': ['Soundcloud'],
        'sources': [this.source]
      });
    });

    it('should create soundcloud iframe', function (done) {
      this.player.ready(() => {
        var iframe;
        iframe = document.getElementsByTagName('iframe')[0];
        expect(iframe).toBeTruthy();
        expect(iframe.src).toMatch(new RegExp('w.soundcloud.com/player/\\?url=' + this.source + '.*'));
        done();
      });
    });


    it('should play the song', playTest);
    it('should seek to 30 seconds', seekTo30Test);
    it('should half the volume', changeVolumeTest);

    /* To use with @see changeSourceTest */
    var secondSource = {
      src: 'https://soundcloud.com/nordemusic/missing-you-ft-lucas-nord',
      type: 'audio/soundcloud'
    };
    it('should change object sources', changeSourceTest(secondSource));
    it('should change string sources', changeSourceTest(secondSource.src));
  });


  describe('created with javascript object source', function () {
    beforeEach(function () {
      console.debug('beforeEach with video and source tag');
      this.source = 'https://soundcloud.com/oshi/kali-uchi';
      this.vFromScript = window.__html__['test/resources/videojs_from_script.html'];
      document.body.innerHTML = this.vFromScript;
      expect(document.getElementById(this.videoTagId)).not.toBeNull();
      this.player = videojs(this.videoTagId, {
        'techOrder': ['soundcloud'],
        'sources': [
          {
            src: this.source,
            type: 'audio/soundcloud'
          }
        ]
      });
    });

    it('should create soundcloud iframe', sourceObjectTest);
    it('should play the song', playTest);
    it('should seek to 30 seconds', seekTo30Test);
    it('should half the volume', changeVolumeTest);

    /* To use with @see changeSourceTest */
    var secondSource = {
      src: 'https://soundcloud.com/apexrise/or-nah',
      type: 'audio/soundcloud'
    };
    it('should change sources', changeSourceTest(secondSource));
  });


  describe('created with no source', function () {
    beforeEach(function () {
      console.debug('beforeEach with no source tag');
      this.source = 'https://soundcloud.com/monstercat/pegboard-nerds-self-destruct';
      this.vFromScript = window.__html__['test/resources/videojs_from_script.html'];
      document.body.innerHTML = this.vFromScript;
      expect(document.getElementById(this.videoTagId)).not.toBeNull();
      this.player = videojs(this.videoTagId, {
        'techOrder': ['soundcloud']
      });
    });

    /* To use with @see changeSourceTest */
    var secondSource = {
      src: 'https://soundcloud.com/pegboardnerds/pegboard-nerds-here-it-comes',
      type: 'audio/soundcloud'
    };
    var apiSource = {
      src: 'https://api.soundcloud.com/tracks/216846955&amp;auto_play=false&amp;hide_related=false&amp;' +
      'show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true',
      type: 'audio/soundcloud'
    };
    it('should change object sources', changeSourceTest(secondSource));
    it('should change string sources', changeSourceTest(secondSource.src));
    it('should take api object sources', changeSourceTest(apiSource));
    it('should take api string sources', changeSourceTest(apiSource.src));
  });
});


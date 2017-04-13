/*
 Create a spy for all functions of a given object
 by spying on the object's prototype
 @param o {Object} object to invade
 */

var spyOnAllClassFunctions = function (o) {
  return Object.keys(o.prototype).filter((item)=>{
    return o.prototype[item] instanceof Function
  }).forEach(function (funcName) {
    return spyOn(o.prototype, funcName).and.callThrough();
  });
};

videojs = window.videojs;

describe("videojs-soundcloud plugin", function () {
  var sourceObjectTest = function (done) {
    return this.player.ready((function (_this) {
      return function () {
        var iframe;
        iframe = document.getElementsByTagName("iframe")[0];
        expect(iframe).toBeTruthy();
        expect(iframe.src).toMatch(RegExp("w.soundcloud.com/player/\\?url=" + _this.source + ".*"));
        return done();
      };
    })(this));
  };
  var playTest = function (done) {
    return this.player.ready((function (_this) {
      return function () {
        _this.player.on("play", function () {
          expect(_this.player.paused()).toBeFalsy();
          return _this.player.one("playing", function () {
            return setTimeout(function () {
              expect(_this.player.currentTime()).toBeGreaterThan(0);
              return done();
            }, 1000);
          });
        });
        return _this.player.play();
      };
    })(this));
  };
  var seekTo30Test = function (done) {
    return this.player.ready((function (_this) {
      return function () {
        var seconds;
        seconds = 30;
        _this.player.on("play", function () {
          _this.player.pause();
          return _this.player.currentTime(seconds);
        });
        _this.player.on("seeked", function () {
          expect(Math.round(_this.player.currentTime())).toEqual(seconds);
          return done();
        });
        return _this.player.play();
      };
    })(this));
  };
  var changeVolumeTest = function (done) {
    return this.player.ready((function (_this) {
      return function () {
        var volume;
        volume = 0.5;
        _this.player.on("volumechange", function () {
          expect(_this.player.volume()).toEqual(volume);
          return done();
        });
        return _this.player.volume(volume);
      };
    })(this));
  };

  /*
   Try changing the source with a string
   It should trigger the "newSource" event

   The input is the same as vjs.Player.src (that's what's called)
   Which calls @see Soundcloud::src

   @param newSource [Object] { type: <String>, src: <String>}
   @param newSource [String] The URL
   @return [Function] To pass to karma for testing a source change
   */
  var changeSourceTest = function (newSource) {
    var newSourceString;
    newSourceString = "object" === typeof newSource ? newSource.src : newSource;
    return function (done) {
      this.player.one("canplay", () => {
        this.player.one("waiting", ()=> {
          console.debug("changed source for to", newSource);
          expect(this.player.src()).toEqual(newSourceString);
          return done();
        });
        console.debug("changing source to ", newSource);
        return this.player.src(newSource);
      })
    }
  }
  beforeEach(function () {
    console.debug("master beforeEach");
    this.plugin = videojs.getComponent("Soundcloud");
    this.pluginPrototype = this.plugin.prototype;
    spyOnAllClassFunctions(this.plugin);
    this.videoTagId = "myStuff";
    return this.source = "https://soundcloud.com/vaughan-1-1/this-is-what-crazy-looks-like";
  });
  afterEach(function (done) {
    return setTimeout((function (_this) {
      return function () {
        var player;
        console.debug("master afterEach");
        player = videojs.players[_this.videoTagId];
        if (player) {
          player.dispose();
        }
        expect(document.getElementsByTagName("iframe").length).toEqual(0);
        expect(videojs.players[_this.videoTagId]).toBeFalsy();
        return done();
      };
    })(this), 1);
  });
  describe("created with html video>source", function () {
    var secondSource;
    beforeEach(function () {
      console.debug("before each", this.player);
      expect(this.player).toBeUndefined();
      this.vFromTag = window.__html__['test/ressources/videojs_from_tag.html'];
      document.body.innerHTML = this.vFromTag;
      expect(document.getElementById(this.videoTagId)).not.toBeNull();
      return this.player = videojs(this.videoTagId);
    });
    xit("should call init", function (done) {
      return this.player.ready((function (_this) {
        return function () {
          expect(_this.pluginPrototype.init).toHaveBeenCalled();
          return done();
        };
      })(this));
    });
    it("should create soundcloud iframe", sourceObjectTest);
    it("should play the song", playTest);
    it("should half the volume", changeVolumeTest);

    /* To use with @see changeSourceTest */
    secondSource = {
      src: "https://soundcloud.com/user504272/teki-latex-dinosaurs-with-guns-cyberoptix-remix",
      type: "audio/soundcloud"
    };
    it("should change object sources", changeSourceTest(secondSource));
    return it("should change string sources", changeSourceTest(secondSource.src));
  });
  describe("created with javascript string source", function () {
    var secondSource;
    beforeEach(function () {
      console.debug("beforeEach with video and source tag");
      this.source = "https://soundcloud.com/hipster-online/04-sweet-home-alabama";
      this.vFromScript = window.__html__['test/ressources/videojs_from_script.html'];
      document.body.innerHTML = this.vFromScript;
      expect(document.getElementById(this.videoTagId)).not.toBeNull();
      return this.player = videojs(this.videoTagId, {
        "techOrder": ["Soundcloud"],
        "sources": [this.source]
      });
    });
    it("should create soundcloud iframe", function (done) {
      return this.player.ready((function (_this) {
        return function () {
          var iframe;
          iframe = document.getElementsByTagName("iframe")[0];
          expect(iframe).toBeTruthy();
          expect(iframe.src).toMatch(RegExp("w.soundcloud.com/player/\\?url=" + _this.source + "$"));
          return done();
        };
      })(this));
    });
    it("should play the song", playTest);
    it("should seek to 30 seconds", seekTo30Test);
    it("should half the volume", changeVolumeTest);

    /* To use with @see changeSourceTest */
    secondSource = {
      src: "https://soundcloud.com/nordemusic/missing-you-ft-lucas-nord",
      type: "audio/soundcloud"
    };
    it("should change object sources", changeSourceTest(secondSource));
    return it("should change string sources", changeSourceTest(secondSource.src));
  });
  describe("created with javascript object source", function () {
    var secondSource;
    beforeEach(function () {
      console.debug("beforeEach with video and source tag");
      this.source = "https://soundcloud.com/oshi/kali-uchi";
      this.vFromScript = window.__html__['test/ressources/videojs_from_script.html'];
      document.body.innerHTML = this.vFromScript;
      expect(document.getElementById(this.videoTagId)).not.toBeNull();
      return this.player = videojs(this.videoTagId, {
        "techOrder": ["soundcloud"],
        "sources": [
          {
            src: this.source,
            type: "audio/soundcloud"
          }
        ]
      });
    });
    it("should create soundcloud iframe", sourceObjectTest);
    it("should play the song", playTest);
    it("should seek to 30 seconds", seekTo30Test);
    it("should half the volume", changeVolumeTest);

    /* To use with @see changeSourceTest */
    secondSource = {
      src: "https://soundcloud.com/apexrise/or-nah",
      type: "audio/soundcloud"
    };
    return it("should change sources", changeSourceTest(secondSource));
  });
  return describe("created with no source", function () {
    var apiSource, secondSource;
    beforeEach(function () {
      console.debug("beforeEach with no source tag");
      this.source = "https://soundcloud.com/monstercat/pegboard-nerds-self-destruct";
      this.vFromScript = window.__html__['test/ressources/videojs_from_script.html'];
      document.body.innerHTML = this.vFromScript;
      expect(document.getElementById(this.videoTagId)).not.toBeNull();
      return this.player = videojs(this.videoTagId, {
        "techOrder": ["soundcloud"]
      });
    });

    /* To use with @see changeSourceTest */
    secondSource = {
      src: "https://soundcloud.com/pegboardnerds/pegboard-nerds-here-it-comes",
      type: "audio/soundcloud"
    };
    apiSource = {
      src: "https://api.soundcloud.com/tracks/216846955&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true",
      type: "audio/soundcloud"
    };
    it("should change object sources", changeSourceTest(secondSource));
    it("should change string sources", changeSourceTest(secondSource.src));
    it("should take api object sources", changeSourceTest(apiSource));
    it("should take api string sources", changeSourceTest(apiSource.src));
  });
});


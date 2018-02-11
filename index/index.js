const CONTAINER_ID = "video-container"
const PLAYER_ID = "player"
const PLAYER_WIDTH = 250;
const TECHS = [
  'dailymotion'
  , 'deezer'
  , 'jamendo'
  , 'mixcloud'
  , 'soundcloud'
  , 'spotify'
  , 'vimeo'
  , 'youtube'
  , 'html5'
];

function urlToVjsSource(url) {
  let urlO;
  try {
    urlO = new URL(url);
  } catch (e) {
    return false
  }
  const tech = TECHS.find((tech) => urlO.hostname.includes(tech));
  if (!TECHS.includes(tech)) {
    return false
  }

  return {
    tech: `${tech[0].toUpperCase()}${tech.substr(1)}`,
    src: url,
    type: url
  }
}

function getPlayConfig() {
  return {
    controls: true,
    autoplay: 0,
    width: PLAYER_WIDTH,
    techOrder: TECHS
  }
}

/**
 * Used to determine how we will be switching the source
 */
class SourceSwitcher {

  /**
   * Helper to get rid of the existing player, if it exists
   *
   * @return {Promise}
   *    fulfilled once the player is disposed and the element destroyed
   */
  removePlayer() {
    return new Promise((resolve, reject) => {
      if (document.getElementById(PLAYER_ID)) {
        videojs("player").on("dispose", () => {
          setTimeout(() => {
            resolve()
          }, 10)

        }).dispose()
      } else {
        resolve()
      }

    }).then(function () {
      var videoContainer = document.getElementById(CONTAINER_ID)
      Array.prototype.forEach.call(videoContainer.children, videoContainer.removeChild);
    })

  }

  /**
   * Doesn't recreate a player and simply tells videojs to switch to it
   *
   * @param {Object} source
   *      A videojs source object with src and type
   */
  dynamically(source) {
    if (document.getElementById(PLAYER_ID)) {
      return new Promise((accept) => {
        videojs("player").src(source)
        accept(videojs("player"))
      })
    } else {
      return this.recreateJavascript(source)
    }
  }

  /**
   * Recreates the videojs player and passed the source to the constructor
   *
   * @param source {Object}
   *      A videojs source object with src and type
   */
  recreateJavascript(source) {
    return new Promise((accept) => {
      this.removePlayer().then(function () {
        var container = document.getElementById(CONTAINER_ID);
        var video = document.createElement('video');
        video.id = 'player'
        video.width = `${PLAYER_WIDTH}px`;
        video.className = 'video-js vjs-fluid vjs-default-skin'
        video.crossOrigin = true
        video.setAttribute('crossorigin', true)
        container.appendChild(video)
        var playerConfig = getPlayConfig()
        playerConfig.sources = [source]
        accept(videojs('player', playerConfig))
      })
    })
  }

  /**
   * Destroys the existing player and recreates it.
   * The source is created as a DOM element (<source>)
   *
   * @param source {Object}
   *      A videojs source object with src and type
   */
  recreateWithTag(source) {
    return new Promise((accept) => {
      this.removePlayer().then(function () {
        var container = document.getElementById(CONTAINER_ID);
        var video = document.createElement('video');
        video.id = 'player'
        video.width = `${PLAYER_WIDTH}px`;
        video.className = 'video-js vjs-fluid vjs-default-skin'
        video.crossOrigin = true
        video.setAttribute('crossorigin', true)
        var sourceTag = document.createElement("source")
        sourceTag.src = source.src
        sourceTag.type = source.type
        video.appendChild(sourceTag)

        container.appendChild(video)
        accept(videojs('player', getPlayConfig()))
      })
    })
  }

}

function DemoController($scope) {
  let idCounter = 0;
  let player = null;
  $scope.autoplay = true;

  $scope.inputSource = '';

  $scope.sources = [
    "http://www.dailymotion.com/video/x56imdz_une-pluie-d-hommages-pour-le-chanteur-george-michael-sur-les-reseaux-sociaux_news",
    // "http://www.deezer.com/track/1167893", // needs flash >_>
    "https://www.jamendo.com/track/1466090/universal-funk",
    "https://www.mixcloud.com/johndigweed/transitions-with-john-digweed-and-dj-vibe/",
    "https://soundcloud.com/yozzie-b/rhiana-where-have-u-been-ukg",
    "https://vimeo.com/210321457",
    "https://www.youtube.com/watch?v=DIDp05SHJVk",
  ].map((source) => {
    return {source, id: source}
  })

  $scope.creationTypes = {
    "recreateJavascript": "recreate player with javascript source",
    "recreateWithTag": "recreate player with audio/video tag",
    // "dynamically": "Dynamic source change",
  }

  $scope.selected = {
    creationType: Object.keys($scope.creationTypes)[0],
    source: $scope.sources[0],

  }


  $scope.getIndex = function (aSource) {
    aSource = aSource || $scope.selected.source
    return $scope.sources.findIndex((source) => {
      return source.id === aSource.id
    })
  }

  $scope.moveToNext = function () {
    // Empty list means we don't do squat
    if ($scope.sources.length < 1) {
      return
    }
    let currentIndex = $scope.getIndex();
    const nextIndex = (currentIndex + 1) % $scope.sources.length;
    $scope.selected.source = $scope.sources[nextIndex];
    return {oldIndex: currentIndex, currentIndex: nextIndex}
  }

  $scope.playNext = function () {
    if ($scope.moveToNext()) {
      $scope.play();
    }
  }

  $scope.play = function () {
    if (!$scope.selected.source) {
      return
    }

    new SourceSwitcher()[$scope.selected.creationType](
      urlToVjsSource($scope.selected.source.source)
    ).then((aPlayer) => {
      player = aPlayer;
      aPlayer.ready(function () {
        this.play();
        if ($scope.autoplay) {
          aPlayer.on('ended', () => {
            $scope.$apply($scope.playNext)
          })
        }
      })
    })
  }

  $scope.playSource = function (source) {
    $scope.selected.source = source;
    $scope.play();
  }

  /**
   * Gets one URL per line of textarea input and adds it to the playlist
   */
  $scope.addToPlaylist = function () {
    $scope.inputSource.split("\n").forEach((line) => {
      const words = line.trim().split(" ");
      let url = words.find(word => word.startsWith("http"));
      if (!url) {
        return
      }
      url = url.trim();
      if (!urlToVjsSource(url)) {
        return
      }

      const newActive = $scope.sources.length === 0;
      $scope.sources.push({source: url, id: url + idCounter++});
      if (newActive) {
        $scope.selected.source = $scope.sources[0]
      }
    })
    $scope.inputSource = '';
  }

  $scope.removeFromPlaylist = function (source) {
    const oldIndex = $scope.getIndex(source);

    $scope.sources.splice(oldIndex, 1);

    // Not an active item, so forget you
    if ($scope.selected.source !== source) {
      return
    }

    // Move to the next item... or not
    if ($scope.sources.length === 0) {
      $scope.selected.source = null;
      player.dispose();
      player = null;
    } else {
      $scope.selected.source = $scope.sources[oldIndex];
      if ($scope.autoplay) {
        $scope.play()
      } else if (player) {
        player.dispose();
        player = null;
      }
    }
  }

  /**
   * Class for a playlist item
   * @param item
   * @param even
   * @returns {string}
   */
  $scope.getItemClass = function (item, even) {
    let _class;
    if ($scope.selected.source.id === item.id) {
      _class = 'primary';
    } else if (even) {
      _class = 'default';
    } else {
      _class = 'info';
    }

    return "bg-" + _class
  }
}

angular.module("demoApp", ["ui.bootstrap"])
  .controller("DemoController", DemoController);



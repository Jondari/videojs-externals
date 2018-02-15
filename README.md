# External Player Playback Technology<br />for [Video.js](https://github.com/videojs/video.js)

[![Build Status](https://travis-ci.org/LoveIsGrief/videojs-externals.svg)](https://travis-ci.org/LoveIsGrief/videojs-externals)

![Alt text](https://cloud.githubusercontent.com/assets/3854951/19686244/92827b54-9ac0-11e6-8b6c-95f361cd2f3a.png "Soundcloud sample")
## Supports

- [ ] ~~Bandcamp~~ No API :(
- [x] Dailymotion
- [x] Deezer
- [x] Jamendo
- [x] Mixcloud
- [x] Soundcloud
- [x] Spotify (simple embed)
- [x] Vimeo
- [x] Youtube
- [ ] Twitch

## Install

At the moment it is not available with bower or npm yet.
One can download dist/videojs-externals.min.js or point to it using the [RawGit CDN](https://rawgit.com/) 

## Example
```html
<!DOCTYPE html>
<html>
<head>
  <link type="text/css" rel="stylesheet" href="../node_modules/video.js/dist/video-js.min.css" />
</head>
<body>
  <video
    id="vid1"
    class="video-js vjs-default-skin"
    controls
    autoplay
    width="640" height="264"
    data-setup='{ "techOrder": ["soundcloud"], "sources": [{ "type": "video/soundcloud", "src": "https://soundcloud.com/yozzie-b/rhiana-where-have-u-been-ukg"}] }'
  >
  </video>

  <script src="../node_modules/video.js/dist/video.min.js"></script>
  <script src="../dist/videojs-externals.min.js"></script>
</body>
</html>
```

See the examples folder for more

# Development

## Requirements

 - [Node.js](https://nodejs.org/en/) (tested with v8) (install using [nvm](https://github.com/creationix/nvm) is recommendable)
 - [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/lang/en/docs/install/)
 
## Setup

```bash
# Install deps
npm install # or yarn install

# Grunt is needed for running tasks
npm install -g grunt-cli
```

## Testing

Is done with [karma testrunner](https://karma-runner.github.io/2.0/index.html)
which is in turn run by grunt.  
Check out the tasks in [grunt/](grunt/) for the available tasks.

The tests are in the [test/](test/) folder. 
[Generators](test/unit/base/) were used to produce the same test-suites for each tech.

`grunt test` will test all techs in Chromium and Firefox.

### Selecting browsers

Use `grunt karma:detected` to run tests in all browsers that can be detected on your computer.

You can set the environment variable **BROWSERS** to a `:` separated list of browsers e.g 
`export BROWSERS=Chromium:Chrome:Firefox:MyFirefoxHeadless`

### Including or excluding specs

The environment variables **SPECS** and **EX_SPECS** allow targeting techs to test. 
As with **BROWSERS** provide a `:` separated list of techs e.g `export SPECS=jamendo:soundcloud:youtube`

### Continuous testing

`grunt karma:watch` will take care of opening a browser with the tests and running them every time 
 you make a change to the the watched files (sources and specs).

Of course the enviroment variables mentioned above have an effect on this too...

##Special Thank You
Thanks to Steve Heffernan for the amazing Video.js and to John Hurliman for the original version of the YouTube tech

## License
The MIT License (MIT)

Copyright (c) 2016 Benjipott <pott.benjamin@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

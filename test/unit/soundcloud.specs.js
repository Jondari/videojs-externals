import {MainTestFactory} from './base/base';
import BaseTestConfiguration from './base/BaseTestConfiguration';
import HtmlSourceTestSuiteGenerator from './base/generators/HtmlSourceTestSuiteGenerator';
import NoSourceTestSuiteGenerator from './base/generators/NoSourceTestSuiteGenerator';
import ObjectSourceTestSuiteGenerator from './base/generators/ObjectSourceTestSuiteGenerator';
import StringSourceTestSuiteGenerator from './base/generators/StringSourceTestSuiteGenerator';

var getSourceString = videojs.getComponent('Externals').sourceToString;

function iframeSourceTester(uri, source) {
  source = getSourceString(source) || null;
  expect(uri).toMatch(new RegExp(`w.soundcloud.com/player/\\?url=${source}.*`));
}

const MIME_TYPE = 'audio/soundcloud';
const basicConfiguration = new BaseTestConfiguration(
  'Soundcloud',
  iframeSourceTester
);

var apiSource = {
  src: 'https://api.soundcloud.com/tracks/216846955&amp;auto_play=false&amp;hide_related=false&amp;' +
  'show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true',
  type: 'audio/soundcloud'
};
var extraTests = [
  function() {
    it('should take api object sources', this._generateChangeSourceTest(apiSource));
  },
  function() {
    it('should take api string sources', this._generateChangeSourceTest(apiSource.src));
  }
];

const htmlSourceTestSuiteGenerator = new HtmlSourceTestSuiteGenerator(
  basicConfiguration,
  {src: 'https://soundcloud.com/vaughan-1-1/this-is-what-crazy-looks-like', type: MIME_TYPE},
  {src: 'https://soundcloud.com/user504272/teki-latex-dinosaurs-with-guns-cyberoptix-remix', type: MIME_TYPE},
  extraTests
);
const noSourceTestSuiteGenerator = new NoSourceTestSuiteGenerator(
  basicConfiguration,
  null,
  {src: 'https://soundcloud.com/pegboardnerds/pegboard-nerds-here-it-comes', type: MIME_TYPE},
  'test/resources/videojs_from_script.html',
  extraTests
);
const objectSourceTestSuiteGenerator = new ObjectSourceTestSuiteGenerator(
  basicConfiguration,
  {src: 'https://soundcloud.com/oshi/kali-uchi', type: MIME_TYPE},
  {src: 'https://soundcloud.com/apexrise/or-nah', type: MIME_TYPE},
  'test/resources/videojs_from_script.html',
  extraTests
);
const stringSourceTestSuiteGenerator = new StringSourceTestSuiteGenerator(
  basicConfiguration,
  {src: 'https://soundcloud.com/hipster-online/04-sweet-home-alabama', type: MIME_TYPE},
  {src: 'https://soundcloud.com/nordemusic/missing-you-ft-lucas-nord', type: MIME_TYPE},
  'test/resources/videojs_from_script.html',
  extraTests
);


var testFactory = new MainTestFactory(basicConfiguration);

testFactory.addTestSuiteFactory(htmlSourceTestSuiteGenerator);
testFactory.addTestSuiteFactory(noSourceTestSuiteGenerator);
testFactory.addTestSuiteFactory(objectSourceTestSuiteGenerator);
testFactory.addTestSuiteFactory(stringSourceTestSuiteGenerator);

testFactory.generate();


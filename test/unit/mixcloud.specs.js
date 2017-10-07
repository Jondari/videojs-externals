import {MainTestFactory} from './base/base';
import BaseTestConfiguration from './base/BaseTestConfiguration';
import HtmlSourceTestSuiteGenerator from './base/generators/HtmlSourceTestSuiteGenerator';
import NoSourceTestSuiteGenerator from './base/generators/NoSourceTestSuiteGenerator';
import ObjectSourceTestSuiteGenerator from './base/generators/ObjectSourceTestSuiteGenerator';
import StringSourceTestSuiteGenerator from './base/generators/StringSourceTestSuiteGenerator';

var getSourceString = videojs.getComponent('Externals').sourceToString;

function iframeSourceTester(uri, source) {
  source = getSourceString(source) || null;
  if(source){
    source = encodeURIComponent(new URL(source).pathname) || null
  }
  expect(uri).toMatch(new RegExp(`mixcloud.com/widget/iframe/\\?feed=${source}`));
}

const MIME_TYPE = 'audio/mixcloud';
const basicConfiguration = new BaseTestConfiguration(
  'Mixcloud',
  iframeSourceTester
);

const htmlSourceTestSuiteGenerator = new HtmlSourceTestSuiteGenerator(
  basicConfiguration,
  {
    src: 'https://www.mixcloud.com/betobarreiro/rise-up-with-beto-barreiro-episode-009/',
    type: MIME_TYPE
  },
  {
    src: 'https://www.mixcloud.com/PioneerDJRadio/carl-cox-recorded-live-at-burning-man-playground-stage/',
    type: MIME_TYPE
  }
);

const noSourceTestSuiteGenerator = new NoSourceTestSuiteGenerator(
  basicConfiguration,
  null,
  {src: 'https://www.mixcloud.com/ThisIsHomeAlone/week-35-the-real/', type: MIME_TYPE},
  'test/resources/videojs_from_script.html'
);
const objectSourceTestSuiteGenerator = new ObjectSourceTestSuiteGenerator(
  basicConfiguration,
  {src: 'https://soundcloud.com/oshi/kali-uchi', type: MIME_TYPE},
  {src: 'https://soundcloud.com/apexrise/or-nah', type: MIME_TYPE},
  'test/resources/videojs_from_script.html'
);
const stringSourceTestSuiteGenerator = new StringSourceTestSuiteGenerator(
  basicConfiguration,
  {src: 'https://soundcloud.com/hipster-online/04-sweet-home-alabama', type: MIME_TYPE},
  {src: 'https://soundcloud.com/nordemusic/missing-you-ft-lucas-nord', type: MIME_TYPE},
  'test/resources/videojs_from_script.html'
);


var testFactory = new MainTestFactory(basicConfiguration);

testFactory.addTestSuiteFactory(htmlSourceTestSuiteGenerator);
testFactory.addTestSuiteFactory(noSourceTestSuiteGenerator);
// testFactory.addTestSuiteFactory(objectSourceTestSuiteGenerator);
// testFactory.addTestSuiteFactory(stringSourceTestSuiteGenerator);

testFactory.generate();


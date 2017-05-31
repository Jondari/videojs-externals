import {MainTestFactory} from './base/base';
import BaseTestConfiguration from './base/BaseTestConfiguration';
import HtmlSourceTestSuiteGenerator from './base/generators/HtmlSourceTestSuiteGenerator';
import NoSourceTestSuiteGenerator from './base/generators/NoSourceTestSuiteGenerator';
import ObjectSourceTestSuiteGenerator from './base/generators/ObjectSourceTestSuiteGenerator';
import StringSourceTestSuiteGenerator from './base/generators/StringSourceTestSuiteGenerator';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

var getSourceString = videojs.getComponent('Externals').sourceToString;

function getVimeoVideoId(source) {
  return videojs.getComponent('Vimeo').prototype.parseSrc(getSourceString(source));
}

function iframeSourceTester(uri, source) {
  var sourceId = getVimeoVideoId(source);
  expect(uri).toMatch(new RegExp(`^https?://(www\.|player\.)?vimeo\.com/?.*/${sourceId}`));
}

const MIME_TYPE = 'video/vimeo';
const basicConfiguration = new BaseTestConfiguration(
  'Vimeo',
  iframeSourceTester
);

const htmlSourceTestSuiteGenerator = new HtmlSourceTestSuiteGenerator(
  basicConfiguration,
  {
    src: 'https://vimeo.com/219216194',
    type: MIME_TYPE
  },
  {
    src: 'https://vimeo.com/48988',
    type: MIME_TYPE
  }
);
const noSourceTestSuiteGenerator = new NoSourceTestSuiteGenerator(
  basicConfiguration,
  null,
  {src: 'https://vimeo.com/132793529', type: MIME_TYPE},
  'test/resources/videojs_from_script.html'
);
const objectSourceTestSuiteGenerator = new ObjectSourceTestSuiteGenerator(
  basicConfiguration,
  {
    src: 'https://vimeo.com/33546842',
    type: MIME_TYPE
  },
  {
    src: 'https://vimeo.com/46960140',
    type: MIME_TYPE
  },
  'test/resources/videojs_from_script.html'
);
const stringSourceTestSuiteGenerator = new StringSourceTestSuiteGenerator(
  basicConfiguration,
  {src: 'https://vimeo.com/37290245', type: MIME_TYPE},
  {src: 'https://vimeo.com/30196331', type: MIME_TYPE},
  'test/resources/videojs_from_script.html'
);


var testFactory = new MainTestFactory(basicConfiguration);

testFactory.addTestSuiteFactory(htmlSourceTestSuiteGenerator);
testFactory.addTestSuiteFactory(noSourceTestSuiteGenerator);
// testFactory.addTestSuiteFactory(objectSourceTestSuiteGenerator);
// testFactory.addTestSuiteFactory(stringSourceTestSuiteGenerator);

testFactory.generate();


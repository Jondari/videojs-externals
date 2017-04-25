import {MainTestFactory} from './base/base';
import BaseTestConfiguration from './base/BaseTestConfiguration';
import HtmlSourceTestSuiteGenerator from './base/generators/HtmlSourceTestSuiteGenerator';
import NoSourceTestSuiteGenerator from './base/generators/NoSourceTestSuiteGenerator';
import ObjectSourceTestSuiteGenerator from './base/generators/ObjectSourceTestSuiteGenerator';
import StringSourceTestSuiteGenerator from './base/generators/StringSourceTestSuiteGenerator';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

var getSourceString = videojs.getComponent('Externals').sourceToString;

function getVideoId(source) {
  return videojs.getComponent('Youtube').prototype.parseSrc(getSourceString(source));
}

function iframeSourceTester(uri, source) {
  var sourceId = getVideoId(source) || '';
  expect(uri).toMatch(new RegExp(`^https?://www.youtube.com/embed/${sourceId}.*`));
}

const MIME_TYPE = 'video/youtube';
const basicConfiguration = new BaseTestConfiguration(
  'Youtube',
  iframeSourceTester
);

const htmlSourceTestSuiteGenerator = new HtmlSourceTestSuiteGenerator(
  basicConfiguration,
  {
    src: 'https://www.youtube.com/watch?v=0sCPWQP7MHs',
    type: MIME_TYPE
  },
  {
    src: 'https://www.youtube.com/watch?v=DIDp05SHJVk',
    type: MIME_TYPE
  }
);
const noSourceTestSuiteGenerator = new NoSourceTestSuiteGenerator(
  basicConfiguration,
  null,
  {src: 'https://www.youtube.com/watch?v=-XTmRu1i9Xw', type: MIME_TYPE},
  'test/resources/videojs_from_script.html'
);
const objectSourceTestSuiteGenerator = new ObjectSourceTestSuiteGenerator(
  basicConfiguration,
  {
    src: 'https://www.youtube.com/watch?v=9LDeWj4DYps',
    type: MIME_TYPE
  },
  {
    src: 'https://www.youtube.com/watch?v=iEV0bgDI3uY',
    type: MIME_TYPE
  },
  'test/resources/videojs_from_script.html'
);
const stringSourceTestSuiteGenerator = new StringSourceTestSuiteGenerator(
  basicConfiguration,
  {src: 'https://www.youtube.com/watch?v=qF-NoQFJrxc', type: MIME_TYPE},
  {src: 'https://www.youtube.com/watch?v=LI_zvy35NlI', type: MIME_TYPE},
  'test/resources/videojs_from_script.html'
);


var testFactory = new MainTestFactory(basicConfiguration);

testFactory.addTestSuiteFactory(htmlSourceTestSuiteGenerator);
testFactory.addTestSuiteFactory(noSourceTestSuiteGenerator);
testFactory.addTestSuiteFactory(objectSourceTestSuiteGenerator);
testFactory.addTestSuiteFactory(stringSourceTestSuiteGenerator);

testFactory.generate();


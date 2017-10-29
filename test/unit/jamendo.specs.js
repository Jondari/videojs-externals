import {MainTestFactory} from './base/base';
import BaseTestConfiguration from './base/BaseTestConfiguration';
import HtmlSourceTestSuiteGenerator from './base/generators/HtmlSourceTestSuiteGenerator';
import NoSourceTestSuiteGenerator from './base/generators/NoSourceTestSuiteGenerator';
import ObjectSourceTestSuiteGenerator from './base/generators/ObjectSourceTestSuiteGenerator';
import StringSourceTestSuiteGenerator from './base/generators/StringSourceTestSuiteGenerator';

const MIME_TYPE = 'audio/jamendo';
const basicConfiguration = new BaseTestConfiguration(
  'Jamendo', null
);

const htmlSourceTestSuiteGenerator = new HtmlSourceTestSuiteGenerator(
  basicConfiguration,
  {
    src: 'https://www.jamendo.com/track/1467384/hip-hop-ft-thelonious',
    type: MIME_TYPE
  },
  {
    src: 'https://www.jamendo.com/track/1466090/universal-funk',
    type: MIME_TYPE
  }
);

const noSourceTestSuiteGenerator = new NoSourceTestSuiteGenerator(
  basicConfiguration,
  null,
  {src: 'https://www.jamendo.com/track/1465419/thunder-god', type: MIME_TYPE},
  'test/resources/videojs_from_script.html'
);
const objectSourceTestSuiteGenerator = new ObjectSourceTestSuiteGenerator(
  basicConfiguration,
  {src: 'https://www.jamendo.com/track/1465314/moments', type: MIME_TYPE},
  {src: 'https://www.jamendo.com/track/1451646/sister', type: MIME_TYPE},
  'test/resources/videojs_from_script.html'
);
const stringSourceTestSuiteGenerator = new StringSourceTestSuiteGenerator(
  basicConfiguration,
  {src: 'https://www.jamendo.com/track/1460209/higher-and-higher', type: MIME_TYPE},
  {src: 'https://www.jamendo.com/track/1465153/dont-leave-the-room', type: MIME_TYPE},
  'test/resources/videojs_from_script.html'
);


var testFactory = new MainTestFactory(basicConfiguration);

testFactory.addTestSuiteFactory(htmlSourceTestSuiteGenerator);
testFactory.addTestSuiteFactory(noSourceTestSuiteGenerator);
testFactory.addTestSuiteFactory(objectSourceTestSuiteGenerator);
testFactory.addTestSuiteFactory(stringSourceTestSuiteGenerator);

testFactory.generate();


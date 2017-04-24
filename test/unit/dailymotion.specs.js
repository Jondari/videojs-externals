import {MainTestFactory} from './base/base';
import BaseTestConfiguration from './base/BaseTestConfiguration';
import HtmlSourceTestSuiteGenerator from './base/generators/HtmlSourceTestSuiteGenerator';
import NoSourceTestSuiteGenerator from './base/generators/NoSourceTestSuiteGenerator';
import ObjectSourceTestSuiteGenerator from './base/generators/ObjectSourceTestSuiteGenerator';
import StringSourceTestSuiteGenerator from './base/generators/StringSourceTestSuiteGenerator';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

var getSourceString = videojs.getComponent('Externals').sourceToString;

function getDailymotionVideoId(source) {
  return videojs.getComponent('Dailymotion').prototype.parseSrc(getSourceString(source));
}

function iframeSourceTester(uri, source) {
  var sourceId = getDailymotionVideoId(source);
  expect(uri).toMatch(new RegExp(`^https?://www.dailymotion.com/embed/video/${sourceId}`));
}

const MIME_TYPE = 'video/dailymotion';
const basicConfiguration = new BaseTestConfiguration(
  'Dailymotion',
  iframeSourceTester
);

const htmlSourceTestSuiteGenerator = new HtmlSourceTestSuiteGenerator(
  basicConfiguration,
  {
    src: 'http://www.dailymotion.com/video/x5j0y0q_les-candidats-les-plus-badass-de-la-presidentielle-2017_fun',
    type: MIME_TYPE
  },
  {
    src: 'http://www.dailymotion.com/video/x51h80y_emilija-veljkovic-u-seniorskoj-rukometnoj-reprezentaciji-srbije-10-novembar-2016-rtv-bor_news',
    type: MIME_TYPE
  }
);
const noSourceTestSuiteGenerator = new NoSourceTestSuiteGenerator(
  basicConfiguration,
  null,
  {src: 'http://www.dailymotion.com/video/x5j2t3s_la-terrible-blessure-d-ibrahimovic_sport', type: MIME_TYPE},
  'test/resources/videojs_from_script.html'
);
const objectSourceTestSuiteGenerator = new ObjectSourceTestSuiteGenerator(
  basicConfiguration,
  {
    src: 'http://www.dailymotion.com/video/x5fi0zc_kali-uchis-ridin-round-oshi-remix_music',
    type: MIME_TYPE
  },
  {
    src: 'http://www.dailymotion.com/video/x2rv1p5_the-weeknd-or-nah-ft-ty-dolla-igns-wiz-khalifa-apex-rise-trap-remix_music',
    type: MIME_TYPE
  },
  'test/resources/videojs_from_script.html'
);
const stringSourceTestSuiteGenerator = new StringSourceTestSuiteGenerator(
  basicConfiguration,
  {src: 'http://www.dailymotion.com/video/x3fk5bw', type: MIME_TYPE},
  {src: 'http://www.dailymotion.com/video/x5j4u37_vitaa-interprete-confessions-nocturnes_music', type: MIME_TYPE},
  'test/resources/videojs_from_script.html'
);


var testFactory = new MainTestFactory(basicConfiguration);

testFactory.addTestSuiteFactory(htmlSourceTestSuiteGenerator);
testFactory.addTestSuiteFactory(noSourceTestSuiteGenerator);
testFactory.addTestSuiteFactory(objectSourceTestSuiteGenerator);
testFactory.addTestSuiteFactory(stringSourceTestSuiteGenerator);

testFactory.generate();


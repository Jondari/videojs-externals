/**
 * Should call a jasmine `expect` to test if the iframe is embedding a player for the correct source
 *
 * @callback uriForSourceTester
 * @param uri {String}
 * @param source {SourceObject}
 */


export default class BaseTestConfiguration {
  techName;
  iframeSourceTest;
  toggledTests;
  techOptions;

  /**
   *
   * @param techName {String} - Case sensitive! It should be given as registered to videojs
   * @param iframeSourceTest {uriForSourceTester}
   * @param toggledTests {Object=}
   * @param toggledTests.poster {Boolean}
   * @param techOptions {Object=} Options specific to the tech
   */
  constructor(techName,
              iframeSourceTest=null,
              toggledTests={},
              techOptions={}
  ) {
    this.techName = techName;
    this.iframeSourceTest = iframeSourceTest;
    this.toggledTests = toggledTests;
    this.techOptions = techOptions;
  }
}

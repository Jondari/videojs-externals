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

  /**
   *
   * @param techName {String} - Case sensitive! It should be given as registered to videojs
   * @param iframeSourceTest {uriForSourceTester}
   * @param toggledTests {Object=}
   * @param toggledTests.poster {Boolean}
   */
  constructor(techName,
              iframeSourceTest=null,
              toggledTests={}) {
    this.techName = techName;
    this.iframeSourceTest = iframeSourceTest;
    this.toggledTests = toggledTests;
  }
}

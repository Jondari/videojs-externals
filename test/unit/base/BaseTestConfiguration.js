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

  /**
   *
   * @param techName {String} - Case sensitive! It should be given as registered to videojs
   * @param iframeSourceTest {uriForSourceTester}
   */
  constructor(techName,
              iframeSourceTest) {
    this.techName = techName;
    this.iframeSourceTest = iframeSourceTest;
  }
}

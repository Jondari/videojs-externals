export default class BaseTestConfiguration {
  techName;
  iframeSourceRegexTemplate;

  /**
   *
   * @param techName {String} - Case sensitive! It should be given as registered to videojs
   * @param iframeSourceRegexTemplate {String}
   *          A template string that accepts a `source` parameter.
   *          Used to test if the iframe is pointing to the correct source
   */
  constructor(techName,
              iframeSourceRegexTemplate) {
    this.techName = techName;
    this.iframeSourceRegexTemplate = iframeSourceRegexTemplate;
  }
}

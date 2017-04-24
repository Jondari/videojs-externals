export default class BaseTestConfiguration {
  techName;

  /**
   *
   * @param techName {String}
   * @param sourceObjectTest {Function}
   * @param playTest {Function}
   * @param seekTo30Test {Function}
   * @param changeVolumeTest {Function}
   * @param changeSourceTest {Function}
   */
  constructor(techName,
              sourceObjectTest,
              playTest,
              seekTo30Test,
              changeVolumeTest,
              changeSourceTest) {
    this.techName = techName;
    this.widgetObjectTest = sourceObjectTest;
    this.playTest = playTest;
    this.seekTo30Test = seekTo30Test;
    this.changeVolumeTest = changeVolumeTest;
    this.changeSourceTest = changeSourceTest;
  }
}

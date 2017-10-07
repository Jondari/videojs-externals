'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _video = require('video.js');

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file sub-poster-image.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Component = _video2.default.getComponent('Component');
var PosterImage = _video2.default.getComponent('PosterImage');

/**
 * The component that handles showing the poster image.
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Button
 * @class SubPosterImage
 */

var SubPosterImage = function (_PosterImage) {
  _inherits(SubPosterImage, _PosterImage);

  function SubPosterImage(player, options) {
    _classCallCheck(this, SubPosterImage);

    return _possibleConstructorReturn(this, (SubPosterImage.__proto__ || Object.getPrototypeOf(SubPosterImage)).call(this, player, options));
  }

  /**
   * Event handler for updates to the player's poster source
   *
   * @method update
   */


  _createClass(SubPosterImage, [{
    key: 'update',
    value: function update(url) {

      this.setSrc(url);

      // If there's no poster source we should display:none on this component
      // so it's not still clickable or right-clickable
      if (url) {
        this.show();
      } else {
        this.hide();
      }
    }
  }]);

  return SubPosterImage;
}(PosterImage);

Component.registerComponent('SubPosterImage', SubPosterImage);
exports.default = SubPosterImage;
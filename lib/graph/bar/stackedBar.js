"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.svg_stackedbar100_s = svg_stackedbar100_s;
var _filter = require("../../function/filter.js");
var _standardLegend = require("../../graph/legend/standardLegend.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/** Simple Progress Bar
 * @param {object} _graph Object created from new graph to set properties
 * @returns {[SVGElement HTMLElement]} - The created SVG element and the corresponding legend
 */
function svg_stackedbar100_s(_graph) {
  var options = _objectSpread({}, _graph.options);
  var values = _objectSpread({}, _graph.values);

  // order the value
  (0, _filter.orderValue)(options, values);

  // Create a new progress bar SVG element
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", options.svg_width);
  svg.setAttribute("height", options.svg_height * 2);
  if (options.element_rounded_width[0] > options.svg_height / 2) {
    options.element_rounded_width[0] = options.svg_height / 2;
  }
  // calculate the total value on values
  var totalValue = 0;
  var percentage = [];
  var usedWidth = 0;

  // Create the bar background
  var bar_background = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  bar_background.setAttribute("width", options.svg_width);
  bar_background.setAttribute("height", options.svg_height);
  bar_background.setAttribute("fill", "darkgrey");
  bar_background.setAttribute("rx", options.element_rounded_width[0]); // Set horizontal radius for rounded corners
  bar_background.setAttribute("ry", options.element_rounded_width[0]); // Set vertical radius for rounded corners
  svg.appendChild(bar_background);
  for (var key in values.elements) {
    var element = values.elements[key];
    totalValue += element.value;
  }

  // Create bars element
  for (var _key in values.elements) {
    var _element = values.elements[_key];
    if (_key == 3) {
      break;
    }
    // get the percentage of the value represented
    percentage[_key] = _element.value / totalValue;
    // Size
    var barWidth = options.svg_width * percentage[_key] - 1;
    var barHeight = options.svg_height;
    var roundedWidth = options.element_rounded_width[0];
    var pathData = void 0;
    if (usedWidth === 0) {
      // Path data for a rectangle with rounded top-left and bottom-left corners
      pathData = "\n                M".concat(usedWidth + roundedWidth, ",0\n                H").concat(usedWidth + barWidth, "\n                V").concat(barHeight, "\n                H").concat(usedWidth + roundedWidth, "\n                A").concat(roundedWidth, ",").concat(roundedWidth, " 0 0,1 ").concat(usedWidth, ",").concat(barHeight - roundedWidth, "\n                V").concat(roundedWidth, "\n                A").concat(roundedWidth, ",").concat(roundedWidth, " 0 0,1 ").concat(usedWidth + roundedWidth, ",0\n                Z\n            ");
    } else if (Number(_key) === values.elements.length - 1) {
      // Path data for a rectangle with rounded top-right and bottom-right corners
      pathData = "\n                M".concat(usedWidth, ",0\n                H").concat(usedWidth + barWidth - roundedWidth, "\n                A").concat(roundedWidth, ",").concat(roundedWidth, " 0 0,1 ").concat(usedWidth + barWidth, ",").concat(roundedWidth, "\n                V").concat(barHeight - roundedWidth, "\n                A").concat(roundedWidth, ",").concat(roundedWidth, " 0 0,1 ").concat(usedWidth + barWidth - roundedWidth, ",").concat(barHeight, "\n                H").concat(usedWidth, "\n                Z\n            ");
    } else {
      // Path data for a regular rectangle
      pathData = "\n                M".concat(usedWidth, ",0\n                H").concat(usedWidth + barWidth, "\n                V").concat(barHeight, "\n                H").concat(usedWidth, "\n                Z\n            ");
    }

    // Create a new path element
    var bar = document.createElementNS("http://www.w3.org/2000/svg", "path");
    bar.setAttribute("d", pathData);
    bar.setAttribute("fill", _element.colors.length != 0 ? _element.colors[0] : options.graph_colors[0]);
    svg.appendChild(bar);
    usedWidth += barWidth + 1;
  }
  var legend = (0, _standardLegend.lgd_legend_s)(options, values, totalValue);
  return [svg, legend];
}
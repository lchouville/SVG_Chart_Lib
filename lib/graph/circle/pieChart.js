"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.svg_PieChart_s = svg_PieChart_s;
var _filter = require("../../function/filter.js");
var _standardLegend = require("../../graph/legend/standardLegend.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/** Circular Stacked Progress Bar
 * @param {object} _graph Object created from new graph to set properties
 * @returns {[SVGElement HTMLElement]} - The created SVG element and the corresponding legend
 */
function svg_PieChart_s(_graph) {
  var options = _objectSpread({}, _graph.options);
  var values = _objectSpread({}, _graph.values);

  // order the value
  (0, _filter.orderValue)(options, values);
  var diameter = options.svg_radius * 2;

  // Create a new SVG element
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", diameter);
  svg.setAttribute("height", diameter);
  svg.setAttribute("viewBox", "0 0 ".concat(diameter, " ").concat(diameter));

  // Calculate the total value
  var totalValue = 0;

  // Calculate the start and end angles for each segment
  var startAngle = -90;
  for (var i = 0; i < values.elements.length; i++) {
    var element = values.elements[i];
    var value = element.value;
    var percentage = value / values.value_max;
    var endAngle = startAngle + percentage * 360;

    // Create the segment
    var largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    var startX = options.svg_radius + options.svg_radius * Math.cos(Math.PI * startAngle / 180);
    var startY = options.svg_radius + options.svg_radius * Math.sin(Math.PI * startAngle / 180);
    var endX = options.svg_radius + options.svg_radius * Math.cos(Math.PI * endAngle / 180);
    var endY = options.svg_radius + options.svg_radius * Math.sin(Math.PI * endAngle / 180);
    var pathData = "\n            M ".concat(options.svg_radius, ",").concat(options.svg_radius, "\n            L ").concat(startX, ",").concat(startY, "\n            A ").concat(options.svg_radius, ",").concat(options.svg_radius, " 0 ").concat(largeArcFlag, ",1 ").concat(endX, ",").concat(endY, "\n            Z\n        ");

    // Create a new path element
    var segment = document.createElementNS("http://www.w3.org/2000/svg", "path");
    segment.setAttribute("d", pathData);
    segment.setAttribute("fill", element.colors[0]);
    svg.appendChild(segment);

    // Update the start angle for the next segment
    startAngle = endAngle;
  }

  // Generate the legend using the provided legend function
  var legend = (0, _standardLegend.lgd_legend_s)(options, values, values.value_max);
  return [svg, legend];
}
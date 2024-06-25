"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.svg_ColumnChart_s = svg_ColumnChart_s;
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
function svg_ColumnChart_s(_graph) {
  var options = _objectSpread({}, _graph.options);
  var values = _objectSpread({}, _graph.values);

  // order the value
  (0, _filter.orderValue)(options, values);
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", options.svg_width);
  svg.setAttribute("height", options.svg_height);

  // create the background
  var graph_background = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  graph_background.setAttribute("width", options.svg_width - 1);
  graph_background.setAttribute("height", options.svg_height - 1);
  graph_background.setAttribute("fill", options.svg_colors[0]);
  graph_background.setAttribute("stroke", options.svg_border[1]);
  graph_background.setAttribute("stroke-width", options.svg_border[0]);
  graph_background.setAttribute("rx", options.svg_rounded_width); // Set horizontal radius for rounded corners
  graph_background.setAttribute("ry", options.svg_rounded_width); // Set vertical radius for rounded corners
  svg.appendChild(graph_background);

  // create the axis
  var graph_axisX = document.createElementNS("http://www.w3.org/2000/svg", "line");
  graph_axisX.setAttribute("x1", options.svg_margin[3]);
  graph_axisX.setAttribute("y1", options.svg_height - options.svg_margin[2]);
  graph_axisX.setAttribute("x2", options.svg_width - options.svg_margin[1]);
  graph_axisX.setAttribute("y2", options.svg_height - options.svg_margin[2]);
  graph_axisX.setAttribute("stroke", options.svg_colors[1]);
  graph_axisX.setAttribute("stroke-width", options.svg_border[0]);
  svg.appendChild(graph_axisX);
  var graph_axisY = document.createElementNS("http://www.w3.org/2000/svg", "line");
  graph_axisY.setAttribute("x1", options.svg_margin[3]);
  graph_axisY.setAttribute("y1", options.svg_margin[0]);
  graph_axisY.setAttribute("x2", options.svg_margin[3]);
  graph_axisY.setAttribute("y2", options.svg_height - options.svg_margin[2]);
  graph_axisY.setAttribute("stroke", options.svg_colors[1]);
  graph_axisY.setAttribute("stroke-width", options.svg_border[0]);
  svg.appendChild(graph_axisY);

  // add y value on axes
  var section = 4;
  for (var i = 0; i <= section; i++) {
    var fontSize = options.svg_margin[3] * 0.45; // Adjust font size
    var barHeight = options.svg_height - (options.svg_margin[0] + options.svg_margin[2]);
    // Create the graduation text
    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", options.svg_margin[3] / 2);
    // text.setAttribute("y", options.svg_height-startPoint/2-i*(options.svg_height-startPoint)/4);
    text.setAttribute("y", options.svg_margin[0] + (section - i) * (barHeight / section));
    text.setAttribute("fill", options.svg_colors[1]);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", fontSize);
    text.textContent = Math.round(values.value_max * (1 / section * i));
    svg.appendChild(text);
    // Create the graduation bar
    var bar = document.createElementNS("http://www.w3.org/2000/svg", "line");
    bar.setAttribute("x1", options.svg_margin[3] - 3);
    bar.setAttribute("y1", options.svg_margin[0] + i * (barHeight / section));
    bar.setAttribute("x2", options.svg_margin[3]);
    bar.setAttribute("y2", options.svg_margin[0] + i * (barHeight / section));
    bar.setAttribute("stroke", options.svg_colors[1]);
    bar.setAttribute("stroke-width", options.svg_border[0]);
    svg.appendChild(bar);
  }

  // Create the bars
  for (var key in values.elements) {
    var element = values.elements[key];
    var proportion = element.value / values.value_max;
    var width = (options.svg_width - (options.svg_margin[1] + options.svg_margin[3])) / values.elements.length;
    var height = proportion * (options.svg_height - (options.svg_margin[0] + options.svg_margin[2])) - 1;
    var _bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    _bar.setAttribute("width", width);
    _bar.setAttribute("height", height);
    _bar.setAttribute("fill", element.colors[0]);
    // bar.setAttribute("rx", options.bar_rounded_width); // Set horizontal radius for rounded corners
    // bar.setAttribute("ry", options.bar_rounded_width); // Set vertical radius for rounded corners
    _bar.setAttribute("x", options.svg_margin[3] + 1 + width * key);
    _bar.setAttribute("y", options.svg_height - options.svg_margin[2] - height - 1);
    svg.appendChild(_bar);
  }
  var legend = (0, _standardLegend.lgd_legend_s)(options, values, values.value_max);
  return [svg, legend];
}
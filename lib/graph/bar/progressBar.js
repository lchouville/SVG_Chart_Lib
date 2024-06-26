"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.svg_Progressbar_s = svg_Progressbar_s;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/** Simple Progress Bar
 * @param {object} _graph Object created from new graph to set properties
 * @returns {SVGElement } The created SVG element
 */
function svg_Progressbar_s(_graph) {
  var options = _objectSpread({}, _graph.options);
  var values = _objectSpread({}, _graph.values);
  // Create a new progress bar SVG element
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", options.svg_width);
  svg.setAttribute("height", options.svg_height);

  // Create the bar background
  var bar_background = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  bar_background.setAttribute("width", options.svg_width);
  bar_background.setAttribute("height", options.svg_height);
  bar_background.setAttribute("fill", options.svg_colors[0]);
  bar_background.setAttribute("rx", options.element_rounded_width); // Set horizontal radius for rounded corners
  bar_background.setAttribute("ry", options.element_rounded_width); // Set vertical radius for rounded corners
  svg.appendChild(bar_background);
  var element = values.elements[0];
  // Calculate the width of the progress bar based on the value
  var progress_width = element.value / values.value_max * options.svg_width;

  // Create the bar to display the progress
  var bar_value = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  bar_value.setAttribute("width", progress_width);
  bar_value.setAttribute("height", options.svg_height);
  bar_value.setAttribute("fill", element.colors[0]);
  bar_value.setAttribute("rx", options.element_rounded_width); // Set horizontal radius for rounded corners
  bar_value.setAttribute("ry", options.element_rounded_width); // Set vertical radius for rounded corners
  svg.appendChild(bar_value);

  // Create the value label
  var value_label = document.createElementNS("http://www.w3.org/2000/svg", "text");
  value_label.textContent = options.value_type === "/" ? "".concat(element.value, "/").concat(values.value_max) : "".concat(Math.round(element.value / values.value_max * 100), "%");
  value_label.setAttribute("x", options.svg_width / 2);
  value_label.setAttribute("fill", element.text_color);
  value_label.setAttribute("font-family", "sans-serif");
  value_label.setAttribute("text-anchor", "middle"); // Center text horizontally

  // Calculate vertical centering
  var fontSize = options.svg_height * 0.85; // Adjust font size
  var textHeight = fontSize * 0.8; // Approximate text height
  var centerY = (options.svg_height + textHeight) / 2; // Calculate vertical center
  value_label.setAttribute("font-size", fontSize);
  value_label.setAttribute("y", centerY);
  svg.appendChild(value_label);
  return svg;
}
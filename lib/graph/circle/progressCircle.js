"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.svg_ProgressCircle_s = svg_ProgressCircle_s;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/** Circular Progress Bar
 * @param {object} _graph Object created from new graph to set properties
 * @returns {SVGElement} - The created SVG element
 */
function svg_ProgressCircle_s(_graph) {
  var options = _objectSpread({}, _graph.options);
  var values = _objectSpread({}, _graph.values);
  var element = values.elements[0];
  var diameter = options.svg_radius * 2;
  var circumference = 2 * Math.PI * options.svg_radius;
  var offset = circumference - element.value / values.value_max * circumference;

  // Create a new SVG element
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", diameter + options.svg_border[0] * 2);
  svg.setAttribute("height", diameter + options.svg_border[0] * 2);

  // Create the background circle
  var circle_bg = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle_bg.setAttribute("cx", options.svg_radius + options.svg_border[0]);
  circle_bg.setAttribute("cy", options.svg_radius + options.svg_border[0]);
  circle_bg.setAttribute("r", options.svg_radius);
  circle_bg.setAttribute("stroke", options.svg_border[1]);
  circle_bg.setAttribute("stroke-width", options.svg_border[0]);
  circle_bg.setAttribute("fill", "none");
  svg.appendChild(circle_bg);

  // Create the progress circle
  var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", options.svg_radius + options.svg_border[0]);
  circle.setAttribute("cy", options.svg_radius + options.svg_border[0]);
  circle.setAttribute("r", options.svg_radius);
  circle.setAttribute("stroke", element.colors[0]);
  circle.setAttribute("stroke-width", options.svg_border[0]);
  circle.setAttribute("fill", "none");
  circle.setAttribute("stroke-dasharray", circumference);
  circle.setAttribute("stroke-dashoffset", offset);
  circle.setAttribute("transform", "rotate(-90 ".concat(options.svg_radius + options.svg_border[0], " ").concat(options.svg_radius + options.svg_border[0], ")")); // Rotate to start from top
  svg.appendChild(circle);

  // Create the value label
  var value_label = document.createElementNS("http://www.w3.org/2000/svg", "text");
  value_label.textContent = options.value_type === "/" ? "".concat(element.value, "/").concat(values.value_max) : "".concat(Math.round(element.value / values.value_max * 100), "%");
  value_label.setAttribute("x", options.svg_radius + options.svg_border[0]);
  value_label.setAttribute("y", options.svg_radius + options.svg_border[0]);
  value_label.setAttribute("fill", element.text_color);
  value_label.setAttribute("font-family", "sans-serif");
  value_label.setAttribute("font-size", options.svg_radius * 0.5); // Adjust font size
  value_label.setAttribute("dominant-baseline", "middle"); // Center text vertically
  value_label.setAttribute("text-anchor", "middle"); // Center text horizontally
  svg.appendChild(value_label);
  return svg;
}
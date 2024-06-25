"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.svg_radarChart_s = svg_radarChart_s;
var _filter = require("../../function/filter.js");
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
function svg_radarChart_s(_graph) {
  var options = _objectSpread({}, _graph.options);
  var values = _objectSpread({}, _graph.values);

  // order the value
  (0, _filter.orderValue)(options, values);
  var radius = options.svg_radius;
  var diameter = radius * 2;

  // Create a new SVG element
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", diameter * 1.25);
  svg.setAttribute("height", diameter);
  svg.setAttribute("viewBox", "0 0 ".concat(diameter, " ").concat(diameter));

  // Center of the radar chart
  var cx = radius;
  var cy = radius;

  // Number of axes (branches)
  var numAxes = values.elements.length;
  var angleStep = 360 / numAxes;

  // Create the spider cobweb
  var cobweb = document.createElementNS("http://www.w3.org/2000/svg", "g");
  cobweb.setAttribute("class", "cobweb");

  // Draw cobweb circles
  var numLevels = 10;
  for (var _i = 1; _i <= numLevels; _i++) {
    var r = radius / numLevels * _i * 0.75;
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("r", r);
    circle.setAttribute("stroke", _i % 2 == 0 ? options.svg_colors[0] : options.svg_colors[1]);
    circle.setAttribute("fill", "none");
    cobweb.appendChild(circle);
  }

  // Draw cobweb lines and axis labels
  var i = 0;
  var startAngle = -90;
  for (var key in values.elements) {
    var element = values.elements[key];
    var angleDeg = i * angleStep;
    var angle = (angleDeg + startAngle) * Math.PI / 180;
    var x = cx + (radius - radius * 0.15) * Math.cos(angle);
    var y = cy + (radius - radius * 0.15) * Math.sin(angle);
    // Line
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", cx);
    line.setAttribute("y1", cy);
    line.setAttribute("x2", x);
    line.setAttribute("y2", y);
    line.setAttribute("stroke", options.svg_colors[0]);
    cobweb.appendChild(line);
    // Label
    var labelX = cx + (radius - radius * 0.15) * Math.cos(angle);
    var labelY = cy + (radius - radius * 0.15) * Math.sin(angle);
    var label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", labelX);
    label.setAttribute("y", labelY);

    // Adjust rotation to keep text upright
    var rotation = angleDeg - 90;
    var angleT = angleDeg + 90;
    var anchor = "end";
    var displace = -20;
    if (angleDeg >= 180 && angleDeg <= 360) {
      rotation += 180;
      anchor = "start";
    }
    var transform = "";
    if (values.elements.length >= 8) {
      displace /= 2;
      transform = "\n            translate(".concat(displace * Math.cos(angleDeg * Math.PI / 180), ", ").concat(displace * Math.sin(angleDeg * Math.PI / 180), ")\n            rotate(").concat(rotation, ", ").concat(labelX, ", ").concat(labelY, ")\n            ");
    } else {
      anchor = "middle";
      switch (true) {
        case angleDeg <= 45 && angleDeg >= 0 || angleDeg >= 315 && angleDeg <= 360:
          displace /= 2;
          break;
        case angleDeg > 45 && angleDeg < 135:
          break;
        case angleDeg >= 135 && angleDeg <= 225:
          displace /= 2;
          break;
        default:
          break;
      }
      transform = "\n            translate(".concat(displace * Math.cos(angleT * Math.PI / 180), ", ").concat(displace * Math.sin(angleT * Math.PI / 180), ")\n            ");
    }
    label.setAttribute("text-anchor", anchor);
    label.setAttribute("transform", "\n        " + transform);
    label.textContent = element.label;
    label.setAttribute("fill", element.text_color);
    label.setAttribute("font-size", options.svg_radius * 0.12);
    label.style.fontWeight = "bold";
    label.setAttribute("font-family", "sans-serif");
    label.setAttribute("dominant-baseline", "middle");
    cobweb.appendChild(label);
    i++;
  }
  svg.appendChild(cobweb);

  // Create radar chart path
  var radarPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  var radarPoints = "";
  for (var _key in values.elements) {
    var _element = values.elements[_key];
    var _angleDeg = _key * angleStep;
    var _angle = (_angleDeg + startAngle) * Math.PI / 180;
    // const r = ((radius / numLevels) * i)*0.75;
    // console.log((values.values[key] / values.value_max),((radius / numLevels) * key)*0.75);
    // console.log((values.values[key] / values.value_max) * (radius));
    var _r = _element.value / values.value_max * (radius * 0.75);
    var _x = cx + _r * Math.cos(_angle);
    var _y = cy + _r * Math.sin(_angle);
    radarPoints += "".concat(_x, ",").concat(_y, " ");
  }
  radarPath.setAttribute("d", "M ".concat(radarPoints.trim(), " Z"));
  radarPath.setAttribute("fill", options.graph_colors[1]);
  radarPath.setAttribute("stroke", options.graph_colors[0]);
  radarPath.setAttribute("stroke-width", "2");
  svg.appendChild(radarPath);
  return svg;
}
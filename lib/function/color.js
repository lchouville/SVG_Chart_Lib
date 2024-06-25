"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addDistinctColors = addDistinctColors;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/**
 * Generates an array of distinct colors, including additional colors distinct from an existing array.
 * @param {number} n The number of additional distinct colors to generate.
 * @param {string[]} existingColors An array of existing colors in HSL format.
 * @returns {string[]} An array of color strings in HSL format.
 */
function addDistinctColors(n, existingColors) {
  var colors = existingColors.map(toHSL);
  var tColors = _toConsumableArray(colors); // array to store the colors in hue order
  // Calculate how many colors we need to add
  var numColorsToAdd = n - colors.length;
  for (var i = 0; i < numColorsToAdd; i++) {
    // updade the slice and sort by hue order
    tColors = _toConsumableArray(colors).sort(function (a, b) {
      return a.h - b.h;
    });
    var colorSet = 1;
    console.log(tColors);
    switch (colors.length) {
      case 0:
        colors.push(toHSL("red"));
        colors.push(toHSL("green"));
        colors.push(toHSL("blue"));
        i += 2;
        break;
      case 1:
        colors.push(toHSL("hsl(".concat((colors[0].h + 120) % 360, ", ").concat(colors[0].s, "%, ").concat(colors[0].l, "%)")));
        colors.push(toHSL("hsl(".concat((colors[0].h + 240) % 360, ", ").concat(colors[0].s, "%, ").concat(colors[0].l, "%)")));
        i += 1;
        break;
      case 2:
        var color1 = colors[0];
        var color2 = colors[1];
        var midHue1 = (color1.h + color2.h) / 2;
        var midSat1 = (color1.s + color2.s) / 2;
        var midLight1 = (color1.l + color2.l) / 2;
        if (Math.abs(color1 - color2) < 180) {
          midHue1 = (midHue1 + 180) % 360;
        }
        colors.push(toHSL("hsl(".concat(midHue1, ", ").concat(midSat1, "%, ").concat(midLight1, "%)")));
        break;
      default:
        // Determine colorA and colorB based on (colors.length)%3 to ensure good distribution
        var colorA = void 0;
        var colorB = void 0;
        switch ((i + 1) % 3) {
          case 0:
            colorA = tColors[0];
            colorB = tColors[colors.length - 2];
            break;
          case 1:
            colorA = tColors[1];
            colorB = tColors[colors.length - 1];
            break;
          default:
            colorA = tColors[0];
            colorB = tColors[colors.length - 1];
            break;
        }
        console.log(i, colorA, colorB);

        // Calculate the midpoint hue considering the wraparound at 360 degrees
        var hueA = colorA.h;
        var hueB = colorB.h;
        var midHue2 = void 0;
        if (Math.abs(hueA - hueB) > 180) {
          // Handle the wraparound
          midHue2 = (hueA + hueB + 360) / 2 % 360;
        } else {
          midHue2 = (hueA + hueB) / 2;
        }
        var midSat2 = (colorA.s + colorB.s) / 2;
        var midLight2 = (colorA.l + colorB.l) / 2;
        colors.push(toHSL("hsl(".concat(midHue2, ", ").concat(midSat2, "%, ").concat(midLight2, "%)")));
        console.log(colors);
        break;
    }
  }
  return colors.map(function (hsl) {
    return "hsl(".concat(hsl.h, ", ").concat(hsl.s, "%, ").concat(hsl.l, "%)");
  });
}

/**
 * Converts a color to HSL format.
 * Supports named colors, hex, rgb, and rgba formats.
 * @param {string} color The color string.
 * @returns {object} The color in HSL format as an object { h, s, l }.
 */
function toHSL(color) {
  // Helper function to convert RGB to HSL
  function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h,
      s,
      l = (max + min) / 2;
    if (max === min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }

  // Convert named colors and hex to RGB first
  if (color[0] === '#') {
    // Handle hex colors
    var r, g, b;
    if (color.length === 4) {
      r = parseInt(color[1] + color[1], 16);
      g = parseInt(color[2] + color[2], 16);
      b = parseInt(color[3] + color[3], 16);
    } else {
      r = parseInt(color[1] + color[2], 16);
      g = parseInt(color[3] + color[4], 16);
      b = parseInt(color[5] + color[6], 16);
    }
    return rgbToHsl(r, g, b);
  } else if (color.startsWith('rgb')) {
    // Handle rgb and rgba colors
    var match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*\d+\.\d+)?\)/);
    if (match) {
      var _r = parseInt(match[1], 10);
      var _g = parseInt(match[2], 10);
      var _b = parseInt(match[3], 10);
      return rgbToHsl(_r, _g, _b);
    }
  } else {
    // Assume it's a named color
    var ctx = document.createElement('canvas').getContext('2d');
    ctx.fillStyle = color;
    var computedColor = ctx.fillStyle;
    if (computedColor.startsWith('#')) {
      // Convert the computed hex color to HSL
      return toHSL(computedColor);
    }
  }
  return color; // return as-is if we couldn't convert it
}
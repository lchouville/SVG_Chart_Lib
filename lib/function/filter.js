"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orderValue = orderValue;
function orderValue(_options, _values) {
  switch (_options.orderOn) {
    case "valuesTab":
      // TODO: order on specific Slice in Values
      break;
    case "labelsTab":
      // TODO: order on specific Slice in Labels
      break;
    case "labels":
      if (_options.order === "asc" || _options.order === "desc") {
        _values.elements.sort(function (a, b) {
          return _options.order === "asc" ? a.label.localeCompare(b.label) : b.label.localeCompare(a.label);
        });
      }
      break;
    default:
      // Apply the order to values
      if (_options.order === "asc" || _options.order === "desc") {
        _values.elements.sort(function (a, b) {
          return _options.order === "asc" ? a.value - b.value : b.value - a.value;
        });
      }
      break;
  }
}
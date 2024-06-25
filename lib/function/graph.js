"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewElement = NewElement;
exports.newGraph = newGraph;
var _filter = require("../function/filter.js");
function newGraph() {
  // Create options and values objects with default settings
  var options = {
    // Svg Options
    svg_width: 200,
    svg_height: 150,
    svg_radius: 50,
    svg_rounded_width: 0,
    svg_colors: ["none"],
    svg_border: [0, "none"],
    svg_margin: [5, 5, 10, 25],
    // Element Options
    graph_colors: ["red", "blue", "green"],
    element_rounded_width: [0, 0, 0, 0],
    text_color: "black",
    order: "none",
    orderOn: "values",
    value_type: ''
  };
  var values = {
    labels: [""],
    values: [0],
    value_max: undefined,
    elements: []
  };
  var builder = {
    // Svg Options
    /**
     * Set the svg width and height (px)
     */
    setSvgDim: function setSvgDim(width, height) {
      options.svg_width = width;
      options.svg_height = height;
      options.svg_radius = 0;
      return this;
    },
    /**
     * Set the radius to the svg (px) replacing the setSvgDim
     */
    setSvgRadius: function setSvgRadius(radius) {
      options.svg_width = 0;
      options.svg_height = 0;
      options.svg_radius = radius;
      return this;
    },
    /**
     * Set the corner radius of the svg
     */
    setSvgRoundedWidth: function setSvgRoundedWidth(roundedWidth) {
      options.svg_rounded_width = roundedWidth;
      return this;
    },
    /**
     * Set global svg colors number depending to the graph
     */
    setSvgColors: function setSvgColors(colors) {
      // Check if parameter are an array, otherwise transform them into array format
      if (Array.isArray(colors)) {
        options.svg_colors = colors;
      } else {
        options.svg_colors = [colors];
      }
      return this;
    },
    /**
     * Set the border of the svg [width,color]
     */
    setSvgBorder: function setSvgBorder(border) {
      // Check if border are an array and have 2 elements min
      if (Array.isArray(border) && border.length >= 2) {
        options.svg_border = border;
      } else {
        options.svg_border = [0, "none"];
      }
      return this;
    },
    /**
     * Set the margin to the graph in svg elements)
     */
    setSvgMargin: function setSvgMargin(margin) {
      // Check if parameter are an array, otherwise transform them into array format
      if (Array.isArray(margin)) {
        options.svg_margin = margin;
      } else {
        options.svg_margin = [margin];
      }
      return this;
    },
    // Element Options
    /**
     * Set Graph Colors When they not depending of value
     */
    setGraphColors: function setGraphColors(colors) {
      // Check if parameter are an array, otherwise transform them into array format
      if (Array.isArray(colors)) {
        options.graph_colors = colors;
      } else {
        options.graph_colors = [colors];
      }
      return this;
    },
    /**
     * Set the corner radius of the Element
     */
    setElementRoundedWidth: function setElementRoundedWidth(roundedWidths) {
      // Check if parameter are an array, otherwise transform them into array format
      if (Array.isArray(roundedWidths)) {
        options.element_rounded_width = roundedWidths;
      } else {
        options.element_rounded_width = [roundedWidths];
      }
      return this;
    },
    /**
     * Set text Color When they not depending of value
     */
    setTextColor: function setTextColor(textColor) {
      options.text_color = textColor;
      return this;
    },
    /**
     * Set The Order Of values [asc/desc,""/labels]
     */
    setOrder: function setOrder(order, orderOn) {
      options.order = order;
      options.orderOn = orderOn;
      return this;
    },
    /**
     * Set how the value is formatted '/';'%'
     */
    setValueType: function setValueType(valueType) {
      options.value_type = valueType;
      return this;
    },
    // Values Options
    /**
     * Set the maxvalue (for percentage values) default: sum(values)
     */
    setValueMax: function setValueMax(valueMax) {
      values.value_max = valueMax;
      return this;
    },
    /**
     * add a new element 
     */
    addElement: function addElement(element) {
      checkElement(element, options, values);
      values.elements.push(element);
      return this;
    },
    /**
     * update an existing element with new elements, unchange value can be avoid by '-'
    */
    updateElement: function updateElement(label, element) {
      // get the element with the label = to the parameter
      var index = values.elements.findIndex(function (element) {
        return element.label === label;
      });
      // if the element is found, update it
      if (index !== -1) {
        values.elements[index].label = element.label != "-" ? element.label : values.elements[index].label;
        values.elements[index].value = element.value != "-" ? element.value : values.elements[index].value;
        values.elements[index].colors = element.colors[0] != "-" ? element.colors : values.elements[index].colors;
        values.elements[index].text_color = element.text_color != "-" ? element.text_color : values.elements[index].text_color;
      } else {
        values.elements.push(element);
      }
      return this;
    },
    // Svg creation
    /**
     * build the graph element, not necessarily on update
     */
    build: function build() {
      // Check and set default options depending on values
      if (values.value_max == undefined || Math.max(values.values) > values.value_max) {
        values.value_max = 0;
        for (var key in values.values) {
          values.value_max += values.values[key];
        }
      }
      (0, _filter.orderValue)(options, values);
      // options.graph_colors = addDistinctColors(values.values.length,options.graph_colors)
      return {
        options: options,
        values: values,
        update: builder
      };
    }
  };
  return builder;
}
/**
 * Creates a new Element object
 * @param {string} Label The label of this element
 * @param {number} value the value of this element
 * @param {string} colors the colors of this element (can have multiple colors on some graphs)
 * @param {string} text_color the text color of this element
 */
function NewElement(Label, value, colors, text_color) {
  var element = {
    label: Label,
    value: value,
    colors: colors,
    text_color: text_color
  };
  element.colors = Array.isArray(colors) ? colors : [colors];
  return element;
}
function checkElement(element, options, values) {
  element.text_color = element.text_color !== undefined ? element.text_color : options.text_color;
  element.text_color = element.text_color !== "" ? element.text_color : options.text_color;
}

/** Simple Progress Bar
 * @param {object} _graph Object created from new graph to set properties
 * @returns {SVGElement } The created SVG element
 */
export function svg_Progressbar_s(_graph) {
    let options = {..._graph.options}
    let values = {..._graph.values}
    // Create a new progress bar SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", options.svg_width);
    svg.setAttribute("height", options.svg_height);

    // Create the bar background
    const bar_background = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bar_background.setAttribute("width", options.svg_width);
    bar_background.setAttribute("height", options.svg_height);
    bar_background.setAttribute("fill", options.svg_colors[0]);
    bar_background.setAttribute("rx", options.element_rounded_width); // Set horizontal radius for rounded corners
    bar_background.setAttribute("ry", options.element_rounded_width); // Set vertical radius for rounded corners
    svg.appendChild(bar_background);

    const element = values.elements[0]
    // Calculate the width of the progress bar based on the value
    const progress_width = (element.value / values.value_max) * options.svg_width;

    // Create the bar to display the progress
    const bar_value = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bar_value.setAttribute("width", progress_width);
    bar_value.setAttribute("height", options.svg_height);
    bar_value.setAttribute("fill", element.colors[0]);
    bar_value.setAttribute("rx", options.element_rounded_width); // Set horizontal radius for rounded corners
    bar_value.setAttribute("ry", options.element_rounded_width); // Set vertical radius for rounded corners
    svg.appendChild(bar_value);

    // Create the value label
    const value_label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    value_label.textContent = options.value_type === "/" ? `${element.value}/${values.value_max}` : `${Math.round((element.value / values.value_max) * 100)}%`;
    value_label.setAttribute("x", options.svg_width / 2);
    value_label.setAttribute("fill", element.text_color);
    value_label.setAttribute("font-family", "sans-serif");
    value_label.setAttribute("text-anchor", "middle"); // Center text horizontally

    // Calculate vertical centering
    const fontSize = options.svg_height * 0.85; // Adjust font size
    const textHeight = fontSize * 0.8; // Approximate text height
    const centerY = (options.svg_height + textHeight) / 2; // Calculate vertical center
    value_label.setAttribute("font-size", fontSize);
    value_label.setAttribute("y", centerY);
    svg.appendChild(value_label);

    return svg;
}
/** Simple Progress Bar
 * @param {object} options 
 *  @property {number} bar_width - The bar width
 *  @property {number} bar_height - The bar height
 *  @property {number} rounded_width - The rounded width (0-10)
 *  @property {string} bar_color - The bar main color
 *  @property {string} bar_background_color - The bar background color.
 *  @property {string} text_color - The text color
 * @param {object} value 
 *  @property {string} value_type - The type of value display ("/" = 10/20, "%" = 50%, or "" = nothing)
 *  @property {number} value_max - The maximum value
 *  @property {number} value - The value of the bar
 * @returns {SVGElement} - The created SVG element
 */
export function svg_Progressbar_s(options, value) {
    // if rounded are undefined set to 0
    if (options.rounded_width === undefined) {
        options.rounded_width = 0;
    }
    // Create a new progress bar SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", options.bar_width);
    svg.setAttribute("height", options.bar_height);

    // Create the bar background
    const bar_background = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bar_background.setAttribute("width", options.bar_width);
    bar_background.setAttribute("height", options.bar_height);
    bar_background.setAttribute("fill", options.bar_background_color);
    bar_background.setAttribute("rx", options.rounded_width); // Set horizontal radius for rounded corners
    bar_background.setAttribute("ry", options.rounded_width); // Set vertical radius for rounded corners
    svg.appendChild(bar_background);

    // Calculate the width of the progress bar based on the value
    const progress_width = (value.value / value.value_max) * options.bar_width;

    // Create the bar to display the progress
    const bar_value = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bar_value.setAttribute("width", progress_width);
    bar_value.setAttribute("height", options.bar_height);
    bar_value.setAttribute("fill", options.bar_color);
    bar_value.setAttribute("rx", options.rounded_width); // Set horizontal radius for rounded corners
    bar_value.setAttribute("ry", options.rounded_width); // Set vertical radius for rounded corners
    svg.appendChild(bar_value);

    // Create the value label
    const value_label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    value_label.textContent = value.value_type === "/" ? `${value.value}/${value.value_max}` : `${Math.round((value.value / value.value_max) * 100)}%`;
    value_label.setAttribute("x", options.bar_width / 2);
    value_label.setAttribute("fill", options.text_color);
    value_label.setAttribute("font-family", "sans-serif");
    value_label.setAttribute("text-anchor", "middle"); // Center text horizontally

    // Calculate vertical centering
    const fontSize = options.bar_height * 0.85; // Adjust font size
    const textHeight = fontSize * 0.8; // Approximate text height
    const centerY = (options.bar_height + textHeight) / 2; // Calculate vertical center
    value_label.setAttribute("font-size", fontSize);
    value_label.setAttribute("y", centerY);
    svg.appendChild(value_label);

    return svg;
}
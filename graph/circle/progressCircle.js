/** Circular Progress Bar
 * @param {object} _options 
 *  @property {number} options.radius  - The options.radius  of the circle
 *  @property {number} stroke_width - The width of the circle's stroke
 *  @property {string} circle_color - The color of the circle
 *  @property {string} circle_background_color - The background color of the circle
 *  @property {string} text_color - The text color
 *  @property {string} value_type - The type of value display ("/" = 10/20, "%" = 50%, or "" = nothing)
 * @param {object} _values 
 *  @property {number} value_max - The maximum value
 *  @property {number} value - The value of the bar
 * @returns {SVGElement} - The created SVG element
 */
export function svg_ProgressCircle_s(_options, _values) {
    let options = {..._options}
    let values = {..._values}

    const diameter = options.radius  * 2;
    const circumference = 2 * Math.PI * options.radius ;
    const offset = circumference - (values.value / values.value_max) * circumference;

    // Create a new SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", diameter + options.stroke_width * 2);
    svg.setAttribute("height", diameter + options.stroke_width * 2);

    // Create the background circle
    const circle_bg = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle_bg.setAttribute("cx", options.radius  + options.stroke_width);
    circle_bg.setAttribute("cy", options.radius  + options.stroke_width);
    circle_bg.setAttribute("r", options.radius );
    circle_bg.setAttribute("stroke", options.circle_background_color);
    circle_bg.setAttribute("stroke-width", options.stroke_width);
    circle_bg.setAttribute("fill", "none");
    svg.appendChild(circle_bg);

    // Create the progress circle
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", options.radius  + options.stroke_width);
    circle.setAttribute("cy", options.radius  + options.stroke_width);
    circle.setAttribute("r", options.radius );
    circle.setAttribute("stroke", options.circle_color);
    circle.setAttribute("stroke-width", options.stroke_width);
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke-dasharray", circumference);
    circle.setAttribute("stroke-dashoffset", offset);
    circle.setAttribute("transform", `rotate(-90 ${options.radius  + options.stroke_width} ${options.radius  + options.stroke_width})`); // Rotate to start from top
    svg.appendChild(circle);

    // Create the value label
    const value_label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    value_label.textContent = options.value_type === "/" ? `${values.value}/${values.value_max}` : `${Math.round((values.value / values.value_max) * 100)}%`;
    value_label.setAttribute("x", (options.radius  + options.stroke_width));
    value_label.setAttribute("y", (options.radius  + options.stroke_width));
    value_label.setAttribute("fill", options.text_color);
    value_label.setAttribute("font-family", "sans-serif");
    value_label.setAttribute("font-size", options.radius  * 0.5); // Adjust font size
    value_label.setAttribute("dominant-baseline", "middle"); // Center text vertically
    value_label.setAttribute("text-anchor", "middle"); // Center text horizontally
    svg.appendChild(value_label);

    return svg;
}


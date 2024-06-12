/** Circular Progress Bar
 * @param {object} _options 
 *  @property {number} radius - The radius of the circle
 *  @property {number} stroke_width - The width of the circle's stroke
 *  @property {string} circle_color - The color of the circle
 *  @property {string} circle_background_color - The background color of the circle
 *  @property {string} text_color - The text color
 * @param {object} _values 
 *  @property {string} value_type - The type of value display ("/" = 10/20, "%" = 50%, or "" = nothing)
 *  @property {number} value_max - The maximum value
 *  @property {number} value - The value of the bar
 * @returns {SVGElement} - The created SVG element
 */
export function svg_ProgressCircle_s(_options, _values) {
    let { radius, stroke_width, circle_color, circle_background_color, text_color } = _options;
    let { value_type, value_max, value } = _values;

    const diameter = radius * 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / value_max) * circumference;

    // Create a new SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", diameter + stroke_width * 2);
    svg.setAttribute("height", diameter + stroke_width * 2);

    // Create the background circle
    const circle_bg = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle_bg.setAttribute("cx", radius + stroke_width);
    circle_bg.setAttribute("cy", radius + stroke_width);
    circle_bg.setAttribute("r", radius);
    circle_bg.setAttribute("stroke", circle_background_color);
    circle_bg.setAttribute("stroke-width", stroke_width);
    circle_bg.setAttribute("fill", "none");
    svg.appendChild(circle_bg);

    // Create the progress circle
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", radius + stroke_width);
    circle.setAttribute("cy", radius + stroke_width);
    circle.setAttribute("r", radius);
    circle.setAttribute("stroke", circle_color);
    circle.setAttribute("stroke-width", stroke_width);
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke-dasharray", circumference);
    circle.setAttribute("stroke-dashoffset", offset);
    circle.setAttribute("transform", `rotate(-90 ${radius + stroke_width} ${radius + stroke_width})`); // Rotate to start from top
    svg.appendChild(circle);

    // Create the value label
    const value_label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    value_label.textContent = value_type === "/" ? `${value}/${value_max}` : `${Math.round((value / value_max) * 100)}%`;
    value_label.setAttribute("x", (radius + stroke_width));
    value_label.setAttribute("y", (radius + stroke_width));
    value_label.setAttribute("fill", text_color);
    value_label.setAttribute("font-family", "sans-serif");
    value_label.setAttribute("font-size", radius * 0.5); // Adjust font size
    value_label.setAttribute("dominant-baseline", "middle"); // Center text vertically
    value_label.setAttribute("text-anchor", "middle"); // Center text horizontally
    svg.appendChild(value_label);

    return svg;
}

/** Circular Progress Bar
 * @param {object} _graph Object created from new graph to set properties
 * @returns {SVGElement} - The created SVG element
 */
export function svg_ProgressCircle_s(_graph) {
    let options = {..._graph.options}
    let values = {..._graph.values}
    
    const element = values.elements[0]
    const diameter = options.svg_radius  * 2;
    const circumference = 2 * Math.PI * options.svg_radius ;
    const offset = circumference - (element.value / values.value_max) * circumference;

    // Create a new SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", diameter + options.svg_border[0] * 2);
    svg.setAttribute("height", diameter + options.svg_border[0] * 2);

    // Create the background circle
    const circle_bg = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle_bg.setAttribute("cx", options.svg_radius  + options.svg_border[0]);
    circle_bg.setAttribute("cy", options.svg_radius  + options.svg_border[0]);
    circle_bg.setAttribute("r", options.svg_radius );
    circle_bg.setAttribute("stroke", options.svg_border[1]);
    circle_bg.setAttribute("stroke-width", options.svg_border[0]);
    circle_bg.setAttribute("fill", "none");
    svg.appendChild(circle_bg);

    // Create the progress circle
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", options.svg_radius  + options.svg_border[0]);
    circle.setAttribute("cy", options.svg_radius  + options.svg_border[0]);
    circle.setAttribute("r", options.svg_radius );
    circle.setAttribute("stroke", element.colors[0]);
    circle.setAttribute("stroke-width", options.svg_border[0]);
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke-dasharray", circumference);
    circle.setAttribute("stroke-dashoffset", offset);
    circle.setAttribute("transform", `rotate(-90 ${options.svg_radius  + options.svg_border[0]} ${options.svg_radius  + options.svg_border[0]})`); // Rotate to start from top
    svg.appendChild(circle);

    // Create the value label
    const value_label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    value_label.textContent = options.value_type === "/" ? `${element.value}/${values.value_max}` : `${Math.round((element.value / values.value_max) * 100)}%`;
    value_label.setAttribute("x", (options.svg_radius  + options.svg_border[0]));
    value_label.setAttribute("y", (options.svg_radius  + options.svg_border[0]));
    value_label.setAttribute("fill", element.text_color);
    value_label.setAttribute("font-family", "sans-serif");
    value_label.setAttribute("font-size", options.svg_radius  * 0.5); // Adjust font size
    value_label.setAttribute("dominant-baseline", "middle"); // Center text vertically
    value_label.setAttribute("text-anchor", "middle"); // Center text horizontally
    svg.appendChild(value_label);

    return svg;
}


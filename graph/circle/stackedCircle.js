import { lgd_legend_s } from "../legend/standardLegend.js";

/** Circular Stacked Progress Bar
 * @param {object} _options 
 *  @property {number} radius - The radius of the circle
 *  @property {number} stroke_width - The width of the circle's stroke
 *  @property {[string]} bar_colors - The colors of the segments
 *  @property {string} text_color - The text color
 *  @property {[string]} order - The order of values displayed (asc, desc, none)
 * @param {object} _values 
 *  @property {[string]} labels - The labels
 *  @property {[number]} values - The values of the segments
 * @returns {SVGElement} - The created SVG element and the corresponding legend
 */
export function svg_StackedCircle_s(_options, _values) {
    let options = {..._options}
    let values = {..._values}

    const diameter = options.radius * 2;

    // Create a new SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", diameter + options.stroke_width * 2);
    svg.setAttribute("height", diameter + options.stroke_width * 2);

    // Apply the order to the labels and values
    if (options.order === "asc" || options.order === "desc") {
        console.log("a: ",_values.values,_options.bar_colors)
        console.log("c: ",values.values,options.bar_colors)
        const combined = values.labels.map((label, index) => ({
            label,
            value: values.values[index],
            bar_colors: options.bar_colors[index]
        }));

        combined.sort((a, b) => options.order === "asc" ? a.value - b.value : b.value - a.value);

        values.labels = combined.map(item => item.label);
        values.values = combined.map(item => item.value);
        options.bar_colors = combined.map(item => item.bar_colors);
        console.log("c: ",values.values,options.bar_colors)
    }

    // Calculate the total value
    const totalValue = values.values.reduce((acc, value) => acc + value, 0);

    // Calculate the start and end angles for each segment
    let startAngle = -90;

    for (let i = 0; i < values.values.length; i++) {
        const value = values.values[i];
        const percentage = value / totalValue;
        const endAngle = startAngle + percentage * 360;

        // Create the segment
        const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
        const startX = options.radius + options.stroke_width + options.radius * Math.cos(Math.PI * startAngle / 180);
        const startY = options.radius + options.stroke_width + options.radius * Math.sin(Math.PI * startAngle / 180);
        const endX = options.radius + options.stroke_width + options.radius * Math.cos(Math.PI * endAngle / 180);
        const endY = options.radius + options.stroke_width + options.radius * Math.sin(Math.PI * endAngle / 180);

        const pathData = `
            M ${options.radius + options.stroke_width},${options.radius + options.stroke_width}
            L ${startX},${startY}
            A ${options.radius},${options.radius} 0 ${largeArcFlag},1 ${endX},${endY}
            Z
        `;

        // Create a new path element
        const segment = document.createElementNS("http://www.w3.org/2000/svg", "path");
        segment.setAttribute("d", pathData);
        segment.setAttribute("fill", options.bar_colors[i]);
        svg.appendChild(segment);

        // Update the start angle for the next segment
        startAngle = endAngle;
    }

    // Generate the legend using the provided legend function
    const legend = lgd_legend_s(options, values, totalValue);

    return [svg, legend];
}

import { lgd_legend_s } from "../legend/standardLegend.js";

/** Circular Stacked Progress Bar
 * @param {object} _options 
 *  @property {number} radius - The radius of the circle
 *  @property {number} stroke_width - The width of the circle's stroke
 *  @property {[string]} bar_colors - The colors of the segments
 *  @property {string} text_color - The text color
 * @param {object} _values 
 *  @property {[string]} order - The order of values displayed (asc, desc, none)
 *  @property {[string]} labels - The labels
 *  @property {[number]} values - The values of the segments
 * @returns {SVGElement} - The created SVG element and the corresponding legend
 */
export function svg_StackedCircle_s(_options, _values) {
    let { radius, stroke_width, bar_colors, text_color } = _options;
    let { order, labels, values } = _values;

    const diameter = radius * 2;

    // Create a new SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", diameter + stroke_width * 2);
    svg.setAttribute("height", diameter + stroke_width * 2);

    // Apply the order to the labels and values
    if (order === "asc" || order === "desc") {
        const combined = labels.map((label, index) => ({
            label,
            value: values[index],
            bar_color: bar_colors[index]
        }));

        combined.sort((a, b) => order === "asc" ? a.value - b.value : b.value - a.value);

        labels = combined.map(item => item.label);
        _values.labels = labels
        values = combined.map(item => item.value);
        _values.values = values
        bar_colors = combined.map(item => item.bar_color);
        _options.bar_colors = bar_colors
    }

    // Calculate the total value
    const totalValue = values.reduce((acc, value) => acc + value, 0);

    // Calculate the start and end angles for each segment
    let startAngle = -90;

    for (let i = 0; i < values.length; i++) {
        const value = values[i];
        const percentage = value / totalValue;
        const endAngle = startAngle + percentage * 360;

        // Create the segment
        const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
        const startX = radius + stroke_width + radius * Math.cos(Math.PI * startAngle / 180);
        const startY = radius + stroke_width + radius * Math.sin(Math.PI * startAngle / 180);
        const endX = radius + stroke_width + radius * Math.cos(Math.PI * endAngle / 180);
        const endY = radius + stroke_width + radius * Math.sin(Math.PI * endAngle / 180);

        const pathData = `
            M ${radius + stroke_width},${radius + stroke_width}
            L ${startX},${startY}
            A ${radius},${radius} 0 ${largeArcFlag},1 ${endX},${endY}
            Z
        `;

        // Create a new path element
        const segment = document.createElementNS("http://www.w3.org/2000/svg", "path");
        segment.setAttribute("d", pathData);
        segment.setAttribute("fill", bar_colors[i]);
        svg.appendChild(segment);

        // Update the start angle for the next segment
        startAngle = endAngle;
    }

    // Generate the legend using the provided legend function
    const legend = lgd_legend_s(_options, _values, totalValue);

    return [svg, legend];
}

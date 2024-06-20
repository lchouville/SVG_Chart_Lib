import { orderValue } from "../../function/filter.js";
import { lgd_legend_s } from "../../graph/legend/standardLegend.js";

/** Circular Stacked Progress Bar
 * @param {object} _graph Object created from new graph to set properties
 * @returns {[SVGElement HTMLElement]} - The created SVG element and the corresponding legend
 */
export function svg_PieChart_s(_graph) {
    let options = { ..._graph.options };
    let values = { ..._graph.values };

    // order the value
    orderValue(options, values);

    const diameter = options.svg_radius * 2;

    // Create a new SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", diameter);
    svg.setAttribute("height", diameter);
    svg.setAttribute("viewBox", `0 0 ${diameter} ${diameter}`);

    // Calculate the total value
    const totalValue = 0


    // Calculate the start and end angles for each segment
    let startAngle = -90;

    for (let i = 0; i < values.elements.length; i++) {
        const element = values.elements[i];
        const value = element.value;
        const percentage = value / values.value_max;
        const endAngle = startAngle + percentage * 360;

        // Create the segment
        const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
        const startX = options.svg_radius + options.svg_radius * Math.cos(Math.PI * startAngle / 180);
        const startY = options.svg_radius + options.svg_radius * Math.sin(Math.PI * startAngle / 180);
        const endX = options.svg_radius + options.svg_radius * Math.cos(Math.PI * endAngle / 180);
        const endY = options.svg_radius + options.svg_radius * Math.sin(Math.PI * endAngle / 180);

        const pathData = `
            M ${options.svg_radius},${options.svg_radius}
            L ${startX},${startY}
            A ${options.svg_radius},${options.svg_radius} 0 ${largeArcFlag},1 ${endX},${endY}
            Z
        `;

        // Create a new path element
        const segment = document.createElementNS("http://www.w3.org/2000/svg", "path");
        segment.setAttribute("d", pathData);
        segment.setAttribute("fill", element.colors[0]);
        svg.appendChild(segment);

        // Update the start angle for the next segment
        startAngle = endAngle;
    }

    // Generate the legend using the provided legend function
    const legend = lgd_legend_s(options, values, values.value_max);

    return [svg, legend];
}

import { orderValue } from "../../function/filter.js";
import { lgd_legend_s } from "../legend/standardLegend.js";

/** Simple Progress Bar
 * @param {object} _graph Object created from new graph to set properties
 * @returns {[SVGElement HTMLElement]} - The created SVG element and the corresponding legend
 */
export function svg_stackedbar100_s(_graph) {
    let options = {..._graph.options}
    let values = {..._graph.values}

    // order the value
    orderValue(options,values)

    // Create a new progress bar SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", options.svg_width);
    svg.setAttribute("height", options.svg_height * 2);
    if (options.element_rounded_width[0]> options.svg_height/2){
        options.element_rounded_width[0] = options.svg_height/2;
    }
    // calculate the total value on values
    let totalValue = 0;
    let percentage = [];
    let usedWidth = 0;

    // Create the bar background
    const bar_background = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bar_background.setAttribute("width", options.svg_width);
    bar_background.setAttribute("height", options.svg_height);
    bar_background.setAttribute("fill", "darkgrey");
    bar_background.setAttribute("rx", options.element_rounded_width[0]); // Set horizontal radius for rounded corners
    bar_background.setAttribute("ry", options.element_rounded_width[0]); // Set vertical radius for rounded corners
    svg.appendChild(bar_background);

    for (const key in values.elements) {
        const element = values.elements[key];
        totalValue += element.value;
    }

    // Create bars element
    for (const key in values.elements) {
        const element = values.elements[key];
        if (key == 3) {
            break;
        }
        // get the percentage of the value represented
        percentage[key] = element.value / totalValue;
        // Size
        const barWidth = options.svg_width * percentage[key]-1;
        const barHeight = options.svg_height;
        const roundedWidth = options.element_rounded_width[0];
        let pathData;

        if (usedWidth === 0) {
            // Path data for a rectangle with rounded top-left and bottom-left corners
            pathData = `
                M${usedWidth + roundedWidth},0
                H${usedWidth + barWidth}
                V${barHeight}
                H${usedWidth + roundedWidth}
                A${roundedWidth},${roundedWidth} 0 0,1 ${usedWidth},${barHeight - roundedWidth}
                V${roundedWidth}
                A${roundedWidth},${roundedWidth} 0 0,1 ${usedWidth + roundedWidth},0
                Z
            `;
        } else if (Number(key) === values.elements.length - 1) {
            // Path data for a rectangle with rounded top-right and bottom-right corners
            pathData = `
                M${usedWidth},0
                H${usedWidth + barWidth - roundedWidth}
                A${roundedWidth},${roundedWidth} 0 0,1 ${usedWidth + barWidth},${roundedWidth}
                V${barHeight - roundedWidth}
                A${roundedWidth},${roundedWidth} 0 0,1 ${usedWidth + barWidth - roundedWidth},${barHeight}
                H${usedWidth}
                Z
            `;
        } else {
            // Path data for a regular rectangle
            pathData = `
                M${usedWidth},0
                H${usedWidth + barWidth}
                V${barHeight}
                H${usedWidth}
                Z
            `;
        }

        // Create a new path element
        const bar = document.createElementNS("http://www.w3.org/2000/svg", "path");
        bar.setAttribute("d", pathData);
        bar.setAttribute("fill", element.colors.length!=0 ? element.colors[0]:options.graph_colors[0]);

        svg.appendChild(bar);
        usedWidth += barWidth+1;

    }
    const legend = lgd_legend_s(options,values,totalValue)

    return [svg,legend];
}

import { lgd_legend_s } from "../legend/standardLegend.js";

/** Simple Progress Bar
 * @param {object} _options 
 *  @property {number} bar_width - The bar width
 *  @property {number} bar_height - The bar height
 *  @property {number} rounded_width - The rounded width
 *  @property {[string]} bar_colors - The bar main color
 *  @property {string} text_color - The text color
 * @param {object} _values 
 *  @property {[string]} order - The order of values displayed (asc, desc and none)
 *  @property {[string]} labels - The labels
 *  @property {[number]} values - The values of the bar
 * @returns {SVGElement} - The created SVG element and the corresponding legend
 */
export function svg_stackedbar100_s(_options, _values) {
    let { bar_width, bar_height,rounded_width, bar_colors,text_color} = _options
    let { order,labels, values } = _values;
    // Create a new progress bar SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", bar_width);
    svg.setAttribute("height", bar_height * 2);
    if (rounded_width> bar_height/2){
        rounded_width = bar_height/2;
    }
    // calculate the total value on values
    let value_max = 0;
    let percentage = [];
    let usedWidth = 0;

    // Create the bar background
    const bar_background = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bar_background.setAttribute("width", bar_width);
    bar_background.setAttribute("height", bar_height);
    bar_background.setAttribute("fill", "darkgrey");
    bar_background.setAttribute("rx", rounded_width); // Set horizontal radius for rounded corners
    bar_background.setAttribute("ry", rounded_width); // Set vertical radius for rounded corners
    svg.appendChild(bar_background);


    // Apply the order to the labels and values
    if (order === "asc" || order === "desc") {
        const combined = labels.map((label, index) => ({
            label,
            value: values[index],
            bar_colors: bar_colors[index]
        }));

        combined.sort((a, b) => order === "asc" ? a.value - b.value : b.value - a.value);

        labels = combined.map(item => item.label);
        _values.labels = labels
        values = combined.map(item => item.value);
        _values.values = values
        bar_colors = combined.map(item => item.bar_colors);
        _options.bar_colors = bar_colors
    }

    for (const key in values) {
        value_max += values[key];
    }

    // Create bars element
    for (const key in values) {
        if (key == 3) {
            break;
        }
        // get the percentage of the value represented
        percentage[key] = values[key] / value_max;
        // Size
        const barWidth = bar_width * percentage[key]-1;
        const barHeight = bar_height;
        const roundedWidth = rounded_width;
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
        } else if (Number(key) === values.length - 1) {
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
        bar.setAttribute("fill", bar_colors[key]);

        svg.appendChild(bar);
        usedWidth += barWidth+1;

    }
    const legend = lgd_legend_s(_options,_values,value_max)

    return [svg,legend];
}

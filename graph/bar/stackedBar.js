/** Simple Progress Bar
 * @param {object} options 
 *  @property {number} bar_width - The bar width
 *  @property {number} bar_height - The bar height
 *  @property {number} rounded_width - The rounded width
 *  @property {[string]} bar_colors - The bar main color
 *  @property {string} text_color - The text color
 * @param {object} value 
 *  @property {string} value_type - The type of value display ("/" = 10, "%" = 50%, or "" = nothing)
 *  @property {[string]} order - The order of values displayed (asc, desc and none)
 *  @property {[string]} labels - The labels
 *  @property {[number]} values - The values of the bar
 * @returns {SVGElement} - The created SVG element and the corresponding legend
 */
export function svg_stackedbar100_s(options, value) {
    // Create a new progress bar SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", options.bar_width);
    svg.setAttribute("height", options.bar_height * 2);
    if (options.rounded_width> options.bar_height/2){
        options.rounded_width = options.bar_height/2;
    }
    // calculate the total value on values
    let value_max = 0;
    let percentage = [];
    let usedWidth = 0;

    // Create the bar background
    const bar_background = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bar_background.setAttribute("width", options.bar_width);
    bar_background.setAttribute("height", options.bar_height);
    bar_background.setAttribute("fill", "darkgrey");
    bar_background.setAttribute("rx", options.rounded_width); // Set horizontal radius for rounded corners
    bar_background.setAttribute("ry", options.rounded_width); // Set vertical radius for rounded corners
    svg.appendChild(bar_background);


    // Apply the order to the labels and values
    if (value.order === "asc" || value.order === "desc") {
        const combined = value.labels.map((label, index) => ({
            label,
            value: value.values[index],
            bar_colors: options.bar_colors[index]
        }));

        combined.sort((a, b) => value.order === "asc" ? a.value - b.value : b.value - a.value);

        value.labels = combined.map(item => item.label);
        value.values = combined.map(item => item.value);
        options.bar_colors = combined.map(item => item.bar_colors);
    }

    for (const key in value.values) {
        value_max += value.values[key];
    }

    // Create bars element
    for (const key in value.values) {
        if (key == 3) {
            break;
        }
        // get the percentage of the value represented
        percentage[key] = value.values[key] / value_max;
        // Size
        const barWidth = options.bar_width * percentage[key]-1;
        const barHeight = options.bar_height;
        const roundedWidth = options.rounded_width;
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
        } else if (Number(key) === value.values.length - 1) {
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
        bar.setAttribute("fill", options.bar_colors[key]);

        svg.appendChild(bar);
        usedWidth += barWidth+1;

    }
    const legend = document.createElement("div");
    legend.setAttribute("class", "legend");
    legend.style.width = options.bar_width+"px"; // Use style property to set CSS width
    legend.style.display = "flex"; // Use style property to set CSS display
    legend.style.flexDirection = "row"; // Use style property to set CSS flex-direction
    legend.style.justifyContent = "space-between"; // Use style property to set CSS justify-content
    legend.style.flexWrap = "wrap"; // Use style property to set CSS flex-wrap
    legend.style.alignContent = "center"; // Use style property to set CSS align-content
    legend.style.alignItems = "center"; // Use style property to set CSS align-items
   
    for (const key in value.labels) {
        const li = document.createElement("div");
        li.setAttribute("class", "legend-item");
        const dot = document.createElement("span");
        dot.style.display = "inline-block"; // Use style property to set CSS display
        dot.style.width = "15px"; // Use style property to set CSS width
        dot.style.height = "15px"; // Use style property to set CSS height
        dot.style.marginRight = "5px"; // Use style property to set CSS margin-right
        dot.style.borderRadius = "50%"; // Use style property to set CSS border-radius
        dot.style.backgroundColor = options.bar_colors[key]; // Use style property to set CSS background-color
        li.appendChild(dot);

        const label = document.createElement("span");
        label.style.display = "inline-block";
        label.style.width = "auto";
        label.style.height = "15px";
        label.style.marginRight = "10px";
        label.innerHTML = value.labels[key].toUpperCase() + " ";
        label.style.fontWeight = "bold";
        label.style.color = options.text_color; // Set text color
        li.appendChild(label);
        
        const val = document.createElement("span");
        val.style.display = "inline-block";
        val.style.width = "auto";
        val.style.height = "15px";
        val.style.marginRight = "10px";
        val.innerHTML = (value.values[key] / value_max * 100) + "%";
        val.style.color = options.text_color; // Set text color
        li.appendChild(val);
        
        legend.appendChild(li);
    }
    document.body.appendChild(legend);

    return [svg,legend];
}

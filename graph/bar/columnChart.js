import { orderValue } from "../../function/filter.js";
import { lgd_legend_s } from "../legend/standardLegend.js";

/** Simple Progress Bar
 * @param {object} _graph Object created from new graph to set properties
 * @returns {[SVGElement HTMLElement]} - The created SVG element and the corresponding legend
 */
export function svg_ColumnChart_s(_graph) {
    let options = {..._graph.options}
    let values = {..._graph.values}

    // order the value
    orderValue(options,values)

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", options.svg_width);
    svg.setAttribute("height", options.svg_height);
    
    // create the background
    const graph_background = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    graph_background.setAttribute("width", options.svg_width-1);
    graph_background.setAttribute("height", options.svg_height-1);
    graph_background.setAttribute("fill", options.svg_colors[0]);
    graph_background.setAttribute("stroke", options.svg_border[1]);
    graph_background.setAttribute("stroke-width", options.svg_border[0]);
    graph_background.setAttribute("rx", options.svg_rounded_width); // Set horizontal radius for rounded corners
    graph_background.setAttribute("ry", options.svg_rounded_width); // Set vertical radius for rounded corners
    svg.appendChild(graph_background);
    
    // create the axis
    const graph_axisX = document.createElementNS("http://www.w3.org/2000/svg", "line");
    graph_axisX.setAttribute("x1", options.svg_margin[3]);
    graph_axisX.setAttribute("y1", options.svg_height-options.svg_margin[2]);
    graph_axisX.setAttribute("x2", options.svg_width-options.svg_margin[1]);
    graph_axisX.setAttribute("y2", options.svg_height-options.svg_margin[2]);
    graph_axisX.setAttribute("stroke", options.svg_colors[1]);
    graph_axisX.setAttribute("stroke-width", options.svg_border[0]);
    svg.appendChild(graph_axisX);

    const graph_axisY = document.createElementNS("http://www.w3.org/2000/svg", "line");
    graph_axisY.setAttribute("x1", options.svg_margin[3]);
    graph_axisY.setAttribute("y1", options.svg_margin[0]);
    graph_axisY.setAttribute("x2", options.svg_margin[3]);
    graph_axisY.setAttribute("y2", options.svg_height-options.svg_margin[2]);
    graph_axisY.setAttribute("stroke", options.svg_colors[1]);
    graph_axisY.setAttribute("stroke-width", options.svg_border[0]);
    svg.appendChild(graph_axisY);

    // add y value on axes
    const section = 4
    for (var i=0; i<=section; i++) {
        const fontSize = options.svg_margin[3]*0.45; // Adjust font size
        const barHeight = options.svg_height - (options.svg_margin[0]+options.svg_margin[2])
        // Create the graduation text
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", options.svg_margin[3]/2);
        // text.setAttribute("y", options.svg_height-startPoint/2-i*(options.svg_height-startPoint)/4);
        text.setAttribute("y", options.svg_margin[0]+(section-i)*(barHeight/(section)));
        text.setAttribute("fill", options.svg_colors[1]);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "middle");
        text.setAttribute("font-size", fontSize);
        text.textContent = Math.round(values.value_max*((1/(section))*i));
        svg.appendChild(text);
        // Create the graduation bar
        const bar = document.createElementNS("http://www.w3.org/2000/svg", "line");
        bar.setAttribute("x1", options.svg_margin[3]-3);
        bar.setAttribute("y1", options.svg_margin[0]+i*(barHeight/(section)));
        bar.setAttribute("x2", options.svg_margin[3]);
        bar.setAttribute("y2", options.svg_margin[0]+i*(barHeight/(section)));
        bar.setAttribute("stroke", options.svg_colors[1]);
        bar.setAttribute("stroke-width", options.svg_border[0]);
        svg.appendChild(bar);
    }
    
    // Create the bars
    for (const key in values.elements) {
        const element = values.elements[key];
        const proportion = element.value/values.value_max
        const width = (options.svg_width-(options.svg_margin[1]+options.svg_margin[3]))/values.elements.length
        const height = proportion*(options.svg_height-(options.svg_margin[0]+options.svg_margin[2]))-1
        const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bar.setAttribute("width", width);
        bar.setAttribute("height", height);
        bar.setAttribute("fill", element.colors[0]);
        // bar.setAttribute("rx", options.bar_rounded_width); // Set horizontal radius for rounded corners
        // bar.setAttribute("ry", options.bar_rounded_width); // Set vertical radius for rounded corners
        bar.setAttribute("x", options.svg_margin[3]+1+width*key);
        bar.setAttribute("y", (options.svg_height-options.svg_margin[2])-height-1);
        svg.appendChild(bar);
    }
    const legend =  lgd_legend_s(options,values,values.value_max)
    return [svg,legend];
}
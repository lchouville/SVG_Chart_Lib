import { orderValue } from "../../function/filter.js";

/** Simple Progress Bar
 * @param {object} _graph Object created from new graph to set properties
 * @returns {[SVGElement HTMLElement]} - The created SVG element and the corresponding legend
 */
export function svg_radarChart_s(_graph) {
    let options = { ..._graph.options };
    let values = { ..._graph.values };

    // order the value
    orderValue(options,values)

    const radius = options.svg_radius;
    const diameter = radius * 2;

    // Create a new SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", diameter*1.25);
    svg.setAttribute("height", diameter);
    svg.setAttribute("viewBox", `0 0 ${diameter} ${diameter}`);

    // Center of the radar chart
    const cx = radius;
    const cy = radius;

    // Number of axes (branches)
    const numAxes = values.elements.length;
    const angleStep = 360 / numAxes;

    // Create the spider cobweb
    const cobweb = document.createElementNS("http://www.w3.org/2000/svg", "g");
    cobweb.setAttribute("class", "cobweb");

    // Draw cobweb circles
    const numLevels = 10;
    for (let i = 1; i <= numLevels; i++) {
        const r = ((radius / numLevels) * i)*0.75;
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", cx);
        circle.setAttribute("cy", cy);
        circle.setAttribute("r", r);
        circle.setAttribute("stroke", i%2==0?options.svg_colors[0]:options.svg_colors[1]);
        circle.setAttribute("fill", "none");
        cobweb.appendChild(circle);
    }

    // Draw cobweb lines and axis labels
    let i = 0;
    const startAngle = -90
    for (const key in values.elements) {
        const element = values.elements[key]
        const angleDeg =  i * angleStep;
        const angle = (angleDeg + startAngle) * Math.PI / 180;

        const x = cx + (radius - radius * 0.15) * Math.cos(angle);
        const y = cy + (radius - radius * 0.15) * Math.sin(angle);
        // Line
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", cx);
        line.setAttribute("y1", cy);
        line.setAttribute("x2", x);
        line.setAttribute("y2", y);
        line.setAttribute("stroke", options.svg_colors[0]);
        cobweb.appendChild(line);
        // Label
        const labelX = cx + (radius - radius * 0.15 ) * Math.cos(angle);
        const labelY = cy + (radius - radius * 0.15 ) * Math.sin(angle);
        
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("x", labelX);
        label.setAttribute("y", labelY);
 
        // Adjust rotation to keep text upright
        let rotation = angleDeg-90;
        let angleT = angleDeg +90;
        let anchor = "end";
        let displace = -20
        
        if (angleDeg >= 180 && angleDeg <= 360) {
            rotation += 180;
            anchor = "start";
        }
        let transform =""
        if (values.elements.length>=8){
            displace/=2
            transform = `
            translate(${displace*Math.cos(angleDeg*Math.PI / 180)}, ${displace*Math.sin(angleDeg*Math.PI / 180)})
            rotate(${rotation}, ${labelX}, ${labelY})
            `;
        }else{
            anchor = "middle";
            switch (true) {
                case angleDeg <= 45 && angleDeg >= 0 
                || angleDeg >= 315 && angleDeg <= 360:
                    displace/=2
                    break;
                case angleDeg > 45 && angleDeg < 135:
                    break;
                case angleDeg >= 135 && angleDeg <= 225:
                    displace/=2
                    break;
                default:
                    break;
            }
            transform = `
            translate(${displace*Math.cos(angleT* Math.PI / 180)}, ${displace*Math.sin(angleT* Math.PI / 180)})
            `;
        }
        label.setAttribute("text-anchor", anchor);
        label.setAttribute("transform", `
        `+transform);
        label.textContent = element.label;
        label.setAttribute("fill", element.text_color);
        label.setAttribute("font-size", options.svg_radius  * 0.12);
        label.style.fontWeight = "bold";
        label.setAttribute("font-family", "sans-serif");
        label.setAttribute("dominant-baseline", "middle");
        cobweb.appendChild(label);
 
        i++;
     }

    svg.appendChild(cobweb);

    // Create radar chart path
    const radarPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let radarPoints = "";
    for (const key in values.elements) {
        const element = values.elements[key]
        const angleDeg =  key * angleStep;
        const angle = (angleDeg + startAngle) * Math.PI / 180;
        // const r = ((radius / numLevels) * i)*0.75;
        // console.log((values.values[key] / values.value_max),((radius / numLevels) * key)*0.75);
        // console.log((values.values[key] / values.value_max) * (radius));
        const r = (element.value / values.value_max) * (radius*0.75)
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        radarPoints += `${x},${y} `;
    }
    radarPath.setAttribute("d", `M ${radarPoints.trim()} Z`);
    radarPath.setAttribute("fill", options.graph_colors[1]);
    radarPath.setAttribute("stroke", options.graph_colors[0]);
    radarPath.setAttribute("stroke-width", "2");

    svg.appendChild(radarPath);

    return svg;
}

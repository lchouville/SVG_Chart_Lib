/** Simple Progress Bar
 * @param {object} options 
 *  @property {number} bar_width - The bar width
 *  @property {number} bar_height - The bar height
 *  @property {[string]} bar_color - The bar main color
 *  @property {[string]} text_color - The text color
 * @param {object} value 
 *  @property {string} value_type - The type of value display ("/" = 10, "%" = 50%, or "" = nothing)
 *  @property {[string]} labels
 *  @property {[number]} values - The values of the bar
 * @returns {SVGElement} - The created SVG element
 */
export function svg_stackedbar100_s(options, value) {
    // Create a new progress bar SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", options.bar_width);
    svg.setAttribute("height", options.bar_height);

    return svg;
}
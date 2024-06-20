/**
 * Generates an array of distinct colors, including additional colors distinct from an existing array.
 * @param {number} n The number of additional distinct colors to generate.
 * @param {string[]} existingColors An array of existing colors in HSL format.
 * @returns {string[]} An array of color strings in HSL format.
 */
export function addDistinctColors(n, existingColors) {
    const colors = existingColors.map(toHSL);
    let tColors = [...colors] // array to store the colors in hue order
    // Calculate how many colors we need to add
    const numColorsToAdd = n - colors.length;

    for (let i = 0; i < numColorsToAdd; i++) {
        // updade the slice and sort by hue order
        tColors = [...colors].sort((a, b) => a.h - b.h)
        let colorSet = 1
        console.log(tColors)
        switch (colors.length) {
            case 0:
                colors.push(toHSL("red"));
                colors.push(toHSL("green"));
                colors.push(toHSL("blue"));
                i+=2;
                break;
            case 1:
                colors.push(toHSL(`hsl(${(colors[0].h + 120) % 360}, ${colors[0].s}%, ${colors[0].l}%)`));
                colors.push(toHSL(`hsl(${(colors[0].h + 240) % 360}, ${colors[0].s}%, ${colors[0].l}%)`));
                i+=1;
                break;
            case 2:
                const color1 = colors[0];
                const color2 = colors[1];
                let midHue1 = (color1.h + color2.h) / 2;
                const midSat1 = (color1.s + color2.s) / 2
                const midLight1 = (color1.l + color2.l) /2
                if (Math.abs(color1 - color2) < 180) {
                    midHue1 = (midHue1 + 180) % 360;
                }
                colors.push(toHSL(`hsl(${midHue1}, ${midSat1}%, ${midLight1}%)`));
                break;
            default:
                // Determine colorA and colorB based on (colors.length)%3 to ensure good distribution
                let colorA
                let colorB
                switch ((i+1)%3) {
                    case 0:
                        colorA = tColors[0]
                        colorB = tColors[colors.length -2]
                        break;
                    case 1:
                        colorA = tColors[1]
                        colorB = tColors[colors.length -1]
                        break;
                    default:
                        colorA = tColors[0]
                        colorB = tColors[colors.length -1]
                        break;
                }
                console.log(i, colorA, colorB);
                
                // Calculate the midpoint hue considering the wraparound at 360 degrees
                let hueA = colorA.h;
                let hueB = colorB.h;
                let midHue2;
                
                if (Math.abs(hueA - hueB) > 180) {
                    // Handle the wraparound
                    midHue2 = ((hueA + hueB + 360) / 2) % 360;
                } else {
                    midHue2 = (hueA + hueB) / 2;
                }
                
                const midSat2 = (colorA.s + colorB.s) / 2;
                const midLight2 = (colorA.l + colorB.l) / 2;
                
                colors.push(toHSL(`hsl(${midHue2}, ${midSat2}%, ${midLight2}%)`));  
                console.log(colors);
                break;
        }
    }

    return colors.map(hsl => `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`);
}

/**
 * Converts a color to HSL format.
 * Supports named colors, hex, rgb, and rgba formats.
 * @param {string} color The color string.
 * @returns {object} The color in HSL format as an object { h, s, l }.
 */
function toHSL(color) {
    // Helper function to convert RGB to HSL
    function rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    }

    // Convert named colors and hex to RGB first
    if (color[0] === '#') {
        // Handle hex colors
        let r, g, b;
        if (color.length === 4) {
            r = parseInt(color[1] + color[1], 16);
            g = parseInt(color[2] + color[2], 16);
            b = parseInt(color[3] + color[3], 16);
        } else {
            r = parseInt(color[1] + color[2], 16);
            g = parseInt(color[3] + color[4], 16);
            b = parseInt(color[5] + color[6], 16);
        }
        return rgbToHsl(r, g, b);
    } else if (color.startsWith('rgb')) {
        // Handle rgb and rgba colors
        const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*\d+\.\d+)?\)/);
        if (match) {
            const r = parseInt(match[1], 10);
            const g = parseInt(match[2], 10);
            const b = parseInt(match[3], 10);
            return rgbToHsl(r, g, b);
        }
    } else {
        // Assume it's a named color
        const ctx = document.createElement('canvas').getContext('2d');
        ctx.fillStyle = color;
        const computedColor = ctx.fillStyle;
        if (computedColor.startsWith('#')) {
            // Convert the computed hex color to HSL
            return toHSL(computedColor);
        }
    }
    return color; // return as-is if we couldn't convert it
}

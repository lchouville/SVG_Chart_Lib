// Import the svg_ProgressBar function
import { svg_Progressbar_s,svg_Progressbar_r } from './graph/bar/progressBar.js'; // Replace './your/svg_progress_bar_module.js' with the actual path to your module
import { svg_stackedbar100_s } from './graph/bar/stackedBar.js';
// Define options for the progress bar
const options1 = {
    bar_width: 200,
    bar_height: 20,
    bar_color: 'red',
    bar_background_color: 'lightgray'
};

// Define a sample value for the progress bar
const value1 = {
    value_type: '/',
    value_max: 400,
    value: 100
};

// Create the SVG progress bar
const progressBar = svg_Progressbar_s(options1, value1);
const progressBar2 = svg_Progressbar_r(options1, value1);

// Append the SVG progress bar to a container element in the HTML document
document.body.appendChild(progressBar);
document.body.appendChild(progressBar2);


// Define options for the progress bar
const options2 = {
    bar_width: 200,
    bar_height: 20,
    bar_color: ['red', 'green', 'blue']
};

// Define a sample value for the progress bar
const value2 = {
    value_type: '/',
    label: ["css","js","html"],
    value: [10,50,40]
};
const stackedbar= svg_stackedbar100_s(options2, value2);

document.body.appendChild(stackedbar);
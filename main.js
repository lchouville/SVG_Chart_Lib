// Import the svg_ProgressBar function
import { svg_Progressbar_s } from './graph/bar/progressBar.js'; // Replace './your/svg_progress_bar_module.js' with the actual path to your module
import { svg_stackedbar100_s } from './graph/bar/stackedBar.js';
import { svg_ProgressCircle_s } from './graph/circle/progressCircle.js';
import { svg_StackedCircle_s } from './graph/circle/stackedCircle.js';
// Define options for the progress bar
const options1 = {
    bar_width: 200,
    bar_height: 20,
    rounded_width: 10,
    bar_color: 'red',
    text_color:"darkred",
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

// Append the SVG progress bar to a container element in the HTML document
document.body.appendChild(progressBar);


// Define options for the progress bar
const options2 = {
    bar_width: 275,
    bar_height: 10,
    rounded_width: 10,
    bar_colors: ['#264DE4', '#F7DF1E', '#E34F26'],
    text_color: '#454545',
};

// Define a sample value for the progress bar
const value2 = {
    value_type: 't%',
    order: 'desc',
    labels: ["css","js","html"],
    values: [10,50,40]
};
let legend;
let stackedbar;

// Assuming svg_stackedbar100_s returns an array with stackedbar as the first element and legend as the second element
[stackedbar, legend] = svg_stackedbar100_s(options2, value2);

document.body.appendChild(stackedbar);
document.body.appendChild(legend);

const options3 = {
    radius: 50,
    stroke_width: 10,
    circle_color: '#00FF00',
    circle_background_color: '#DDDDDD',
    text_color: '#000000'
};

const values3 = {
    value_type: '%',
    value_max: 100,
    value: 50
};


// Create the progress bar
const progressCircle =svg_ProgressCircle_s(options3, values3);
document.body.appendChild(progressCircle);

const options4 = {
    radius: 50,
    stroke_width: 10,
    bar_colors: ['#FF0000', '#00FF00', '#0000FF'],
    text_color: '#000000'
};

const values4 = {
    order: 'asc',
    labels: ['Red', 'Green', 'Blue'],
    values: [30, 50, 20]
};

// Create the progress bar
const [stackedCircle,legend2] =svg_StackedCircle_s(options4, values4);
document.body.appendChild(stackedCircle);
document.body.appendChild(legend2);
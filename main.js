// Import the svg_ProgressBar function
import { svg_Progressbar_s } from './graph/bar/progressBar.js'; 
import { svg_stackedbar100_s } from './graph/bar/stackedBar.js';
import { svg_ProgressCircle_s } from './graph/circle/progressCircle.js';
import { svg_StackedCircle_s } from './graph/circle/stackedCircle.js';

// Progress Chart
const valueprogress = {
    value_max: 400,
    value: 100
};
const optionsprogress1 = {
    bar_width: 200,
    bar_height: 20,
    rounded_width: 10,
    bar_color: 'red',
    bar_background_color: 'lightgray',
    text_color:"darkred",
    value_type: '/'
};
const progressBar_s = svg_Progressbar_s(optionsprogress1, valueprogress);
document.body.appendChild(progressBar_s);

const optionsprogress2  = {
    radius: 50,
    stroke_width: 10,
    circle_color: '#00FF00',
    circle_background_color: '#DDDDDD',
    text_color: '#000000',
    value_type: '%'
};
const progressCircle_s =svg_ProgressCircle_s(optionsprogress2, valueprogress);
document.body.appendChild(progressCircle_s);

// Stacked 100% Chart

const valueStacked = {
    value_type: 't%',
    order: 'desc',
    labels: ["css","js","html"],
    values: [10,50,40]
};
const optionsStacked1 = {
    bar_width: 275,
    bar_height: 10,
    rounded_width: 10,
    bar_colors: ['#264DE4', '#F7DF1E', '#E34F26'],
    text_color: '#454545',
    order:'desc'
};
const [stackedbar, legend] = svg_stackedbar100_s(optionsStacked1, valueStacked);
document.body.appendChild(stackedbar);
document.body.appendChild(legend);

const optionsStacked2 = {
    radius: 50,
    stroke_width: 10,
    bar_colors: ['#264DE4', '#F7DF1E', '#E34F26'],
    text_color: '#000000',
    order:'desc'
};
// Create the progress bar
const [stackedCircle,legend2] =svg_StackedCircle_s(optionsStacked2, valueStacked);
document.body.appendChild(stackedCircle);
document.body.appendChild(legend2);
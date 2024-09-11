# SVG_Chart_Lib
My library of SVG Charts 

## Description

## Installation

install on your repository the package using the following command:
```cmd
    npm install git+https://github.com/lchouville/SVG_Chart_Lib.git
```

## Exemple

### Bar chart
*Simple Progress Bar:* `svg_progressbar_s`<br>
<svg width="200" height="20">
    <rect width="200" height="20" fill="lightgray" rx="10" ry="10"></rect>
    <rect width="50" height="20" fill="red" rx="10" ry="10"></rect>
    <text x="100" fill="darkred" font-family="sans-serif" text-anchor="middle" font-size="17" y="16.8">
        100/400
    </text>
</svg> *with value/max*<br>
<svg width="200" height="20">
    <rect width="200" height="20" fill="#858585" rx="0" ry="0"></rect>
    <rect width="150" height="20" fill="Green" rx="0" ry="0"></rect>
    <text x="100" fill="lightGreen" font-family="sans-serif" text-anchor="middle" font-size="17" y="16.8">
        75%
    </text>
</svg> *with % not rounded*<br>

```js
const graph = newGraph()
    // Svg Options
   .setSvgWidth(200)            // Bar Width
   .setSvgHeight(20)            // Bar Height
   .setSvgColors("lightgrey")   // Background color
   // Element Options
   .setElementRoundedWidth(10)  // bar rounded width (max:bar_height/2)
   .setElementColors("red")     // Bar color
   .setTextColors("darkred")    // Text color
   .setValueType('/')           // Value type
   // Value Options
   .setValueMax(400)            // Value max
   .setValues(100)              // Value
   // Build the graph
   .build();
const progressBar_s_1 = svg_Progressbar_s(graph);
document.body.appendChild(progressBar_s_1);
// update the graph
graph.update
    .setSvgColors("#858585")
    .setElementRoundedWidth(0)
    .setElementColors("Green")
    .setTextColors("lightGreen")
    .setValueType('%')   
    .setValueMax(100)  
    .setValues(75);
const progressBar_s_2 = svg_Progressbar_s(graph);
document.body.appendChild(progressBar_s_2);
```
---

*Stacked bar 100%:* `svg_stackedbar100_s`<br>
<svg width="275" height="20">
    <rect width="275" height="10" fill="darkgrey" rx="5" ry="5"></rect>
    <path d="   M5,0
                H136.5
                V10
                H5
                A5,5 0 0,1 0,5
                V5
                A5,5 0 0,1 5,0
                Z
            " fill="#F7DF1E">
    </path>
    <path d="   M137.5,0
                H246.5
                V10
                H137.5
                Z
            " fill="#E34F26">
    </path>
    <path d="
                M247.5,0
                H269
                A5,5 0 0,1 274,5
                V5
                A5,5 0 0,1 269,10
                H247.5
                Z
            " fill="#264DE4">
    </path>
</svg>
<div class="legend" style="width: auto; display: flex; flex-flow: wrap; place-content: center space-between; align-items: center;">
    <div class="legend-item">
        <span style="display: inline-block; width: 15px; height: 15px; margin-right: 5px; border-radius: 50%; background-color: rgb(247, 223, 30);">
        </span>
        <span style="display: inline-block; width: auto; height: 15px; margin-right: 10px; font-weight: bold; color: rgb(150, 150, 150);">
            JS 
        </span>
        <span style="display: inline-block; width: auto; height: 15px; margin-right: 10px; color: rgb(150, 150, 150);">
            50%
        </span>
    </div>
    <div class="legend-item">
        <span style="display: inline-block; width: 15px; height: 15px; margin-right: 5px; border-radius: 50%; background-color: rgb(227, 79, 38);">
        </span>
        <span style="display: inline-block; width: auto; height: 15px; margin-right: 10px; font-weight: bold; color: rgb(150, 150, 150);">
            HTML 
        </span>
        <span style="display: inline-block; width: auto; height: 15px; margin-right: 10px; color: rgb(150, 150, 150);">
            40%
        </span>
    </div>
    <div class="legend-item">
        <span style="display: inline-block; width: 15px; height: 15px; margin-right: 5px; border-radius: 50%; background-color: rgb(38, 77, 228);">
        </span>
        <span style="display: inline-block; width: auto; height: 15px; margin-right: 10px; font-weight: bold; color: rgb(150, 150, 150);">
            CSS 
        </span>
        <span style="display: inline-block; width: auto; height: 15px; margin-right: 10px; color: rgb(150, 150, 150);">
            10%
        </span>
    </div>
</div><br>

```js
const options = {
    bar_width: 275,
    bar_height: 10,
    rounded_width: 10,
    bar_colors: ['#264DE4', '#F7DF1E', '#E34F26'],
    text_color: '#454545',
};

const values = {
    value_type: 't%',
    order: 'desc',
    labels: ["css","js","html"],
    values: [10,50,40]
};

const [stackedbar, legend] = svg_stackedbar100_s(options, values);

document.body.appendChild(stackedbar);
document.body.appendChild(legend);
```

### Circle chart

*Progress Circle:* `svg_ProgressCircle_s`<br>
<svg width="120" height="120">
    <circle cx="60" cy="60" r="50" stroke="#DDDDDD" stroke-width="10" fill="none"></circle>
    <circle cx="60" cy="60" r="50" stroke="#00FF00" stroke-width="10" fill="none" stroke-dasharray="314.1592653589793" stroke-dashoffset="167.55160819145564" transform="rotate(-90 60 60)"></circle>
    <text x="60" y="60" fill="#00FF00" font-family="sans-serif" font-size="25" dominant-baseline="middle" text-anchor="middle">
        47%
    </text>
</svg> *with %*<br>
<svg width="120" height="120">
    <circle cx="60" cy="60" r="50" stroke="#DDDDDD" stroke-width="10" fill="none"></circle>
    <circle cx="60" cy="60" r="50" stroke="red" stroke-width="10" fill="none" stroke-dasharray="314.1592653589793" stroke-dashoffset="157.07963267948966" transform="rotate(-90 60 60)"></circle>
    <text x="60" y="60" fill="red" font-family="sans-serif" font-size="25" dominant-baseline="middle" text-anchor="middle">
        50/100
    </text>
</svg> *with value/max*<br>

```js
const options = {
    radius: 50,
    stroke_width: 10,
    circle_color: '#00FF00',
    circle_background_color: '#DDDDDD',
    text_color: '#000000'
};

const values = {
    value_type: '%',
    value_max: 100,
    value: 50
};
// Create the progress bar
const progressCircle =svg_ProgressCircle_s(options, values);
document.body.appendChild(progressCircle);
```

---

*Stacked Circle 100%:* `svg_StackedCircle_s`<br>

<svg width="120" height="120">
    <path d="
            M 60,60
            L 60,10
            A 50,50 0 0,1 107.55282581475768,44.54915028125263
            Z
        " fill="#0000FF">
    </path>
    <path d="
            M 60,60
            L 107.55282581475768,44.54915028125263
            A 50,50 0 0,1 60,110
            Z
        " fill="#FF0000">
    </path>
    <path d="
            M 60,60
            L 60,110
            A 50,50 0 0,1 59.99999999999999,10
            Z
        " fill="#00FF00">
    </path>
</svg>

<div  class="legend" style="display: flex; flex-flow: wrap; place-content: center space-between; align-items: center;">
    <div class="legend-item">
        <span style="display: inline-block; width: 15px; height: 15px; margin-right: 5px; border-radius: 50%; background-color: rgb(0, 0, 255);"></span>
        <span style="display: inline-block; width: auto; height: 15px; margin-right: 10px; font-weight: bold; color: rgb(150, 150, 150);">
            BLUE 
        </span>
        <span style="display: inline-block; width: auto; height: 15px; margin-right: 10px; color: rgb(150, 150, 150);">
            20%
        </span>
    </div>
    <div class="legend-item">
        <span style="display: inline-block; width: 15px; height: 15px; margin-right: 5px; border-radius: 50%; background-color: rgb(255, 0, 0);"></span>
        <span style="display: inline-block; width: auto; height: 15px; margin-right: 10px; font-weight: bold; color: rgb(150, 150, 150);">
            RED 
        </span>
        <span style="display: inline-block; width: auto; height: 15px; margin-right: 10px; color: rgb(150, 150, 150);">
            30%
        </span>
    </div>
    <div class="legend-item">
        <span style="display: inline-block; width: 15px; height: 15px; margin-right: 5px; border-radius: 50%; background-color: rgb(0, 255, 0);"></span>
        <span style="display: inline-block; width: auto; height: 15px; margin-right: 10px; font-weight: bold; color: rgb(150, 150, 150);">
            GREEN 
        </span>
        <span style="display: inline-block; width: auto; height: 15px; margin-right: 10px; color: rgb(150, 150, 150);">
            50%
        </span>
    </div>
</div><br>

```js
const options = {
    radius: 50,
    stroke_width: 10,
    bar_colors: ['#FF0000', '#00FF00', '#0000FF'],
    text_color: '#000000'
};

const values = {
    order: 'asc',
    labels: ['Red', 'Green', 'Blue'],
    values: [30, 50, 20]
};

// Create the progress bar
const [stackedCircle,legend] =svg_StackedCircle_s(options, values);
document.body.appendChild(stackedCircle);
document.body.appendChild(legend);
```
---

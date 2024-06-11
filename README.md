# SVG_Chart_Lib
My library of SVG Charts 

## Description

## Installation


## All Graphics

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
    <rect width="200" height="20" fill="lightgray" rx="10" ry="10"></rect>
    <rect width="150" height="20" fill="green" rx="10" ry="10"></rect>
    <text x="100" fill="lightgreen" font-family="sans-serif" text-anchor="middle" font-size="17" y="16.8">
        75%
    </text>
</svg> *with %*<br>
<svg width="200" height="20">
    <rect width="200" height="20" fill="lightgray" rx="0" ry="0"></rect>
    <rect width="50" height="20" fill="blue" rx="0" ry="0"></rect>
    <text x="100" fill="darkblue" font-family="sans-serif" text-anchor="middle" font-size="17" y="16.8">
        25%
    </text>
</svg> *without rounded*<br>

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
<div class="legend" style="width: 275px; display: flex; flex-flow: wrap; place-content: center space-between; align-items: center;">
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

### Circle chart
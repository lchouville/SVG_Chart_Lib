// Import the svg_ProgressBar function
import { NewElement, newGraph } from './src/function/graph.js';
import { svg_ColumnChart_s } from './src/graph/bar/columnChart.js';
import { svg_Progressbar_s } from './src/graph/bar/progressBar.js'; 
import { svg_stackedbar100_s } from './src/graph/bar/stackedBar.js';
import { svg_ProgressCircle_s } from './src/graph/circle/progressCircle.js';
import { svg_PieChart_s } from './src/graph/circle/pieChart.js';
import { svg_radarChart_s } from './src/graph/circle/radarChart.js';

// Progress Chart
const graph = newGraph()
    // Svg Options
   .setSvgDim(200,20)            // Bar Width and Height
   .setSvgColors("lightgrey")   // Background color
   // Element Options
   .setElementRoundedWidth(10)  // bar rounded width (max:bar_height/2)
   .setValueType('/')           // Value type
   // Value Options
   .addElement(NewElement("",100,'red','darkred'))
   .setValueMax(400)            // Value max
   // Build the graph
   .build();
const progressBar_s_1 = svg_Progressbar_s(graph);
document.body.appendChild(progressBar_s_1);

graph.update
    .setSvgColors("#858585")
    .setElementRoundedWidth(0)
    .setValueType('%')   
    .setValueMax(100)
    .updateElement("",NewElement("",75,"green","lightGreen"));
const progressBar_s_2 = svg_Progressbar_s(graph);
document.body.appendChild(progressBar_s_2);

// Progress Circle
const graph2 = newGraph()
    // Svg Options
    .setSvgRadius(50)           // Circle radius
    .setSvgBorder([10,'#DDDDDD']) // Circle border (width/color)
    // Element Options
    .setValueType('%')          // Value type
    // Value Options
    .setValueMax(100)            // Value max
    .addElement(NewElement("",47,'#00FF00','#00FF00'))
    // Build the graph
   .build();
const progressCircle_s_1 =svg_ProgressCircle_s(graph2);
document.body.appendChild(progressCircle_s_1);

graph2.update
    .setValueType('/')
    // Value Options
    .setValueMax(400)
    .updateElement("",NewElement("",200,"red","red"));
const progressCircle_s_2 =svg_ProgressCircle_s(graph2);
document.body.appendChild(progressCircle_s_2);

// // Stacked 100% Chart

const graph3 = newGraph()
        // Svg Options
        .setSvgDim(275,10)           // Bar Width and Height
        // Element Options
        .setElementRoundedWidth(5)   // bar rounded width (max:bar_height/2)
        .setTextColor("454545")  // Text Color
        .setOrder('desc')           // Order
        // Value Options
        .setValueMax(100)            // Value max
        .addElement(NewElement("css",10,'#264DE4',''))
        .addElement(NewElement("js",50,'#F7DF1E',''))
        .addElement(NewElement("html",40,'#E34F26',''))
        // Build the graph
        .build();
const [stackedbar, legend] = svg_stackedbar100_s(graph3);
document.body.appendChild(stackedbar);
document.body.appendChild(legend);

graph3.update
    .setSvgRadius(50)   // svg radius
    .updateElement("css",NewElement("-","-","-","#264DE4"))
    .updateElement("js",NewElement("-","-","-","#F7DF1E"))
    .updateElement("html",NewElement("-","-","-","#E34F26"))
    .setOrder('asc');
const [PieChart,legend2] =svg_PieChart_s(graph3);
document.body.appendChild(PieChart);
document.body.appendChild(legend2);

graph3.update
    .setSvgDim(250,200)
    .setSvgRoundedWidth(10)
    .setSvgColors(['#454545',"white"])
    .setSvgBorder([1,'#000000'])
    .setSvgMargin([10,10,15,25])
    .updateElement("css",NewElement("-",10,"-","darkblue"))
    .updateElement("js",NewElement("-",75,"-","orange"))
    .updateElement("html",NewElement("-",15,"-","darkred"))
    .addElement(NewElement("json",6,'purple','purple'))
    .setOrder('desc');
const [barchart,legend3] = svg_ColumnChart_s(graph3);
document.body.appendChild(barchart);
document.body.appendChild(legend3);

const graph4 = newGraph()
    // Svg Options
    .setSvgRadius(150)
    .setSvgColors(['#999999','#AFAFAF'])
    // Element Options
    .setGraphColors(['rgb(120, 35, 255)','rgba(120, 35, 255, 0.5)'])
    .setTextColor('#454545') //
    // Value Options
    .setValueMax(100)
    .addElement(NewElement("css",30,'',''))
    .addElement(NewElement("js",75,'',''))
    .addElement(NewElement("html",45,'',''))
    .addElement(NewElement("json",20,'',''))
    .addElement(NewElement("sql",10,'',''))
    .setOrder('asc',"labels")
    // Build the graph
    .build();
const radarchart = svg_radarChart_s(graph4);
document.body.appendChild(radarchart)
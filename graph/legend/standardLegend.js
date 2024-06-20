export function lgd_legend_s(options,values,value_max){
    const legend = document.createElement("div");
    legend.setAttribute("class", "legend");
    // legend.style.width = options.bar_width+"px"; // Use style property to set CSS width
    legend.style.display = "flex"; // Use style property to set CSS display
    legend.style.flexDirection = "row"; // Use style property to set CSS flex-direction
    legend.style.justifyContent = "space-between"; // Use style property to set CSS justify-content
    legend.style.flexWrap = "wrap"; // Use style property to set CSS flex-wrap
    legend.style.alignContent = "center"; // Use style property to set CSS align-content
    legend.style.alignItems = "center"; // Use style property to set CSS align-items
   
    for (const key in values.elements) {
        const element = values.elements[key];
        const li = document.createElement("div");
        li.setAttribute("class", "legend-item");
        const dot = document.createElement("span");
        dot.style.display = "inline-block"; // Use style property to set CSS display
        dot.style.width = "15px"; // Use style property to set CSS width
        dot.style.height = "15px"; // Use style property to set CSS height
        dot.style.marginRight = "5px"; // Use style property to set CSS margin-right
        dot.style.borderRadius = "50%"; // Use style property to set CSS border-radius
        dot.style.backgroundColor = element.colors.length!=0 ? element.colors[0]:options.graph_colors[0]; // Use style property to set CSS background-color
        li.appendChild(dot);

        const label = document.createElement("span");
        label.style.display = "inline-block";
        label.style.width = "auto";
        label.style.height = "15px";
        label.style.marginRight = "10px";
        label.innerHTML = element.label.toUpperCase() + " ";
        label.style.fontWeight = "bold";
        label.style.color = element.text_color; // Set text color
        li.appendChild(label);
        
        const val = document.createElement("span");
        val.style.display = "inline-block";
        val.style.width = "auto";
        val.style.height = "15px";
        val.style.marginRight = "10px";
        val.innerHTML = Math.round((element.value / value_max * 100)*100)/100+ "%";
        val.style.color = element.text_color; // Set text color
        li.appendChild(val);
        
        legend.appendChild(li);
    }
    return legend;
}
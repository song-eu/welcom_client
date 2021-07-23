import React, { useEffect, useState, useCallback, useRef } from 'react';
import * as d3 from 'd3'



const CircleCart = (props) => {
    let data = [
        {nation:'Korean', value: 70},
        {nation:'Unknown', value: 20}
    ];

    useEffect(() => {
        var margin = { top: 30, right: 120, bottom: 30, left: 50 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        tooltip = { width: 100, height: 100, x: 10, y: -30 };

        var svg = d3.select("div").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + width/2 + "," + height/2+ ")");

        var pie = d3.pie()
                .sort(null)
                .value(d => d.value);
        
        var arc = d3.arc()
        .innerRadius(Math.min(width, height) / 2 - 100)
        .outerRadius(Math.min(width, height) / 2 - 1)
        .cornerRadius(15);

        var arcLabel = function(){
            const radius = Math.min(width, height) / 2 * 0.8;
            return d3.arc().innerRadius(radius).outerRadius(radius);
        }

      
        var color = d3.scaleOrdinal()
                    .domain(data.map(d => d.nation))
                    .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse())
        
        const arcs = pie(data);
             svg.append("g")
          .attr("stroke", "white")
        .selectAll("path")
        .data(arcs)
        .enter().append("path")
          .attr("fill", d => color(d.data.nation))
          .attr("d", arc)
        .append("title")
          .text(d => `${d.data.nation}: ${d.data.value.toLocaleString()}`);
    
        svg.append("g")
          .attr("font-family", "sans-serif")
          .attr("font-size", 12)
          .attr("text-anchor", "middle")
        .selectAll("text")
        .data(arcs)
        .enter().append("text")
          .attr("transform", d => `translate(${arcLabel().centroid(d)})`)
          .call(text => text.append("tspan")
              .attr("y", "-0.4em")
              .attr("font-weight", "bold")
              .text(d => data.nation))
          .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
              .attr("x", 0)
              .attr("y", "0.7em")
              .attr("fill-opacity", 0.7)
              .text(d => d.data.value.toLocaleString()));
             

    }, [])
    
    return(
        <div>

        </div>
    )

}

export default CircleCart
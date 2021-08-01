import React, { useEffect, useState, useCallback, useRef } from 'react';
import { PieChartStyle } from '../style/chartStyle';
import * as d3 from 'd3'



const CircleCart = (props) => {
    let data = [
        {nation:'Korean', value: 70},
        {nation:'Unknown', value: 20}
    ];

    useEffect(() => {
        var margin = { top: 30, right: 60, bottom: 10, left: 20 },
        width = 500 - margin.left - margin.right,
        height = 490 - margin.top - margin.bottom,
        tooltip = { width: 100, height: 100, x: 10, y: -30 },
        labelHeight = 18;

        var svg = d3.select("#pieChart").append("svg")
        //.attr("viewBox", [0,0, width + margin.left + margin.right, height + margin.top + margin.bottom])
        .attr("width", width + margin.left + margin.right)
        .attr("height", height)
        .attr("font-family", "sans-serif")
        .attr("font-size", 30)
        .attr("text-anchor", "middle")
        .append("g")
        .attr("transform", "translate(" + (width+margin.left+margin.right)/2 + "," + (height)/2 + ")");

        var pie = d3.pie()
                .sort(null)
                .value(d => d.value);
        
        var arc = d3.arc()
        .innerRadius(Math.min(width, height) / 2 - Math.min(width, height) / 4)
        .outerRadius(Math.min(width, height) / 2)
        .cornerRadius(10);

        var arcLabel = function(){
            const radius = Math.min(width, height) / 2 * 0.8;
            return d3.arc().innerRadius(radius).outerRadius(radius);
        }

        var colorInterpolator = d3.interpolate('#F2C94C','#007991')
      
        var color = d3.scaleOrdinal()
                    .domain(data.map(d => d.nation))
                    .range(d3.quantize(colorInterpolator, data.length).reverse())
        
        const arcs = pie(data);
        
        svg.append("g")
          .selectAll("path")
          .data(arcs)
          .enter().append("path")
            .attr("fill", d => color(d.data.nation))
            // Value 사이의 텀 조정
            .attr("stroke", "white")
            .attr("d", arc)
          .append("title")
            .text(d => `${d.data.nation}: ${d.data.value.toLocaleString()}`)
  
          svg.selectAll("text")
          .data(arcs)
          .enter().append("text")
            .attr("transform", d => `translate(${arcLabel().centroid(d)})`)
            .attr('dy', '0.35em')
            .call(text => text.append("tspan")
                .attr("x", 0)
                .attr("y", "-0.7em")
                .attr("font-weight", "bold")
                .text(d => data.nation))
            .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
                .attr("x", 0)
                .attr("y", "0.7em")
                .attr("fill-opacity", 0.7)
                .text(d => d.data.value.toLocaleString()));

        const legend = svg
          .append('g')
          .attr('transform', `translate(${(height/2 -margin.right)},${(-width/2)})`);

        legend
          .selectAll(null)
          .data(arcs)
          .enter()
          .append('rect')
          .attr('y', d => labelHeight * d.index * 1.8)
          .attr('width', labelHeight-2)
          .attr('height', labelHeight-2)
          .attr('fill', d => color(d.index))
          .attr('stroke', 'white')
          .style('stroke-width', '1px');

        legend
          .selectAll(null)
          .data(arcs)
          .enter()
          .append('text')
          .text(d => d.data.nation)
          .attr('x', (labelHeight-2) * 3)
          .attr('y', d => labelHeight * d.index * 1.8 + labelHeight-4)
          .style('font-family', 'sans-serif')
          .style('font-size', `${labelHeight-2}px`);
          
        console.log('arcs', arcs)

          }, [])
          
          return(
            <PieChartStyle>
              <h1>{props.header}</h1>
              <div id= "pieChart">
              </div>
            </PieChartStyle>
    )

}

export default CircleCart
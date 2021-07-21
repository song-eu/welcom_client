import React, { useEffect, useState, useCallback, useRef } from 'react';
import * as d3 from 'd3'

const DeptHorizonBarChart = (props) => {
    
    const data = [
        {name: 'a', value: 10},
        {name: 'b', value: 29},
        {name: 'c', value: 32},
        {name: 'd', value: 25},
        {name: 'e', value: 23},
        {name: 'f', value: 15}
    ];


    useEffect(() => {
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;  
        const xMaxValue = d3.max(data, (d) => d.value)
        const color = d3.scaleLinear().domain([0, xMaxValue]).range([0, 1]);

        var y = d3.scaleBand()
          .range([height, 0])
          .padding(0.1);

        var x = d3.scaleLinear()
          .range([0, width]);
        
        var svg = d3.select("div").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", 
                    "translate(" + margin.left + "," + margin.top + ")");

        x.domain([0, d3.max(data, function(d){ return d.value; })])
        y.domain(data.map(function(d) { return d.name; }));

        svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        //.attr("x", function(d) { return x(d.sales); })
        .attr("width", function(d) {return x(d.value); } )
        .attr('fill', (d) => d3.interpolateYlGn(color(d.value)))
        .attr("y", function(d) { return y(d.name); })
        .attr("height", y.bandwidth());

        svg.append("g")
         //  .attr("transform", "translate(0," + height + ")")
            .call(d3.axisTop(x));
    
        // add the y Axis
        svg.append("g")
            .call(d3.axisLeft(y));
    }, [])

    return(
        <div>
        </div>
    )
}

export default DeptHorizonBarChart;


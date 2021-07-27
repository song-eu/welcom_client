import React, { useEffect, useState, useCallback, useRef } from 'react';
import * as d3 from 'd3'
import {HorizonBarChartSytle} from '../style/chartStyle'

const DeptHorizonBarChart = (props) => {
    
    const data = [
        {name: '간담췌외과', value: 55},
        {name: '신경외과', value: 29},
        {name: '성형외과', value: 32},
        {name: '비뇨기과', value: 25},
        {name: '순환기내과', value: 23},
        {name: '정신과', value: 15},
        {name: '소아외과', value: 5},
        {name: '가정의학과', value: 40},
        {name: '치과', value: 10},
        {name: '응급의학과', value: 17},
        {name: '호흡기내과', value: 24},
        {name: '외과', value: 30}
    ];

    useEffect(() => {
        var margin = {top: 20, right: 20, bottom: 30, left: 80},
        width = 600 - margin.left - margin.right,
        height = 550 - margin.top - margin.bottom;  
        const xMaxValue = d3.max(data, (d) => d.value)
        const color = d3.scaleLinear().domain([0, xMaxValue]).range([0, 1]);

        var y = d3.scaleBand()
          .range([height, 0])
          .padding(0.1);

        var x = d3.scaleLinear()
          .range([0, width]);
        
        var svg = d3.select("#hbarchart").append("svg")
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
        <HorizonBarChartSytle>
            <h1>{props.header}</h1>
            <div id = "hbarchart">
            </div>
        </HorizonBarChartSytle>
    )
}

export default DeptHorizonBarChart;


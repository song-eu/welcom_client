import React, { useEffect, useState, useCallback, useRef } from 'react';
import {HorizonBarChartSytle} from '../style/chartStyle'
import * as d3module from 'd3'
import d3Tip from "d3-tip"

const d3 = {
  ...d3module,
  tip: d3Tip
}

const DeptHorizonBarChart = (props) => {
    
    const data = [
        {name: '신경외과', value: 29},
        {name: '성형외과', value: 32},
        {name: '비뇨기과', value: 25},
        {name: '순환기내과', value: 23},
        {name: '정신과', value: 15},
        {name: '소아외과', value: 5},
        {name: '가정의학과', value: 40},
        {name: '응급의학과', value: 17},
        {name: '호흡기내과', value: 24},
        {name: '외과', value: 30}
    ];
    data.sort((a, b) => {
        return a.value < b.value? -1 : a.value > b.value ? 1: 0;
    })

    useEffect(() => {
        var margin = {top: 20, right: 20, bottom: 30, left: 80},
        width = 500 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;  
        const xMaxValue = d3.max(data, (d) => d.value)
        const color = d3.scaleLinear().domain([0, xMaxValue]).range([0, 0.6]);

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

        function onMouseOver(d, i) {
            console.log(d)
            let pos = d3.select(this).node().getBoundingClientRect();
            let tipNodeWidth = d3.selectAll('#depToolTip').node().getBoundingClientRect().width
    
            tip.show(i, this)
            console.log('pos?', pos)
            console.log('depToolTip',d3.selectAll('#depToolTip').node().getBoundingClientRect() )

            //tip.style('left',`${pos['x']+pos['width']  } px`)
            //
            tip.style('left', `${(pos['width'] < tipNodeWidth+20 ?
                             pos['right'] : pos['right'] - tipNodeWidth - 20)}px`)
                .style('top', `${(window.pageYOffset + pos['y'] - 4)}px`)  

    
            d3.select(this)
            .transition()
            .duration(100)
            //.attr('fill', d3.interpolateSpectral(color(0.8))) #ffc500
            .attr('fill', '#ffc500')
        }
                

        const tip = d3.tip()
        .attr("class", "depToolTip")
        .attr("id", "depToolTip")
        .style('padding', '12px')
        //.style('background', 'rgba(0, 0, 0, 0.8)')
        .style('color', 'Black')
        .html((d) => {
            //console.log(d)
            return "<strong>"+ d.name + " : </strong> <span style='color:red'>" + d.value + " 명 </span>";
        })
        //.style("display", "inline-block") 
        // .style('left', d3.select(this).attr("cx") + "px")
        // .style('top', d3.select(this).attr("cy") + "px")
        // .style("left",(d) => xScale(d.male)  + "px")
        // .style("top", (d) => yScale(d.group)+ "px")
        //.offset([-10, 0])
            
        svg.call(tip)

        x.domain([0, d3.max(data, function(d){ return d.value; })])
        svg.append("g")
        //  .attr("transform", "translate(0," + height + ")")
            //.call(d3.axisTop(x));
        
    
        y.domain(data.map(function(d) { return d.name; }));
        // add the y Axis
        svg.append("g")
        .call(d3.axisLeft(y));
            
        var bar = svg.selectAll(".bar")
        .data(data)
        
        
        bar.enter().append("rect")
        .attr("class", "bar")
        //.attr("x", function(d) { return x(0); })
        //.attr("width", function(d) {return x(0) - width; } )
        //.attr('fill', (d) => d3.interpolateYlGn(color(d.value)))
        //.attr('fill', '#69b3a2')
        .on('mouseover', onMouseOver)
        .on('mouseleave', function (actual, i) {
            tip.hide()
            d3.select(this)
            .transition()
            .duration(300)
            .attr('fill', ({ value }) => d3.interpolateGnBu(color(value)))

          })
        .attr("x", x(0))
        .attr("y", function(d) { return y(d.name); })
        .attr("height", y.bandwidth())
        .transition()
        .duration(2000)
        .attr('width', (d) => x(d.value))
        .attr('fill', ({ value }) => d3.interpolateGnBu(color(value)))
        .delay(function(d,i){return(-i*50)})

        //.attr("height", function(d) { return height - y(0); }) // always equal to 0
        //.attr("y", function(d) { return y(0); })
        

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


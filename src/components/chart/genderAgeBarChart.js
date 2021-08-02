import React, { useEffect, useState, useCallback, useRef } from 'react';
import * as d3 from 'd3'
import {GenderChartSytle} from '../style/chartStyle'

const GenderAgeBarChart = (props) => {
    const data = [
        {name: '0-10', category: 'male', value: 10},
        {name: '0-10', category: 'female', value: 29},
        {name: '11-20', category: 'male', value: 32},
        {name: '11-20', category: 'female', value: 25},
        {name: '21-30', category: 'male', value: 23},
        {name: '21-30', category: 'female', value: 15},
        {name: '31-40', category: 'male', value: 10},
        {name: '31-40', category: 'female', value: 29},
        {name: '41-50', category: 'male', value: 32},
        {name: '41-50', category: 'female', value: 25},
        {name: '51-60', category: 'male', value: 23},
        {name: '51-60', category: 'female', value: 15},
        {name: '61-70', category: 'male', value: 32},
        {name: '61-70', category: 'female', value: 25},
        {name: '71-80', category: 'male', value: 23},
        {name: '71-80', category: 'female', value: 15},
        {name: '81-90', category: 'male', value: 32},
        {name: '81-90', category: 'female', value: 25},
    ];
    const width = 500;
    //const height = 550;
   // const margin = {top: 40, left: 40, bottom: 40, right: 40};
   console.log('props.header', props.header)

    useEffect(() => {

        const margin = ({top: 40, right: 30, bottom: 40, left: 50})

        Object.assign(data, {
            format: ".0%",
            male: "← Male",
            female: "female →",
            males: ["male"],
            females: ["female"]
          });
        let signs = new Map([].concat(
            data.males.map(d => [d, -1]),
            data.females.map(d => [d, +1])
        ))

        let bias = d3.rollups(data, v => d3.sum(v, d => d.value * Math.min(0, signs.get(d.category))), d => d.name)
               //  .sort(([, a], [, b]) => d3.ascending(a, b))

        let series = d3.stack()
                .keys([].concat(data.males.slice().reverse(), data.females))
                .value(([, value], category) => signs.get(category) * (value.get(category) || 0))
                .offset(d3.stackOffsetDiverging)
                (d3.rollups(data, data => d3.rollup(data, ([d]) => d.value, d => d.category), d => d.name))
        
        //const height = bias.length * 33 + margin.top + margin.bottom
        const height = bias.length * 40 + margin.top + margin.bottom
        
        var formatValue = (x) => {
            return (Math.abs(x));
          }

        var x = d3.scaleLinear()
            //최소값, 최대값 배열로 보내줌 -> [-32, 29]
            .domain(d3.extent(series.flat(2)))
            .rangeRound([margin.left, width - margin.right]);
     
        
        var y = d3.scaleBand()
            .domain(bias.map(([name]) => name))
            .rangeRound([margin.top, height - margin.bottom])
            .padding(2 / 20);

        // var color = d3.scaleOrdinal()
        //        .domain([].concat(data.males, data.females))
        //        .range(d3.schemeSpectral[data.males.length + data.females.length]);
       var color = (x) => {
           return x==='male'? '#355C7D':'#C06C84'
       } 

        var xAxis = g => g
        .attr("transform", `translate(0,${margin.top})`)
        .call(d3.axisTop(x)
            .ticks(width / 80)
            .tickFormat(formatValue)
            .tickSizeOuter(0))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
            .attr("x", x(0) + 60) // male, femail top arrow location
            .attr("y", -24)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(data.female))
        .call(g => g.append("text")
            .attr("x", x(0) - 60)
            .attr("y", -24)
            .attr("fill", "currentColor")
            .attr("text-anchor", "end")
            .text(data.male))

        var yAxis = g => g
            .attr("transform", `translate(${x(0)},0)`)
            .call(d3.axisLeft(y).tickSizeOuter(0))
            // .call(g => g.selectAll(".tick")
            //         .data(bias)
            //         .attr("transform", ([name, max]) => `translate(${x(0)},${y(name) + y.bandwidth() / 2})`))

            




        const svg = d3.select("#negBarChart").append(("svg"))
          // .attr("viewBox", [0, 0, width, height]);
          .style('width', width)
          .style('height', height);

        console.log('data series', series)
        svg.append("g")
            .selectAll("g")
            .data(series)
            .join("g")
            .attr("fill", d => color(d.key))
            .selectAll("rect")
            .data(d => d.map(v => Object.assign(v, {key: d.key})))
            .join("rect")
            .attr("x", d => x(d[0]))
            .attr("y", ({data: [name]}) => y(name))
            .attr("width", d => x(d[1]) - x(d[0]))
            .attr("height", y.bandwidth())
            .append("title")
        //     .text(({key, data: [name, value]}) => `${name}
        // ${formatValue(value.get(key))} ${key}`);
        
        svg.append("g")
            .call(xAxis);
        
        svg.append("g")
            .call(yAxis);
        
    }, [])
    return (
        <GenderChartSytle>
            <h1>{props.header}</h1>
            <div id = "negBarChart">
            </div>
        </GenderChartSytle>
    )
}

export default GenderAgeBarChart;

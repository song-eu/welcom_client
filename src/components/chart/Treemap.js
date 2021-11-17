import React, { useEffect, useState, useCallback, useRef } from 'react'
import { MonthlyBarChartStyle } from '../style/chartStyle'
import * as d3module from 'd3'
import d3Tip from 'd3-tip'

import { sampleData } from '../../sampledata/barData'

const d3 = {
    ...d3module,
    tip: d3Tip,
}
const Treemap = (props) => {
    const svgRef = useRef()
    useEffect(() => {
        const hierarchy = d3.hierarchy(dataset)
        .sum(d=>d.value)  //sums every child values
        .sort((a,b)=>b.value-a.value), // and sort them in descending order 

treemap = d3.treemap()
      .size([500, 450])
      .padding(1),

root = treemap(hierarchy);

const categories = dataset.children.map(d=>d.name),      

colors = ['#1C1832', '#9E999D', '#F2259C', '#347EB4', 
      '#08ACB6', '#91BB91', '#BCD32F', '#75EDB8',
      "#89EE4B", '#AD4FE8', '#D5AB61', '#BC3B3A',
      '#F6A1F9', '#87ABBB', '#412433', '#56B870', 
      '#FDAB41', '#64624F'],

colorScale = d3.scaleOrdinal() // the scale function
        .domain(categories) // the data
        .range(colors);    // the way the data should be shown             

const svg = d3.select("svg"); //make sure there's a svg element in your html file

svg.selectAll("rect")
 .data(root.leaves())
 .enter()
 .append("rect")
 .attr("x", d=>d.x0)
 .attr("y", d=>d.y0)
 .attr("width",  d=>d.x1 - d.x0)
 .attr("height", d=>d.y1 - d.y0)
 .attr("fill", d=>colorScale(d.data.category));
}                


    }, [])

    return (
        <MonthlyBarChartStyle>
            <h1>Tree Map</h1>
            <div id="treeMapChar" ref={svgRef}></div>
            <div id="tooltipTree"></div>
        </MonthlyBarChartStyle>
    )
}

export default Treemap

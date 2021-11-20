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

    const margin = { top: 10, right: 10, bottom: 10, left: 10 },
        width = 445 - margin.left - margin.right,
        height = 445 - margin.top - margin.bottom

    useEffect(() => {
        const dataset = sampleData.circleCharData.data1

        const categories = dataset.map((d) => d.nation),
            colors = [
                '#1C1832',
                '#9E999D',
                '#F2259C',
                '#347EB4',
                '#08ACB6',
                '#91BB91',
                '#BCD32F',
                '#75EDB8',
                '#89EE4B',
                '#AD4FE8',
                '#D5AB61',
                '#BC3B3A',
                '#F6A1F9',
                '#87ABBB',
                '#412433',
                '#56B870',
                '#FDAB41',
                '#64624F',
            ],
            colorScale = d3
                .scaleOrdinal() // the scale function
                .domain(categories) // the data
                .range(colors) // the way the data should be shown

        const svg = d3
            .select(svgRef.current) //make sure there's a svg element in your html file
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate ( ${margin.left}, ${margin.right})`)

        const root = d3
            .stratify()
            .id((d) => d.nation)
            .parentId((d) => d.parent)(dataset)

        root.sum(function (d) {
            return +d.value
        })

        d3.treemap().size([width, height]).padding(4)(root)

        svg.selectAll('rect')
            .data(root.leaves())
            .enter()
            .append('rect')
            .attr('x', (d) => d.x0)
            .attr('y', (d) => d.y0)
            .attr('width', (d) => d.x1 - d.x0)
            .attr('height', (d) => d.y1 - d.y0)
            .attr('fill', (d) => {
                console.log('color', colorScale(d.data.nation), d.data)
                return colorScale(d.data.nation)
            })

        svg.selectAll('text')
            .data(root.leaves())
            .join('text')
            .attr('x', (d) => d.x0 + 10)
            .attr('y', (d) => d.y0 + 20)
            .text((d) => d.data.nation)
            .attr('font-size', '15px')
            .attr('fill', 'black')
    }, [])

    return (
        <div>
            <h1>Tree Map</h1>
            <div id="treeMapChar" ref={svgRef}></div>
            <div id="tooltipTree"></div>
        </div>
    )
}

export default Treemap

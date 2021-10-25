import React, { useEffect, useState, useCallback, useRef } from 'react'
import { PieChartStyle } from '../style/chartStyle'
import * as d3module from 'd3'
import d3Tip from 'd3-tip'
import * as d3Legend from 'd3-svg-legend'
import { sampleData } from '../../sampledata/barData'

const d3 = {
    ...d3module,
    tip: d3Tip,
}

const CircleCart = (props) => {
    var margin = { top: 30, right: 80, bottom: 30, left: 80 },
        width = 660 - margin.left - margin.right,
        height = 660 - margin.top - margin.bottom,
        labelHeight = 18
    const [data, setData] = useState(sampleData.circleCharData.data1)
    const { header, selectData } = props
    const svgRef = useRef()

    useEffect(() => {
        if (selectData != null) {
            setData(sampleData.circleCharData[selectData])
        }

        var svg = d3
            .select('#pieChart')
            .call((g) => g.select('svg').remove())
            .append('svg')
            //.attr("viewBox", [height/2, width/2, width + margin.left + margin.right, height + margin.top + margin.bottom])
            .attr('width', width + margin.left + margin.right)
            .attr('height', height)
        // .attr("font-family", "sans-serif")
        // .attr("font-size", 30)
        // .attr("text-anchor", "middle")
        const graph = svg
            .append('g')
            .attr(
                'transform',
                `translate(${width / 2 + 20} , ${height / 2 + 5})`
            )

        var pie = d3
            .pie()
            .sort(null)
            .value((d) => d.value)

        var arc = d3
            .arc()
            .innerRadius(
                Math.min(width, height) / 2 - Math.min(width, height) / 4
            )
            .outerRadius(Math.min(width, height) / 2)
            .cornerRadius(10)

        var arcLabel = function () {
            const radius = (Math.min(width, height) / 2) * 0.8
            return d3.arc().innerRadius(radius).outerRadius(radius)
        }

        var colorInterpolator = d3.interpolate('#F2C94C', '#007991')

        var color = d3
            .scaleOrdinal(d3['schemeSet2'])
            .domain(data.map((d) => d.nation))
        //.range(d3.quantize(colorInterpolator, data.length).reverse())
        // Tooltip
        const tip = d3
            .tip()
            .attr('class', 'toolTipC')
            .attr('id', 'toolTipC')
            .style('padding', '10px')
            .style('background', '#444')
            .style('color', 'rgb(238, 148, 75)')
            .style('border-radius', '4px')
            .html((d) => {
                let content = `<div class="name">${d.data.nation}</div>`
                content += `<div class="cost">${d.value}</div>`
                //content += `<div class="delete">Click slice to delete</div>`;
                //console.log('tooltip check', d)
                return content
            })

        graph.call(tip)

        const arcs = pie(data)
        // Animation
        const arcTweenEnter = (d) => {
            let i = d3.interpolate(d.endAngle, d.startAngle)

            return function (t) {
                d.startAngle = i(t)
                return arc(d)
            }
        }

        const path = graph
            .selectAll('path')
            .data(pie(data))
            .join(
                (enter) => enter.append('g'),
                (update) => update.attr('class', 'update'),
                (exit) => exit.remove()
            )

        path.append('path')
            .attr('class', 'arc')
            .attr('d', arc)
            .attr('fill', (d) => color(d.data.nation))
            .attr('stroke', 'white')
            .attr('stroke-width', 3)
            .on('mouseover', function (d, i, n) {
                //console.log(d, n, i)
                tip.show(i, this)
                //d3.selectAll('arc').attr('opacity', 0.6)

                d3.select(this)
                    .transition('changeSliceFill')
                    .duration(100)
                    .attr('opacity', 0.6)
            })
            .on('mouseleave', function (actual, i) {
                tip.hide()
                //d3.selectAll('arc').attr('opacity', 1)

                d3.select(this).transition().duration(300).attr('opacity', 1)
            })
            .transition()
            .duration(750)
            .attrTween('d', arcTweenEnter)
            .delay(function (d, i) {
                //console.log(i) ;
                return i * 50
            })

        // Legend setup
        const legendGroup = svg
            .append('g')
            .attr('transform', `translate(${width + 35}, 30)`)

        const legend = d3Legend
            .legendColor()
            .shape('circle')
            .shapePadding(10)
            .scale(color)

        // update and call legend
        legendGroup.call(legend)
        // text white
        legendGroup.selectAll('text').attr('fill', '#373737')

        // svg.append("g")
        //   .selectAll("path")
        //   .data(arcs)
        //   .enter().append("path")
        //     .attr("fill", d => color(d.data.nation))
        //     // Value 사이의 텀 조정
        //     .attr("stroke", "white")
        //     .attr("d", arc)
        //   .append("title")
        //     .text(d => `${d.data.nation}: ${d.data.value.toLocaleString()}`)

        //   svg.selectAll("text")
        //   .data(arcs)
        //   .enter().append("text")
        //     .attr("transform", d => `translate(${arcLabel().centroid(d)})`)
        //     .attr('dy', '0.35em')
        //     .call(text => text.append("tspan")
        //         .attr("x", 0)
        //         .attr("y", "-0.7em")
        //         .attr("font-weight", "bold")
        //         .text(d => data.nation))
        //     .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
        //         .attr("x", 0)
        //         .attr("y", "0.7em")
        //         .attr("fill-opacity", 0.7)
        //         .text(d => d.data.value.toLocaleString()));

        // const legend = svg
        //   .append('g')
        //   .attr('transform', `translate(${(height/2 -margin.right)},${(-width/2)})`);

        // legend
        //   .selectAll(null)
        //   .data(arcs)
        //   .enter()
        //   .append('rect')
        //   .attr('y', d => labelHeight * d.index * 1.8)
        //   .attr('width', labelHeight-2)
        //   .attr('height', labelHeight-2)
        //   .attr('fill', d => color(d.index))
        //   .attr('stroke', 'white')
        //   .style('stroke-width', '1px');

        // legend
        //   .selectAll(null)
        //   .data(arcs)
        //   .enter()
        //   .append('text')
        //   .text(d => d.data.nation)
        //   .attr('x', (labelHeight-2) * 3)
        //   .attr('y', d => labelHeight * d.index * 1.8 + labelHeight-4)
        //   .style('font-family', 'sans-serif')
        //   .style('font-size', `${labelHeight-2}px`);

        // console.log('arcs', arcs)
    }, [data, selectData])

    return (
        <PieChartStyle>
            <h1>{header}</h1>
            <div id="pieChart" ref={svgRef}></div>
        </PieChartStyle>
    )
}

export default CircleCart

import React, { useEffect, useState, useCallback, useRef } from 'react'
import { StackChartStyle } from '../style/chartStyle'
import * as d3module from 'd3'
import d3Tip from 'd3-tip'

import { sampleData } from '../../sampledata/barData'
import csvToData from '../../modules/csvDataRead'

const d3 = {
    ...d3module,
    tip: d3Tip,
}

const StackedBarChart = (props) => {
    const width = 680
    const height = 500
    const margin = { top: 40, left: 20, bottom: 40, right: 20 }
    const svgRef = useRef()

    // 소아 암병원 어린이 본원 강남 ? 소아?
    var data1 = sampleData.data1
    var data2 = sampleData.data2
    const [data, setData] = useState(data1)

    var metaData = [
        { name: 'NAME' },
        // { name: '소아' },
        { name: '본원' },
        { name: '암병원' },
        { name: '어린이' },
        { name: '강남' },
    ]
    var col = metaData
        .map((d, i) => {
            return d.name
        })
        .slice(1)

    useEffect(async () => {
        let realdata = await csvToData(props.data)
        var svg = d3
            .select('#stackBarchart')
            .append('svg')
            //.attr('width', 1000)
            .attr('width', width + margin.left)
            .attr('height', height)
            // .attr('viewbox', [0, 0, width * 2 + margin.left, height * 2])
            .append('g')
            .attr('transform', 'translate(' + margin.left + ', 0)')

        var stack = d3.stack().keys(col)

        const dataset = stack(realdata)
        //console.log('Stack dataset???', dataset)

        var x = d3
            .scaleBand()
            .domain(dataset[0].map((d) => d.data.NAME))
            .range([margin.left, width - margin.left * 0.3])
            .padding(0.3)

        var y = d3
            .scaleLinear()
            .domain([
                0,
                d3.max(dataset, function (d) {
                    return d3.max(d, function (d) {
                        //console.log(d, 'd', d[0], d[1])
                        return d[1]
                        //return d[0] + d[1]
                    })
                }),
            ])
            .nice()
            .range([height - margin.bottom, margin.top])

        var colors = [
            '#C2E88D',
            '#86A8E7',
            '#FE88A0',
            '#6EDAD7',

            // '#6b6b83',
            // '#86A8E7',
            // '#6dd5ed',
            // '#00B4DB',
            //    '#91EAE4',
            //'#FBD786', pastel yellow
            // '#99f2c8', light green
            //'#ffdde1', baby pink
            //'#D6A4A4', dark rose
            //'#50E3C2', light green more dark
        ]

        var yAxis = (g) =>
            g
                .attr('transform', `translate(${margin.left}, 0)`)
                .call((g) => g.select('.domain').remove())
                //y axis grid 추가
                .append('g')
                .attr('class', 'stack_grid')
                //.attr('display', 'none')
                .call(
                    d3
                        .axisLeft()
                        .scale(y)
                        .tickSize(-width, 0, 0)
                        .tickFormat('')
                        .tickSizeOuter(0)
                    //.tickSizeInner(0)
                )

        var xAxis = (g) =>
            g
                .attr('transform', `translate(0, ${height - margin.bottom})`)
                .call(d3.axisBottom(x).tickSizeOuter(0))

        svg.append('g').call(xAxis)
        svg.append('g')
            .call(yAxis)
            .call(
                (g) =>
                    g
                        .selectAll('.tick:not(:first-of-type) line')
                        .attr('class', 'stack_axis_y_tick')
                        .attr('stroke', '#bdc3c7')
                //.attr('display', 'none')
            )
            .call((g) => g.select('path').remove())

        const tip = d3
            .tip()
            .attr('class', 'stackToolTip')
            .attr('id', 'stackToolTip')
            .style('padding', '12px')
            //.style('background', 'rgba(0, 0, 0, 0.8)')
            .style('color', 'Black')
            .html((d) => {
                //console.log(d)
                return (
                    '<strong>' +
                    d.name +
                    " : </strong> <span style='color:red'>" +
                    d.value +
                    ' 명 </span>'
                )
            })

        // ----------------
        // Highlight a specific subgroup when hovered
        // ----------------

        // What happens when user hover a bar
        var mouseover = function (d, i) {
            // Tooltip
            //console.log(d)
            let pos = d3.select(this).node().getBoundingClientRect()
            var subGroupName = d3.select(this.parentNode).datum().key // This was the tricky part

            let tipNodeWidth = d3
                .selectAll('#stackToolTip')
                .node()
                .getBoundingClientRect().width

            tip.html((d) => {
                //console.log(d)
                return (
                    '<strong>' +
                    subGroupName +
                    " : </strong> <span style='color:red'>" +
                    i.data[subGroupName].toLocaleString('ko-KR') +
                    ' 명 </span>'
                )
            }).show(i, this)

            //
            tip.style('x', `${pos['right']}px`).style(
                'top',
                `${window.pageYOffset + pos['y'] - 4}px`
            )
            // Tooltip end

            d3.selectAll('.myRect').style('opacity', 0.2)

            // Highlight all rects of this subgroup with opacity 1. It is possible to select them since they have a specific class = their name.
            d3.selectAll('.' + subGroupName).style('opacity', 1)
        }

        // When user do not hover anymore
        var mouseleave = function (d) {
            // Back to normal opacity: 0.8
            tip.hide()
            d3.selectAll('.myRect').style('opacity', 1)
        }
        svg.call(tip)
        var groups = svg
            .selectAll('g.cols')
            .data(dataset)
            .enter()
            .append('g')
            .attr('class', (d) => 'myRect ' + d.key)
            .style('fill', function (d, i) {
                return colors[i]
            })

        var rect = groups
            .selectAll('rect')
            .data(function (d) {
                return d
            })
            .enter()
            .append('rect')
            .attr('x', function (d) {
                return x(d.data.NAME)
            })
            .attr('y', function (d) {
                return height - margin.bottom
            })
            // .attr('height', function (d) {
            //     return 0
            // })
            .attr('width', x.bandwidth())
            .on('mouseover', mouseover)
            .on('mouseleave', mouseleave)
            .transition()
            .duration(800)
            .attr('y', function (d) {
                return y(d[1])
            })
            .attr('height', function (d) {
                return y(d[0]) - y(d[1])
            })

        // Draw legend
        var legendItemSize = 12
        var legendSpacing = 4
        var xOffset = 30

        var legend = d3
            .select('#legendStack')
            .append('svg')
            .attr('width', '150px')
            .attr('height', '100px')
            .selectAll('.legendItem')
            .data(colors)

        legend
            .enter()
            .append('rect')
            .attr('width', legendItemSize)
            .attr('height', legendItemSize)
            .style('fill', function (d, i) {
                return colors.slice()[i]
            })
            .attr('transform', (d, i) => {
                var x = legendItemSize + xOffset
                var y = (legendItemSize + legendSpacing) * i
                return `translate(${x}, ${y})`
            })

        legend
            .enter()
            .append('text')
            .style('text-anchor', 'start')
            .style('fill', '#fff')
            .attr('x', xOffset + legendItemSize + 20)
            .attr('y', (d, i) => (legendItemSize + legendSpacing) * i + 15)
            .text(function (d, i) {
                return col[i]
            })
    }, [])

    return (
        <StackChartStyle>
            <h1>{props.header}</h1>
            <div id="barchartbody">
                <div id="stackBarchart" ref={svgRef}></div>
                <div id="legendStack"></div>
            </div>
        </StackChartStyle>
    )
}

export default StackedBarChart

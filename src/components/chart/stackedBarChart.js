import React, { useEffect, useState, useCallback, useRef } from 'react'
import { MonthlyBarChartStyle } from '../style/chartStyle'
import * as d3module from 'd3'
import d3Tip from 'd3-tip'

import { sampleData } from '../../sampledata/barData'
import GenderAgeDivergingChart from './genderAgeDiverging'
import { act } from 'react-dom/cjs/react-dom-test-utils.production.min'

const d3 = {
    ...d3module,
    tip: d3Tip,
}

const StackedBarChart = (props) => {
    const width = 800
    const height = 500
    const margin = { top: 40, left: 20, bottom: 40, right: 20 }

    var sample = [
        {
            NAME: '2013-01',
            소아: 53,
            강남: 100,
            어린이: 425,
            암병원: 153,
            본원: 975,
        },
        {
            NAME: '2013-02',
            소아: 165,
            강남: 134,
            어린이: 54,
            암병원: 463,
            본원: 243,
        },
        {
            NAME: '2013-03',
            소아: 269,
            강남: 125,
            어린이: 345,
            암병원: 143,
            본원: 865,
        },
        {
            NAME: '2013-04',
            소아: 344,
            강남: 145,
            어린이: 730,
            암병원: 16,
            본원: 574,
        },
        {
            NAME: '2013-05',
            소아: 376,
            강남: 435,
            어린이: 366,
            암병원: 565,
            본원: 194,
        },
        {
            NAME: '2013-06',
            소아: 410,
            강남: 843,
            어린이: 414,
            암병원: 385,
            본원: 159,
        },
        {
            NAME: '2013-07',
            소아: 421,
            강남: 354,
            어린이: 30,
            암병원: 983,
            본원: 367,
        },
        {
            NAME: '2013-08',
            소아: 405,
            강남: 76,
            어린이: 70,
            암병원: 741,
            본원: 95,
        },
        {
            NAME: '2013-09',
            소아: 376,
            강남: 43,
            어린이: 658,
            암병원: 489,
            본원: 915,
        },
        {
            NAME: '2013-10',
            소아: 359,
            강남: 965,
            어린이: 308,
            암병원: 237,
            본원: 761,
        },
        {
            NAME: '2013-11',
            소아: 392,
            강남: 347,
            어린이: 970,
            암병원: 290,
            본원: 25,
        },
        {
            NAME: '2013-12',
            소아: 433,
            강남: 107,
            어린이: 64,
            암병원: 79,
            본원: 691,
        },
        {
            NAME: '2014-01',
            소아: 455,
            강남: 560,
            어린이: 686,
            암병원: 205,
            본원: 452,
        },
        {
            NAME: '2014-02',
            소아: 478,
            강남: 501,
            어린이: 820,
            암병원: 460,
            본원: 637,
        },
    ]
    // 소아 암병원 어린이 본원 강남 ? 소아?
    var data = sample
    //console.log('data?'. data, sampleData)
    //var data = sampleData
    var metaData = [
        { name: 'NAME' },
        { name: '소아' },
        { name: '강남' },
        { name: '어린이' },
        { name: '암병원' },
        { name: '본원' },
    ]
    var col = metaData
        .map((d, i) => {
            return d.name
        })
        .slice(1)
    // adding total column
    // data = data.map((d) => {
    //     var sum = 0
    //     col.forEach((v, i) => {
    //         sum = sum + d[v]
    //     })
    //     return { ...d, TOTAL: sum }
    // })

    useEffect(() => {
        var svg = d3
            .select('#stackBarchart')
            .append('svg')
            //.attr('width', 1000)
            .attr('width', width + margin.left)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ', 0)')

        var stack = d3.stack().keys(col)

        const dataset = stack(data)

        //console.log('dataset', dataset)

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
            '#6b6b83',
            '#86A8E7',
            '#6dd5ed',
            '#00B4DB',
            //'#DAE2F8',
            '#91EAE4',
            //'#FBD786', pastel yellow
            // '#99f2c8', light green
            //'#ffdde1', baby pink
            //'#D6A4A4', dark rose
            //'#50E3C2', light green more dark
        ]

        var yAxis = (g) =>
            g
                .attr('transform', `translate(${margin.left}, 0)`)
                //.call(d3.axisLeft(y))
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
            // what subgroup are we hovering?
            //console.log('d?', d, 'col', col, this.parentNode)
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
                    i.data[subGroupName] +
                    ' 명 </span>'
                )
            }).show(i, this)
            //console.log('pos?', pos)
            //console.log('depToolTip',d3.selectAll('#depToolTip').node().getBoundingClientRect() )

            //tip.style('left',`${pos['x']+pos['width']  } px`)
            //
            tip.style(
                'left',
                `${
                    pos['width'] < tipNodeWidth + 20
                        ? pos['right']
                        : pos['right'] - tipNodeWidth - 20
                }px`
            ).style('top', `${window.pageYOffset + pos['y'] - 4}px`)
            // Tooltip end

            //var subgroupValue = d.data[subgroupName]
            //console.log('subgroupName: ', subGroupName)
            // // Reduce opacity of all rect to 0.2
            // d3.selectAll('.myRect').style('opacity', 0.2)
            // // Highlight all rects of this subgroup with opacity 0.8. It is possible to select them since they have a specific class = their name.
            // d3.selectAll('.' + subgroupName).style('opacity', 1)
            // Reduce opacity of all rect to 0.2
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
                //console.log('d NAME?', d)
                return x(d.data.NAME)
            })
            .attr('y', function (d) {
                return height - margin.bottom
            })
            .attr('height', function (d) {
                return 0
            })
            .attr('width', x.bandwidth())
            .on('mouseover', mouseover)
            .on('mouseleave', mouseleave)
            .transition()
            .duration(800)
            .attr('y', function (d) {
                return y(d[1])

                //return y(d[1] + d[0])
            })
            .attr('height', function (d) {
                // if (d.data.NAME === '2013-09') {
                //     console.log('d', d, 'year', d.data.NAME)
                //     console.log(
                //         'd1',
                //         d[1],
                //         'd0',
                //         d[0],
                //         'y(d1+d0)',
                //         y(d[1] + d[0]),
                //         'y(d[0])',
                //         y(d[0]),
                //         'y(d[1])',
                //         y(d[1])
                //     )
                // }
                return y(d[0]) - y(d[1])

                //return y(d[0]) - y(d[1] + d[0])
            })

        // Draw legend
        var legendItemSize = 12
        var legendSpacing = 4
        var xOffset = 30
        // var yOffset = 100

        var legend = d3
            .select('#legendStack')
            .append('svg')
            .attr('width', '150px')
            .attr('height', '100px')
            .selectAll('.legendItem')
            .data(colors)

        // .enter()
        // .append('svg')
        // .attr('transform', function (d, i) {
        //     return (
        //         'translate(' +
        //         (i * 50 + width / 2 - 25) +
        //         ',' +
        //         -margin.top +
        //         ')'
        //     )
        // })

        // .attr('transform', function (d, i) {
        //     // console.log('1. d: ', d, ', i: ', i)
        //     return 'translate( ' + width + ', ' + i * 19 + ')'
        // })

        legend
            .enter()
            .append('rect')
            //.attr('x', width - 18)
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
            // .attr('x', width + 5)
            // .attr('y', 9)
            //.attr('dy', '.35em')
            .style('text-anchor', 'start')
            .attr('x', xOffset + legendItemSize + 20)
            //.attr('x', xOffset + legendItemSize + 5)
            .attr('y', (d, i) => (legendItemSize + legendSpacing) * i + 12)
            .text(function (d, i) {
                return col[i]
                // console.log('2. d: ', d, ', i: ', i)
                // switch (i) {
                //     case 0:
                //         return col[0]
                //     case 1:
                //         return col[1]
                //     case 2:
                //         return col[2]
                //     case 3:
                //         return col[3]
                //     case 4:
                //         return col[4]
                // }
            })
    }, [])

    return (
        <MonthlyBarChartStyle>
            <h1>{props.header}</h1>
            <div id="stackBarchart"></div>
            <div id="legendStack"></div>
        </MonthlyBarChartStyle>
    )
}

export default StackedBarChart

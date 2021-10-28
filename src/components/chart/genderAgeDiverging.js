import React, { useEffect, useState, useCallback, useRef } from 'react'
import * as d3module from 'd3'
import { GenderDivergingBarChartSytle } from '../style/chartStyle'
import d3Tip from 'd3-tip'
import { sampleData } from '../../sampledata/barData'
import csvToData from '../../modules/csvDataRead'
import jsonToData from '../../modules/jsonDataRead'
import moment from 'moment'
import { compose } from 'redux'

const d3 = {
    ...d3module,
    tip: d3Tip,
}

const GenderAgeDivergingChart = (props) => {
    // SET UP DIMENSIONS
    // var [w, setW] = useState(950)

    var thisMonth = moment().subtract(2, 'month').format('YYYY-MM')

    // margin.middle is distance from center line to each y-axis
    var margin = {
        top: 20,
        right: 40,
        bottom: 24,
        left: 40,
        middle: 28,
    }
    //const [data, setData] = useState(sampleData.genDivergData.data1)
    const { header, dataloc } = props
    const svgRef = useRef()

    //console.log('props.header', props.header)

    useEffect(async () => {
        if (dataloc.includes('.csv')) {
            var data = await csvToData(dataloc)
            var w = 950
            var h = 600
        } else {
            var getData = await jsonToData(dataloc)

            var data = getData[thisMonth]
            //console.log('AGE/JSON?', data)
            data = data.slice(0, -1)
            data.sort((a, b) => {
                return (
                    parseInt(a.group.slice(0, 2)) -
                    parseInt(b.group.slice(0, 2))
                )
            })
            var w = 800
            var h = 750
        }
        // the width of each side of the chart
        var regionWidth =
            (w - margin.right - margin.left - margin.middle) / 2 -
            margin.middle -
            margin.left

        // these are the x-coordinates of the y-axes
        var pointA = regionWidth,
            pointB =
                w -
                regionWidth -
                margin.middle -
                margin.right -
                margin.left -
                margin.left * 2

        console.log('pointA', pointA, 'pointB', pointB, pointB - pointA)

        console.log(
            'regeionwidth?',
            regionWidth,
            'pointA',
            pointA,
            'pointB',
            pointB
        )

        // GET THE TOTAL POPULATION SIZE AND CREATE A FUNCTION FOR RETURNING THE PERCENTAGE
        var totalPopulation = d3.sum(data, function (d) {
            return d.male + d.female
        })

        // CREATE SVG
        var svg = d3
            .select('#negBarChart')
            .call((g) => g.select('svg').remove())
            .append('svg')
            .attr('width', w - margin.left - margin.right - margin.middle)
            .attr('height', margin.top + h + margin.bottom)
            // ADD A GROUP FOR THE SPACE WITHIN THE MARGINS
            .append('g')
            .attr('transform', translation(margin.left, margin.top))

        // find the maximum data value on either side
        //  since this will be shared by both of the x-axes
        var maxValue = Math.max(
            d3.max(data, (d) => d.male),
            d3.max(data, (d) => d.female)
        )
        // SET UP SCALES
        // const color = d3.scaleLinear().domain([0, 1]).range([0.29, 0.74])

        // the xScale goes from 0 to the width of a region
        //  it will be reversed for the left x-axis
        var xScale = d3
            .scaleLinear()
            .domain([0, maxValue])
            .range([0, regionWidth])
            .nice()

        var yScale = d3
            .scaleBand()
            .domain(
                data.map(function (d) {
                    return d.group
                })
            )
            .rangeRound([h, 0])
            .padding(0.1)

        // SET UP AXES
        var yAxisLeft = (g) =>
            g.call(
                d3
                    .axisRight(yScale)
                    .tickSize(4, 0)
                    .tickPadding(margin.middle - 4)
            )

        var yAxisRight = (g) =>
            g.call(d3.axisLeft(yScale).tickSize(4, 0).tickFormat(''))

        var xAxisRight = (g) =>
            g.call(
                d3.axisBottom(xScale)
                //   .tickFormat(d3.format('%'))
            )

        var xAxisLeft = (g) =>
            g
                // REVERSE THE X-AXIS SCALE ON THE LEFT SIDE BY REVERSING THE RANGE
                .call(
                    d3.axisBottom(xScale.copy().range([pointA, 0]))
                    //d3.axisBottom(xScale)
                    // .tickFormat(d3.format('%'))
                )

        //<-------- Tooltips -------->
        const tip = d3
            .tip()
            .attr('class', 'toolTip')
            .attr('id', 'toolTip')
            .style('padding-top', '17px')
            .style('padding-left', '12px')
            //.style('background', 'rgba(0, 0, 0, 0.8)')
            .style('color', 'Black')
            //.style("display", "inline-block")
            // .style('left', d3.select(this).attr("cx") + "px")
            // .style('top', d3.select(this).attr("cy") + "px")
            // .style("left",(d) => xScale(d.male)  + "px")
            // .style("top", (d) => yScale(d.group)+ "px")
            .offset([-10, 0])

        const fTip = d3
            .tip()
            .attr('class', 'toolTipF')
            .attr('id', 'toolTipF')
            .style('padding-top', '17px')
            .style('padding-right', '12px')
            //.style('background', 'rgba(0, 0, 0, 0.8)')
            .style('color', 'Black')
            //.style("display", "inline-block")
            // .style('left', d3.select(this).attr("cx") + "px")
            // .style('top', d3.select(this).attr("cy") + "px")
            // .style("left",(d) => xScale(d.male)  + "px")
            // .style("top", (d) => yScale(d.group)+ "px")
            .offset([-10, 0])

        svg.call(tip)
        svg.call(fTip)
        //<-------- Tooltips -------->

        // MAKE GROUPS FOR EACH SIDE OF CHART
        // scale(-1,1) is used to reverse the left side so the bars grow left instead of right
        var leftBarGroup = svg
            .append('g')
            .attr('transform', translation(pointA, 0) + 'scale(-1,1)')
        var rightBarGroup = svg
            .append('g')
            .attr('transform', translation(pointB, 0))

        // DRAW AXES
        svg.append('g')
            .attr('class', 'axis y left')
            .attr('transform', translation(pointA, 0))
            .call(yAxisLeft)
            .selectAll('text')
            .style('text-anchor', 'middle')

        svg.append('g')
            .attr('class', 'axis y right')
            .attr('transform', translation(pointB, 0))
            .call(yAxisRight)

        svg.append('g')
            .attr('class', 'axis x left')
            .attr('transform', translation(0, h))
            .call(xAxisLeft)

        svg.append('g')
            .attr('class', 'axis x right')
            .attr('transform', translation(pointB, h))
            .call(xAxisRight)

        // DRAW BARS
        leftBarGroup
            .selectAll('.bar.left')
            .data(data)
            .join(
                (enter) => enter.append('g'),
                (update) => update.attr('class', 'update'),
                (exit) => exit.remove()
            )
            .append('rect')
            .attr('class', 'bar left')
            .attr('fill', '#ACDDEF')
            .attr('x', 0)
            .attr('y', function (d) {
                return yScale(d.group)
            })
            //    .attr('width', function(d) { return xScale(d.male); })
            .attr('height', yScale.bandwidth())
            .transition()
            .duration(500)
            .attr('width', (d) => xScale(d.male))
            .delay(function (d, i) {
                //console.log(i)
                return i * 70
            })

        leftBarGroup
            .selectAll('.bar.left')
            .on('mouseover', function (d, i, n) {
                //console.log(d, n, i)
                //tip.show(i, this);
                // d3.selectAll('rect')
                // .attr('opacity', 0.6)
                let pos = d3.select(this).node().getBoundingClientRect()
                let tipNodeWidth = d3
                    .selectAll('#toolTip')
                    .node()
                    .getBoundingClientRect().width

                tip.html((d) => {
                    //console.log('d??', d)
                    return (
                        "<strong>Male:</strong> <span style='color:red'>" +
                        d.male.toLocaleString('ko-KR') +
                        '</span>'
                    )
                }).show(i, this)

                //tip.style('left', xScale(i.male))
                tip.style(
                    'left',
                    `${
                        pos['width'] < tipNodeWidth + 12
                            ? pos['left'] - tipNodeWidth
                            : pos['left']
                    }px`
                ).style('top', `${window.pageYOffset + pos['y'] - 5}px`)

                d3.select(this)
                    .transition()
                    .duration(100)
                    // .attr('fill', '#ACDDEF')
                    .attr('opacity', 0.8)
            })
            .on('mouseleave', function (actual, i) {
                tip.hide()
                d3.select(this)
                    .transition()
                    .duration(300)
                    // .attr('fill', d3.interpolateSpectral(color(1)))
                    .attr('opacity', 1)
            })

        rightBarGroup
            .selectAll('.bar.right')
            .data(data)
            .join(
                (enter) => enter.append('g'),
                (update) => update.attr('class', 'update'),
                (exit) => exit.remove()
            )
            .append('rect')
            .attr('class', 'bar right')
            .attr('fill', '#EFACDA')
            .attr('x', 0)
            .attr('y', function (d) {
                return yScale(d.group)
            })
            // .attr('width', function (d) {
            //     return xScale(d.female)
            // })
            .attr('height', yScale.bandwidth())
            .on('mouseover', function (d, i, n) {
                let pos = d3.select(this).node().getBoundingClientRect()
                let tipNodeWidthF = d3
                    .selectAll('#toolTipF')
                    .node()
                    .getBoundingClientRect().width

                fTip.html((d) => {
                    //console.log('d??', d)
                    return (
                        "<strong>Female:</strong> <span style='color:red'>" +
                        d.female.toLocaleString('ko-KR') +
                        '</span>'
                    )
                }).show(i, this)

                fTip.style('left', xScale(i.female))
                fTip.style(
                    'left',
                    `${
                        pos['width'] < tipNodeWidthF + 12
                            ? pos['right']
                            : pos['right'] - tipNodeWidthF
                    }px`
                )
                fTip.style('top', `${window.pageYOffset + pos['y'] - 5}px`)

                d3.select(this)
                    .transition()
                    .duration(100)
                    // .attr('fill', d3.interpolateSpectral(color(0.2)))
                    .attr('opacity', 0.8)
            })
            .on('mouseleave', function (actual, i) {
                fTip.hide()
                d3.select(this)
                    .transition()
                    .duration(300)
                    // .attr('fill', d3.interpolateSpectral(color(0)))
                    .attr('opacity', 1)
            })
            .transition()
            .duration(500)
            .attr('width', (d) => xScale(d.female))
            .delay(function (d, i) {
                //console.log(i) ;
                return i * 70
            })

        // so sick of string concatenation for translations
        function translation(x, y) {
            return 'translate(' + x + ',' + y + ')'
        }
    }, [])
    return (
        <GenderDivergingBarChartSytle>
            <h1>{props.header}</h1>
            <div id="negBarChart" ref={svgRef}></div>
        </GenderDivergingBarChartSytle>
    )
}

export default GenderAgeDivergingChart

import React, { useEffect, useState, useCallback, useRef } from 'react'
import { HorizonBarChartSytle } from '../style/chartStyle'
import * as d3module from 'd3'
import d3Tip from 'd3-tip'
import { sampleData } from '../../sampledata/barData'
import csvToData from '../../modules/csvDataRead'
import jsonToData from '../../modules/jsonDataRead'
import { xml } from 'd3'

const d3 = {
    ...d3module,
    tip: d3Tip,
}

const DeptHorizonBarChart = (props) => {
    //const [data, setData] = useState(sampleData.depHorizonData.data1)
    const { header, dateCtrl, dataloc, dataloc2 } = props
    const svgRef = useRef()

    var margin = { top: 20, right: 100, bottom: 30, left: 80 },
        width = 800 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom

    var y = d3.scaleBand().range([height, 0]).padding(0.1)

    var x = d3.scaleLinear().range([0, width])

    useEffect(async () => {
        // if (selectData != null) {
        //     setData(sampleData.depHorizonData[selectData])
        // }
        let getData = await jsonToData(dataloc)
        let realdata = getData[dateCtrl]
        // realdata.sort((a, b) => {
        //     return a.value < b.value ? -1 : a.value > b.value ? 1 : 0
        // })
        // console.log('getdatA?', getData, 'realdata', realdata)
        // console.log('realdata???', realdata)
        realdata = realdata.slice(-15)
        //console.log('realdata???', realdata)

        const xMaxValue = d3.max(realdata, (d) => d.value)
        const color = d3.scaleLinear().domain([0, xMaxValue]).range([0.4, 0.5])
        //console.log('color', color(xMaxValue))

        var svg = d3
            .select('#hbarchart')
            .call((g) => g.select('svg').remove())
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr(
                'transform',
                'translate(' + margin.left + ',' + margin.top + ')'
            )

        x.domain([
            0,
            d3.max(realdata, function (d) {
                return d.value
            }),
        ])
        // svg.append('g')
        //     //  .attr("transform", "translate(0," + height + ")")
        //     .call(d3.axisTop(x))

        y.domain(
            realdata.map(function (d) {
                return d.name
            })
        )
        // add the y Axis
        // svg.append('g').call(d3.axisLeft(y))

        svg.append('g').attr('class', 'axisXRank')
        svg.append('g').attr('class', 'axisYRank')

        // var bar = svg
        //     .selectAll('.bar')
        //     .data(realdata)
        //     .join(
        //         (enter) => enter.append('g'),
        //         (update) => update.attr('class', 'update'),
        //         (exit) => exit.remove()
        //     )

        // bar.append('rect')
        //     .attr('class', 'bar')
        //     //.attr("x", function(d) { return x(0); })
        //     //.attr("width", function(d) {return x(0) - width; } )
        //     //.attr('fill', (d) => d3.interpolateYlGn(color(d.value)))
        //     //.attr('fill', '#69b3a2')
        //     .on('mouseover', onMouseOver)
        //     .on('mouseleave', function (actual, i) {
        //         tip.hide()
        //         d3.select(this)
        //             .transition()
        //             .duration(300)
        //             .attr('fill', ({ value }) =>
        //                 d3.interpolateGnBu(color(value))
        //             )
        //     })
        //     .attr('x', x(0))
        //     .attr('y', function (d) {
        //         return y(d.name)
        //     })
        //     .attr('height', y.bandwidth())
        //     .transition()
        //     .duration(2000)
        //     .attr('width', (d) => x(d.value))
        //     .attr('fill', ({ value }) => d3.interpolateGnBu(color(value)))
        //     .delay(function (d, i) {
        //         return -i * 50
        //     })

        //.attr("height", function(d) { return height - y(0); }) // always equal to 0
        //.attr("y", function(d) { return y(0); })
    }, [])

    useEffect(async () => {
        let getData = await jsonToData(dataloc)

        let realdata = getData[dateCtrl]
            .sort((a, b) => {
                return a.value < b.value ? -1 : a.value > b.value ? 1 : 0
            })
            .slice(-25)
        // console.log('data??', getData, 'real', realdata)

        const xMaxValue = d3.max(realdata, (d) => d.value)
        const color = d3.scaleLinear().domain([0, xMaxValue]).range([0.2, 0.8])

        var svg = d3
            .select(svgRef.current)
            .select('svg')
            // .call((g) => g.select('g').remove())
            .select('g')

        x.domain([
            0,
            d3.max(realdata, function (d) {
                return d.value
            }),
        ])
        y.domain(
            realdata.map(function (d) {
                return d.name
            })
        )

        let xBar = svg
            .selectAll('.axisXRank')
            .join(
                (enter) => enter.append('g').attr('class', 'newXaxis'),
                (update) => update.attr('class', 'updateXaxis'),
                (exit) => exit.remove()
            )
            .call(d3.axisTop(x))

        let yBar = svg
            .selectAll('.axisYRank')
            .join(
                (enter) => enter.append('g').attr('class', 'newYaxis'),
                (update) => update.attr('class', 'updateYaxis'),
                (exit) => exit.remove()
            )
            .call(
                d3
                    .axisLeft(y)
                    // .ticks(realdata.length)
                    .tickSizeInner(7)
                    .tickSizeOuter(7)
            )

        function onMouseOver(d, i) {
            //console.log(d)
            let pos = d3.select(this).node().getBoundingClientRect()
            let tipNodeWidth = d3
                .selectAll('#depToolTip')
                .node()
                .getBoundingClientRect().width

            tip.show(i, this)
            console.log('pos?', pos.width, tipNodeWidth, pos.right, pos)
            //console.log('depToolTip',d3.selectAll('#depToolTip').node().getBoundingClientRect() )

            // tip.style('left', `${pos['x'] + pos['width']} px`)
            //
            if (pos['width'] < 230) {
                tip.style('left', `${pos['right']}px`).style(
                    'top',
                    `${window.pageYOffset + pos['y'] - 1}px`
                )
            } else {
                tip.style(
                    'left',
                    `${
                        // pos['width'] < 200
                        //     ? pos['right']
                        //     : pos['right'] - tipNodeWidth
                        pos['right'] - 180
                    }px`
                ).style('top', `${window.pageYOffset + pos['y'] - 1}px`)
            }

            d3.select(this)
                .transition()
                .duration(100)
                //.attr('fill', d3.interpolateSpectral(color(0.8))) #ffc500
                .attr('fill', '#ffc500')
        }

        const tip = d3
            .tip()
            .attr('id', 'depToolTip')
            .attr('class', 'depToolTip')
            .style('padding-top', '9px')
            .style('padding-right', '12px')
            .style('padding-left', '12px')
            //.style('background', 'rgba(0, 0, 0, 0.8)')
            .style('color', '#fff')
            .html((d) => {
                //console.log(d)
                return (
                    '<strong>' +
                    d.name_full +
                    " : </strong> <span style='color:red'>" +
                    d.value.toLocaleString('ko-KR') +
                    ' 명 </span>'
                )
            })

        svg.call(tip)

        var bar = svg
            .selectAll('rect')
            .data(realdata)
            .join(
                (enter) => enter.append('rect').attr('class', 'newRankRect'),
                (update) => update.attr('class', 'updateRankRect'),
                (exit) => exit.remove()
            )
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
                    .attr('fill', ({ value }) =>
                        d3.interpolateGnBu(color(value))
                    )
            })
            .attr('x', x(0))
            .attr('y', function (d) {
                return y(d.name)
            })
            .attr('height', y.bandwidth())
            .transition()
            .duration(1000)
            .attr('width', (d) => x(d.value))
            .attr('fill', ({ value }) => d3.interpolateGnBu(color(value)))
    }, [dateCtrl])

    return (
        <HorizonBarChartSytle>
            <h1>{header}</h1>
            <div id="hbarchart" ref={svgRef}></div>
        </HorizonBarChartSytle>
    )
}

export default DeptHorizonBarChart

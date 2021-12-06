import React, { useEffect, useState, useCallback, useRef } from 'react'
import { HorizonBarChartSytle } from '../style/chartStyle'
import * as d3module from 'd3'
import d3Tip from 'd3-tip'
import { sampleData } from '../../sampledata/barData'
import csvToData from '../../modules/csvDataRead'
import jsonToData from '../../modules/jsonDataRead'
import { xml } from 'd3'
import fetchToData from '../../modules/convertPersonMap'

const d3 = {
    ...d3module,
    tip: d3Tip,
}

const DeptHorizonBarChart = (props) => {
    //const [data, setData] = useState(sampleData.depHorizonData.data1)
    const { header, dateCtrl, dataloc, data2, vocId, left } = props
    const svgRef = useRef()

    var margin = { top: 25, right: 80, bottom: 5, left: 55 }
    if (left) {
        var width = 630 - margin.left,
            height = 1215 - margin.top - margin.bottom
    } else {
        var width = 935 - margin.left - margin.right,
            height = 588 - margin.top - margin.bottom
    }
    var y = d3.scaleBand().range([height, 0]).padding(0.1)

    var x = d3.scaleLinear().range([0, width])

    useEffect(async () => {
        // if (selectData != null) {
        //     setData(sampleData.depHorizonData[selectData])
        // }
        // console.log('dataloc?', dataloc)
        // console.log('dateCtrl?', dateCtrl)
        // console.log('data2', header, dateCtrl, dataloc, data2, vocId)
        // if (bisectLeft) {
        //     var getData = await jsonToData(dataloc)
        //     var realdata = getData[dateCtrl]
        //         .sort((a, b) => {
        //             return a.value < b.value ? -1 : a.value > b.value ? 1 : 0
        //         })
        //         .slice(-40)
        // } else {
        //     var data = data2
        // }
        if (!vocId) {
            var getData = await jsonToData(dataloc)
            // console.log('get data?', getData)
            var realdata = getData[dateCtrl.substring(0, 4)]
                .sort((a, b) => {
                    return a.value < b.value ? -1 : a.value > b.value ? 1 : 0
                })
                .slice(-46, -1)
        } else {
            var realdata = fetchToData(data2)
                [dateCtrl.substring(0, 4)].sort((a, b) => {
                    return a.value < b.value ? -1 : a.value > b.value ? 1 : 0
                })
                .slice(-20)
            // console.log('fetch real data?', realdata, data2)
        }

        // console.log('dataloc?', data2, vocId, left)

        // realdata.sort((a, b) => {
        //     return a.value < b.value ? -1 : a.value > b.value ? 1 : 0
        // })
        // console.log('getdatA?', getData, 'realdata', realdata)
        // console.log('realdata???', realdata)
        //console.log('realdata???', realdata)

        const xMaxValue = d3.max(realdata, (d) => d.value)
        const color = d3.scaleLinear().domain([0, xMaxValue]).range([0.4, 0.5])
        //console.log('color', color(xMaxValue))

        var svg = d3
            .select(svgRef.current)
            .call((g) => g.select('svg').remove())
            .append('svg')
            .attr('width', width + margin.right)
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
    }, [vocId])

    useEffect(async () => {
        if (!vocId) {
            var getData = await jsonToData(dataloc)

            var realdata = getData[dateCtrl.substring(0, 4)]
                .sort((a, b) => {
                    return a.value < b.value ? -1 : a.value > b.value ? 1 : 0
                })
                .slice(-46, -1)
        } else {
            var realdata = fetchToData(data2)
                [dateCtrl.substring(0, 4)].sort((a, b) => {
                    return a.value < b.value ? -1 : a.value > b.value ? 1 : 0
                })
                .slice(-20)
            // console.log('fetch real data?', realdata, dateCtrl.substring(0, 4))
        }

        // console.log('dataloc?', data2, vocId, left)
        // console.log('data??', getData, 'real', realdata)
        // console.log('real', realdata)

        const xMaxValue = d3.max(realdata, (d) => d.value)
        const color = d3.scaleLinear().domain([0, xMaxValue]).range([0.2, 0.8])

        var container = d3.select(svgRef.current)
        container.selectAll('div').remove()
        const tip = container
            .append('div')
            // .attr('id', 'depToolTip')
            .attr('class', 'depToolTip')
            // .style('opacity', 0)
            .style('padding-top', '0px')
            .style('padding-right', '12px')
            .style('padding-left', '12px')
            //.style('background', 'rgba(0, 0, 0, 0.8)')
            .style('color', '#fff')

        var svg = container
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
            .call(d3.axisTop(x).tickFormat(d3.format('~s')))
            .style('font-size', '15px')

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
            .style('font-size', '13px')

        function onMouseOver(d, i) {
            //console.log(d)
            let pos = d3.select(this).node().getBoundingClientRect()
            let tipNodeWidth = d3
                .selectAll('.depToolTip')
                .node()
                .getBoundingClientRect().width

            let tipNodeheight = d3
                .selectAll('.depToolTip')
                .node()
                .getBoundingClientRect().height

            tip.style('visibility', 'visible')
                .style('position', 'absolute')
                .html((d) => {
                    let count = d3.format('0.2s')(i.value)
                    // console.log(count)
                    return (
                        '<strong>' +
                        i.name_full +
                        " : </strong> <span style='color:red'>" +
                        // d.value.toLocaleString('ko-KR') +
                        count +
                        ' 명 </span>'
                    )
                })
            console.log(
                'pos?',
                pos.width,
                tipNodeWidth,
                tipNodeheight,
                pos.right,
                pos
            )
            // console.log('this???', this)
            //console.log('depToolTip',d3.selectAll('#depToolTip').node().getBoundingClientRect() )

            // tip.style('left', `${pos['x'] + pos['width']} px`)
            //
            if (left) {
                if (pos['width'] < 270) {
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
            } else {
                if (pos['width'] < 200) {
                    tip.style('left', `${pos['right']}px`)
                    if (pos['height'] < 30) {
                        tip.style(
                            'top',
                            `${window.pageYOffset + pos['y'] - 1}px`
                        )
                    } else {
                        tip.style(
                            'top',
                            `${
                                window.pageYOffset +
                                pos['y'] +
                                pos['height'] / 2
                            }px`
                        ).style('font-size', '25px')
                    }
                } else {
                    tip.style(
                        'left',
                        `${
                            // pos['width'] < 200
                            //     ? pos['right']
                            //     : pos['right'] - tipNodeWidth
                            pos['right'] - 180
                        }px`
                    )
                    if (pos['height'] < 30) {
                        tip.style(
                            'top',
                            `${window.pageYOffset + pos['y'] - 1}px`
                        )
                    } else {
                        tip.style(
                            'top',
                            `${
                                window.pageYOffset +
                                pos['y'] +
                                pos['height'] / 2
                            }px`
                        ).style('font-size', '25px')
                    }
                }
            }

            d3.select(this)
                .transition()
                .duration(100)
                //.attr('fill', d3.interpolateSpectral(color(0.8))) #ffc500
                .attr('fill', '#ffc500')
        }

        // svg.call(tip)

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
                tip.style('visibility', 'hidden')

                // tip.hide()

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
    }, [dateCtrl, vocId])

    return (
        <HorizonBarChartSytle>
            <h1>{header}</h1>
            <div className="hbarchartLine"></div>
            <div ref={svgRef}></div>
        </HorizonBarChartSytle>
    )
}

export default DeptHorizonBarChart

import React, { useEffect, useState, useCallback, useRef } from 'react'
import { MonthlyBarChartStyle } from '../style/chartStyle'
import * as d3 from 'd3'
import { sampleData } from '../../sampledata/barData'
import GenderAgeDivergingChart from './genderAgeDiverging'
import { act } from 'react-dom/cjs/react-dom-test-utils.production.min'
import csvToData from '../../modules/csvDataRead'
import jsonToData from '../../modules/jsonDataRead'

const MonthlyBarLineChart = (props) => {
    var [width, setWidth] = useState(850)
    var height = 600
    const margin = { top: 40, left: 60, bottom: 40, right: 20 }
    //const [data, setData] = useState(sampleData.monthBarData.data1)
    const { header, dataloc } = props
    const svgRef = useRef()

    var sample = [
        { NAME: 'a', VALUE: 10 },
        { NAME: 'b', VALUE: 29 },
        { NAME: 'c', VALUE: 32 },
        { NAME: 'd', VALUE: 25 },
        { NAME: 'e', VALUE: 23 },
        { NAME: 'f', VALUE: 32 },
        { NAME: 'g', VALUE: 25 },
        { NAME: 'h', VALUE: 23 },
        { NAME: 'i', VALUE: 15 },
    ]
    // 소아 암병원 어린이 본원 강남 ? 소아?
    //var data = sampleData

    useEffect(async () => {
        // if (selectData != null) {
        //     setData(sampleData.monthBarData[selectData])
        // }
        //console.log('json?', dataloc, typeof dataloc)
        if (dataloc.includes('.csv')) {
            var data = await csvToData(dataloc)
        } else {
            var data = await jsonToData(dataloc)
            setWidth(1600)
        }

        var x = d3
            .scaleBand()
            // .scaleBand() 그래프의 막대의 반복되는 범위를 정해줍니다.
            .domain(data.map((d) => d.NAME))
            // .domain() 각각의 막대에 순서대로 막대에 매핑합니다.
            .range([margin.left, width - margin.right])
            // 시작위치와 끝 위치로 눈금의 범위를 지정합니다.
            .padding(0.4)
        // 막대의 여백을 설정합니다.

        // line chart와 동일
        var y = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.VALUE)])
            .nice()
            .range([height - margin.bottom, margin.top])

        // line chart와 동일
        const xAxis = (g) =>
            g
                .attr('transform', `translate(0, ${height - margin.bottom})`)
                .call(d3.axisBottom(x).tickSizeOuter(0))

        // line chart와 동일
        const yAxis = (g) =>
            g
                .attr('transform', `translate(${margin.left}, 0)`)
                .call(d3.axisLeft(y))
                .call((g) => g.select('.domain').remove())
                //y axis grid 추가
                .append('g')
                .attr('class', 'grid')
                .call(
                    d3.axisLeft().scale(y).tickSize(-width, 0, 0).tickFormat('')
                )

        // line chart와 동일
        const svg = d3
            .select('#barchart')
            .call((g) => g.select('svg').remove())
            .append('svg')
            .style('width', width - margin.right)
            .style('height', height)

        svg.append('g').call(xAxis)
        svg.append('g')
            .call(yAxis)
            //grid line color 추가
            .call((g) =>
                g
                    .selectAll('.tick:not(:first-of-type) line')
                    .attr('class', 'axis_y_tick')
                    .attr('stroke', '#bdc3c7')
            )

        const barGroups = svg
            .selectAll()
            .data(data)
            .join(
                (enter) => enter.append('g'),
                (update) => update.attr('class', 'update'),
                (exit) => exit.remove()
            )

        barGroups
            .append('rect')
            .attr('fill', '#73FDFF')
            .attr('class', 'bar')
            .attr('x', (d) => x(d.NAME))
            .attr('width', x.bandwidth())
            //.attr('y', d => y(d.VALUE))
            //.attr('height', d => y(0) - y(d.VALUE))
            .attr('y', y(0))
            //.attr('height', (d) => y(0))
            //항목마다 mouse over 효과 추가
            .on('mouseenter', function (actual, i) {
                d3.selectAll('.value').attr('opacity', 0)

                d3.select(this)
                    .transition()
                    .duration(300)
                    .attr('opacity', 0.6)
                    .attr('x', (a) => x(a.NAME) - 5)
                    .attr('width', x.bandwidth() + 10)

                const yValue = y(i.VALUE)

                let line = svg
                    .append('line')
                    .attr('id', 'limit')
                    .attr('stroke', '#ffc500')
                    .style('stroke-width', '2px')
                    .style('stroke-dasharray', 2)
                    .attr('x1', margin.left)
                    .attr('y1', yValue)
                    .attr('x2', width)
                    .attr('y2', yValue)

                barGroups
                    .append('text')
                    .attr('class', 'divergence')
                    .attr('x', (a) => x(a.NAME) + x.bandwidth() / 2)
                    .attr('y', (a) => y(a.VALUE) + 30)
                    .attr('fill', '#616161')
                    .attr('text-anchor', 'middle')
                    .text((a, idx) => {
                        const divergence = (a.VALUE - i.VALUE).toFixed(1)

                        let text = ''
                        if (divergence > 0) text += '+'
                        text += `${divergence / 100}%`

                        return idx !== i ? text : ''
                    })
            })
            .on('mouseleave', function (actual, i) {
                d3.selectAll('.value').attr('opacity', 1)

                d3.select(this)
                    .transition()
                    .duration(300)
                    .attr('opacity', 1)
                    .attr('x', (a) => x(a.NAME))
                    .attr('width', x.bandwidth())

                svg.selectAll('#limit').remove()
                svg.selectAll('.divergence').remove()
            })
        barGroups
            .selectAll('rect')
            .transition()
            .duration(800)
            .attr('y', (d) => y(d.VALUE))
            .attr('height', (d) => y(0) - y(d.VALUE))
            .delay((d, i) => i * 100)
        // .selectAll() | .select() 메서드는 해당 엘리먼트를 찾지만, 가상의 요소로 선택되기도 합니다.
        // .data() 앞에 선택된 select에 (data)배열에 Join하여 새 선택항목을 반환합니다.
        // DOM에 없는 선택된 엘리먼트에 각 데이터에 대한 자리의 노드를 반환합니다.
        // 여기까지의 코드를 간략하게 풀어보면
        // svg에 g 엘리먼트를 추가하고 그 안의 rect 엘리먼트를 찾습니다.
        // 새로 추가된 g 엘리먼트이기 때문에 그 안의 rect 엘리먼트는 없기 때문에 가상의 엘리먼트로 선택되었습니다.
        // .data(data)로 가상의 엘리먼트에 data 배열 데이터와 Join 되고
        // .enter() Join 된 데이터에 각 자리에 대한 노드를 반환하고
        // .append() 반환된 노드 데이터를 담고 react 엘리먼트를 추가합니다.
        // ex. data = [1, 2, 3, 4] 값을 가지고 있었다면 1, 2, 3, 4 데이터와 매핑된 rect 엘리먼트가 4개 추가됩니다.

        var line = d3
            .line()
            .x(function (d, i) {
                return x(d.NAME) + x.bandwidth() / 2
            })
            .y(function (d) {
                return y(d.VALUE)
            })
            .curve(d3.curveNatural)

        const path = barGroups
            .append('path')
            .attr('class', 'line') // Assign a class for styling
            .attr('d', line(data)) // 11. Calls the line generator
            .attr('fill', 'none')
            .attr('stroke', '#EFACDA')
            .attr('stroke-width', 2)
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')

        const pathLength = path.node().getTotalLength()

        const transitionPath = d3.transition().ease(d3.easeSin).duration(2500)

        path.attr('stroke-dashoffset', pathLength)
            .attr('stroke-dasharray', pathLength)
            .transition(transitionPath)
            .attr('stroke-dashoffset', 0)
        barGroups
            .append('circle') // Uses the enter().append() method
            .attr('class', 'dot') // Assign a class for styling
            .attr('cx', function (d, i) {
                return x(d.NAME) + x.bandwidth() / 2
            })
            .attr('cy', function (d) {
                return y(d.VALUE)
            })
            .attr('r', 8)
            .attr('stroke', '#EFACDA')
            .attr('fill', '#EFACDA')
            .transition()
            .ease(d3.easeSin)
            .duration(2500)
    }, [width])

    return (
        <MonthlyBarChartStyle width={width}>
            <h1>{header}</h1>
            <div id="barchart" ref={svgRef}></div>
        </MonthlyBarChartStyle>
    )
}

export default MonthlyBarLineChart

import React, { useEffect, useState, useCallback, useRef } from 'react'
import { MonthlyBarChartStyle, TreemapStyle } from '../style/chartStyle'
import * as d3module from 'd3'
import d3Tip from 'd3-tip'

import { sampleData } from '../../sampledata/barData'

import jsonToData from '../../modules/jsonDataRead'
import {
    red,
    indigo,
    deepPurple,
    deepOrange,
    lightBlue,
    blue,
    blueGrey,
    brown,
    purple,
    pink,
    lightGreen,
    teal,
    green,
    cyan,
} from '@mui/material/colors'
import { colors } from '@mui/material'

const d3 = {
    ...d3module,
    tip: d3Tip,
}

// JSON Data
// 		{"MONTH" : "2020-10",
// 		"HSP_TP_CD" : "1",
// 		"ICD10_CD" : "F39",
// 		"CLDG_NM" : "Mood disorder",
// 		"ROWCNT" : 1193,
// 		"VISITCNT" : 1193,
// 		"PCNT" : 936 }
const BubbleCircleChart = (props) => {
    const { header, dateCtrl, dataloc, pageInfo } = props
    // const { header, dateCtrl, pageInfo } = props
    const svgRef = useRef()
    // const dataLocation = '/outpatientData'
    // const dataloc = dataLocation + '/monthly_dgns_order_by_hsp_pcnt.json'

    const margin = { top: 10, right: 10, bottom: 10, left: 10 },
        width = 880 - margin.left - margin.right,
        height = 560 - margin.top - margin.bottom

    useEffect(async () => {
        // const dataset = sampleData.circleCharData.data1

        const getdata = await jsonToData(dataloc)
        const dataset = getdata[dateCtrl.substring(0, 4)][pageInfo]
        // console.log('bubble data?', getdata)

        const sum = d3
            .stratify()
            .id((d) => d.name)
            .parentId((d) => d.parent)(dataset)

        sum.sum(function (d) {
            return +d.value
        })

        const bubble = (dt) =>
            d3
                .pack()
                .size([
                    width + margin.left + margin.right + 20,
                    height + margin.top + margin.bottom + 20,
                ])
                .padding(6)(sum)

        const root = bubble(dataset)

        const categories = dataset.map((d) => d.name),
            colorsDig = [
                '#FF8989',
                '#FF9797',
                '#4ADAB4',
                '#A5EDD9',
                '#FFC4C4',
                '#D2F6EC',
                '#8EE8D0',
                '#FE9697',
                '#E8FAF6',
                '#FFE1E1',
                '#D2F6EC',
                '#FF80AB',
                '#D2F6EC',
                '#FFD3D3',
                '#1DD1A1',
                '#A5EDD9',
                '#77E3C7',
                '#61DFBD',
                '#FCE4EC',
                '#F48FB1',
            ],
            colorScale = d3
                .scaleOrdinal() // the scale function
                .domain(categories) // the data
                .range(colorsDig) // the way the data should be shown
        // .range(['#f44336', '#ffebee'])

        const container = d3.select(svgRef.current) //make sure there's a svg element in your html file
        // .call((g) => g.select('svg').remove())

        container.selectAll('svg').remove()
        container.selectAll('div').remove()

        const svg = container
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)

        const bubbleTooltip = container
            .append('div')
            .attr('class', 'bubbleTooltip')
            .attr('id', 'bubbleTooltip')
        // .style('opacity', 0)
        // .style('font-size', '20px')
        // .style('background', '#6b6b83')

        // console.log('root?', root.leaves())

        const node = svg
            .selectAll()
            .data(root.children)
            .enter()
            .append('g')
            .attr('transform', `translate ( ${width / 2}, ${height / 2})`)

        node.transition()
            .ease(d3.easeExpInOut)
            .duration(800)
            .attr('r', (d) => d.r)
            .attr('transform', (d) => `translate(${d.x}, ${d.y})`)

        const circle = node
            .append('circle')
            .attr('r', (d) => d.r)
            .style('fill', (d) => {
                return colorScale(d.data.name)
            })
            .on('mouseover', function (e, d) {
                // bubbleTooltip.select('img').attr('src', d.data.img)
                // bubbleTooltip.select('a').attr('href', d.data.link).text(d.data.name)

                bubbleTooltip
                    .style('font-size', '18px')
                    .style('max-width', 220 + 'px')
                    .style('min-width', 80 + 'px')
                    .style('border-radius', '5px')
                    .style('padding', '8px')
                    .style('position', 'absolute')
                    .style('left', e.pageX + 'px')
                    .style('top', e.pageY + 'px')
                    .style('word-break', 'break-all')
                    .style('visibility', 'visible')
                    .style('background', '#6b6b83')
                    .html(
                        '<strong>' +
                            d.data.name_full +
                            " : </strong><br/> <span style='color:red'>" +
                            d.data.value.toLocaleString('ko-KR') +
                            ' 명 </span>'
                    )

                d3.select(e.target)
                    .style('stroke', '#F3F9A7')
                    .attr('stroke-width', 2)
                    .style('opacity', 0.8)
            })
            .on('mousemove', (e) =>
                bubbleTooltip
                    .style('top', `${e.pageY}px`)
                    .style('left', `${e.pageX + 10}px`)
            )
            .on('mouseleave', (e, i) => {
                bubbleTooltip.style('visibility', 'hidden')

                d3.select(e.target)
                    // .style('stroke', '#F3F9A7')
                    .attr('stroke-width', 0)
                    .style('opacity', 1)
            })
            .on('click', (e, d) => {
                // console.log('ddddd??', d)
                props.onClickEvent('OP', d.data.voc_id, d.data.name)
            })

        const label = node
            .append('text')
            .attr('dx', -18)
            .attr('dy', 2)
            .text((d) => d.data.name.substring(0, d.r / 3))
            .on('mouseover', (e, d) => {
                bubbleTooltip
                    .style('font-size', '18px')
                    .style('max-width', 220 + 'px')
                    .style('min-width', 80 + 'px')
                    .style('border-radius', '5px')
                    .style('padding', '8px')
                    .style('position', 'absolute')
                    .style('left', e.pageX + 'px')
                    .style('top', e.pageY + 'px')
                    .style('word-break', 'break-all')
                    .style('visibility', 'visible')
                    .style('background', '#6b6b83')
                    .html(
                        '<strong>' +
                            d.data.name_full +
                            " : </strong><br/> <span style='color:red'>" +
                            d.data.value.toLocaleString('ko-KR') +
                            ' 명 </span>'
                    )
                // console.log('e??', e)
                d3.select(e.path[1])
                    .style('stroke', '#F3F9A7')
                    .attr('stroke-width', 1)
                    .style('opacity', 0.8)
            })
            .on('mousemove', (e) =>
                bubbleTooltip
                    .style('top', `${e.pageY}px`)
                    .style('left', `${e.pageX + 10}px`)
            )
            .on('mouseleave', (e, i) => {
                bubbleTooltip.style('visibility', 'hidden')

                d3.select(e.path[1])
                    // .style('stroke', '#F3F9A7')
                    .attr('stroke-width', 0)
                    .style('opacity', 1)
            })
            .on('click', (e, d) => {
                // console.log('ddddd??', d)
                props.onClickEvent('OP', d.data.voc_id, d.data.name)
            })

        label.transition().delay(700).ease(d3.easeExpInOut)

        // console.log('treemap get data', dataset)
    }, [])

    return (
        <TreemapStyle>
            <h1>{header}</h1>
            <span> ICD9CM </span>
            <div id="bubblechart" ref={svgRef}></div>
        </TreemapStyle>
    )
}

export default BubbleCircleChart

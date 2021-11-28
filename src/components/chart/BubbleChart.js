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
    // const { header, dateCtrl, dataloc } = props
    const { header, dateCtrl, pageInfo } = props
    const svgRef = useRef()
    const dataLocation = '/outpatientData'
    const dataloc = dataLocation + '/monthly_dgns_order_by_hsp_pcnt.json'

    const margin = { top: 10, right: 10, bottom: 10, left: 10 },
        width = 880 - margin.left - margin.right,
        height = 578 - margin.top - margin.bottom

    useEffect(async () => {
        // const dataset = sampleData.circleCharData.data1

        const getdata = await jsonToData(dataloc)
        const dataset = getdata[dateCtrl][pageInfo]
        // console.log('treemap get data', dataset)
        var colors = []
        let colorBar = [
            lightGreen,
            red,
            cyan,
            green,
            teal,
            deepPurple,
            pink,
            purple,
        ]
        var numcolor = Object.keys(colorBar[0])
            // .map((a, b, c) => {
            //     console.log('a', a, 'b', b, 'c', c)
            //     if (b % 2 === 0) {
            //         return a
            //     }
            // })
            .sort((a, b) => {
                return b - a
            })
            .slice(8, 10)
        numcolor.forEach((d, i, p) => {
            // console.log('colorbar?', colorBar)
            colorBar.forEach((col) => {
                colors.push(col[d])
            })
        })

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
                .range(colors) // the way the data should be shown
        // .range(['#f44336', '#ffebee'])

        const onMouseOver = (d, i) => {
            console.log('treemap mouseover d??', d, 'i', i, 'this', this)
            // tip.show(i, this)
            // var tips = d3.select(.tooltipTree)
            d3.select(this).transition().duration(100).attr('fill', '#ffc500')
        }

        const container = d3.select(svgRef.current) //make sure there's a svg element in your html file
        // .call((g) => g.select('svg').remove())

        container.selectAll('svg').remove()
        container.selectAll('div').remove()

        const treetooltip = container
            .append('div')
            .attr('class', 'treemapTooltip')
            .attr('id', 'treemapTooltip')
            .style('opacity', 0)
            .style('font-size', '20px')
            .style('background', '#6b6b83')

        const svg = container
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate ( ${margin.left}, ${margin.right})`)

        const root = d3
            .stratify()
            .id((d) => d.name)
            .parentId((d) => d.parent)(dataset)

        root.sum(function (d) {
            return +d.value
        })

        const circle = svg
            .append('circle')
            .attr('r', (d) => d.r)
            .style('fill', (d) => colors[d.data.category])
    }, [dateCtrl])

    return (
        <TreemapStyle>
            <h1>{header}</h1>
            <div id="bubblechart" ref={svgRef}></div>
        </TreemapStyle>
    )
}

export default BubbleCircleChart

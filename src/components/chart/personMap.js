import React, { useEffect } from 'react'
import { MapBubbleChartStyle } from '../style/chartStyle'
import * as d3module from 'd3'
import d3Tip from 'd3-tip'
import { sliderBottom } from 'd3-simple-slider'
import ChangeGeoLocation from '../../modules/ChangeGeoLocation'
import koreaGeoData from './source/skorea-provinces-2018-topo-simple.json'
import * as topojson from 'topojson'
import moment from 'moment'
import jsonToData from '../../modules/jsonDataRead'
import { margin } from 'polished'
import { range, timeFormat } from 'd3'
import { useState } from 'react'
import { useRef } from 'react'
import { useCallback } from 'react'
import fetchToData from '../../modules/convertPersonMap'

const d3 = {
    ...d3module,
    tip: d3Tip,
}

const PersonMap = (props) => {
    const svgRef = useRef()
    const { dataloc, dateCtrl, header, vocId, data2 } = props
    // var [data, setData] = useState([])

    const thisMonth = moment().subtract(1, 'month').format('YYYY-MM')

    const geojson = topojson.feature(
        koreaGeoData,
        koreaGeoData.objects.skorea_provinces_2018_geo
    )
    const center = d3.geoCentroid(geojson)

    //console.log('geojson???', geojson)
    // slide bar 의 최소 / 최대 날짜 및 현재 날짜 설정 가능
    // data 기준이 현재날짜 - 12 month 이므로 해당날짜로 설정되어 있으나,
    // 필요에 따라 변경가능
    if (!data2) {
        var circleRange = [20, 60]
    } else {
        var circleRange = [50, 300]
    }

    var width = 850,
        height = 1200

    var projection = d3
        .geoMercator()
        .scale(10000) //스케일
        //.scale(1)
        //.translate([0, 0])
        //.rotate([-10, 1, 0]) //지도 회전
        .center([127, 37.6]) //서울 중심좌표
        .translate([width / 3, height / 4.9])
    // } else {
    //     var circleRange = [10, 100]
    //     var width = 650,
    //         height = 800

    //     var projection = d3
    //         .geoMercator()
    //         .scale(6500) //스케일
    //         //.scale(1)
    //         //.translate([0, 0])
    //         //.rotate([-10, 1, 0]) //지도 회전
    //         .center([127, 37.6]) //서울 중심좌표
    //         .translate([width / 2.8, height / 4.9])
    // }

    // const updateData = useCallback(async (group) => {
    //     var dataTemp = await jsonToData(dataloc, geojson)
    //     setData(dataTemp[dateCtrl])
    // }, [])

    // updateData()

    var path = d3.geoPath().projection(projection)

    useEffect(async () => {
        // console.log('useEffect 실행')

        var svg = d3
            .select(svgRef.current)
            // .call((g) => g.select('svg').remove())
            .append('svg')
            .attr('width', width)
            .attr('height', height)
        //.style('background-color', '#2f1e56') //지도 배경색 변경
        //기존 회색 #f2f2f7
        // 보라 배경
        //

        // const bounds = path.bounds(geojson)
        // const widthScale = (bounds[1][0] - bounds[0][0]) / width
        // const hieghtScale = (bounds[1][1] - bounds[0][1]) / height
        // const scale = 1 / Math.max(widthScale, hieghtScale)
        // const xoffset =
        //     width / 2 - (scale * (bounds[1][0] + bounds[0][0])) / 2 + 10
        // const yoffset =
        //     height / 2 - (scale * (bounds[1][1] + bounds[0][1])) / 2 + 80
        // const offset = [xoffset, yoffset]
        //projection.scale(scale).translate(offset)

        var map = svg
            .append('g')
            .selectAll('path')
            .data(geojson.features)
            .enter()
            .append('path')
            .attr('class', 'mapPath')
            .attr('d', path)
            .attr('fill', '#9980FA') // 지도 내부 색깔
            // 자목 색 #ed8b70
            // 회색 #9980FA
            .attr('stroke', '#fff') // 지도 선 색깔 변경
        // 오렌지색 liner #de6a6c

        // map.call(tip)
        // console.log('data???', data)
        // var data = await jsonToData(dataloc, geojson)

        // svg.selectAll('circle')
        //     // .attr('class', 'population')
        //     .data(data[dateCtrl].filter((d) => d.loc))
        //     .join(
        //         (enter) => {
        //             // console.log('enter!', enter)
        //             return (
        //                 enter
        //                     // .append('g')
        //                     .append('circle')
        //                     .attr('class', 'newMapCircle')
        //             )
        //         },
        //         (update) => {
        //             console.log('update!', update)
        //             return update.attr('class', 'updateMapCircle')
        //         },
        //         (exit) => exit.remove()
        //     )
        //     .attr('fill', 'gray')
        //     .attr('fill-opacity', 0.5)
        //     .attr('stroke', '#fff')
        //     .attr('stroke-width', 0.5)
        //     .attr('transform', (d) => `translate(${d.loc})`)
        //     // .attr('id', (d) => `${d.id}`)
        //     .attr('cx', (d) => projection(d.loc)[0] - 125)
        //     .attr('cy', (d) => projection(d.loc)[1] - 40)
        //     .attr('r', (d) => d3.scaleSqrt().range(circleRange)(d.cnt) / 100)
        //     .transition()
        //     .duration(1500)

        // // .attr('id', (d) => `${d.name}`)

        // svg.selectAll('circle')
        //     .on('mouseover', function (d, i, n) {
        //         tip.show(i, this)

        //         d3.select(this)
        //             .attr('stroke', '#F3F9A7')
        //             .attr('stroke-width', 5)
        //             .attr('fill', '#fffbd5')
        //             .attr('opacity', 1)
        //     })
        //     .on('mouseleave', function (actual, i) {
        //         tip.hide()
        //         d3.select(this)
        //             .attr('fill', 'gray')
        //             .attr('fill-opacity', 0.5)
        //             .attr('stroke', '#fff')
        //             .attr('stroke-width', 0.5)
        //     })
        // .ease('linear')
    }, [])

    useEffect(async () => {
        if (!vocId) {
            var data = await jsonToData(dataloc, geojson)
        } else {
            var getDatas = await fetchToData(data2, geojson)
            var data = getDatas[vocId]
            console.log('person map data?', getDatas, 'voc?', vocId)
        }

        // console.log('circle effect 실행')

        var tip = d3
            .tip()
            .attr('class', 'toolTipMap')
            // .attr('id', 'toolTipMap')
            .style('width', 80 + 'px')
            .style('padding', '10px')
            .style('background', '#444')
            .style('color', 'rgb(238, 148, 75)')
            .style('border-radius', '4px')
            .html((d) => {
                let content = `<div class="name"> ${d.name}</div>`
                content += `<div class="cost"> ${
                    d.cnt.toLocaleString('ko-KR') + ' 명'
                } </div>`
                return content
            })

        const svg = d3.select(svgRef.current)
        svg.selectAll('path').call(tip)

        svg.select('svg')
            .selectAll('circle')
            .attr('id', (d) => `${d.id}`)
            .attr('class', 'population')
            .data(data[dateCtrl].filter((d) => d.loc))
            .join(
                (enter) => {
                    // console.log('enter!', enter)
                    return enter
                        .append('g')
                        .append('circle')
                        .attr('class', 'newMapCircle')
                },
                (update) => {
                    // console.log('update!', update)
                    return update.attr('class', 'updateMapCircle')
                },
                (exit) => exit.remove()
            )
            .on('mouseover', function (d, i, n) {
                // console.log('i?', i, 'this??', this)
                tip.show(i, this)

                d3.select(this)
                    .attr('stroke', '#F3F9A7')
                    .attr('stroke-width', 5)
                    .attr('fill', '#fffbd5')
                    .attr('opacity', 1)
            })
            .on('mouseleave', function (actual, i) {
                tip.hide()
                d3.select(this)
                    .attr('fill', 'gray')
                    .attr('fill-opacity', 0.5)
                    .attr('stroke', '#fff')
                    .attr('stroke-width', 0.5)
            })
            .attr('fill', 'gray')
            .attr('fill-opacity', 0.5)
            .attr('stroke', '#fff')
            .attr('stroke-width', 0.5)
            .attr('transform', (d) => `translate(${d.loc})`)
            .attr('cx', (d) => projection(d.loc)[0] - 125)
            .attr('cy', (d) => projection(d.loc)[1] - 40)
            .attr('r', (d) => d3.scaleSqrt().range(circleRange)(d.cnt) / 100)
            .transition()
            .duration(1500)
    }, [dateCtrl, vocId])

    return (
        <MapBubbleChartStyle>
            <h1>{header}</h1>
            <div id="mapLine"></div>
            <div id="mapSlider"></div>
            <div id="map-canvas" ref={svgRef}></div>
        </MapBubbleChartStyle>
    )
}

export default PersonMap

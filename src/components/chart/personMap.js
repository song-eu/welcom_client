import React, { useEffect } from 'react'
import { MapContainer } from '../style/mapStyle'
import * as d3module from 'd3'
import d3Tip from 'd3-tip'
import { sliderBottom } from 'd3-simple-slider'
import ChangeGeoLocation from '../../modules/ChangeGeoLocation'
import koreaGeoData from './source/skorea-provinces-2018-topo-simple.json'
import * as topojson from 'topojson'
import moment from 'moment'
import { margin } from 'polished'
import { range, timeFormat } from 'd3'

const d3 = {
    ...d3module,
    tip: d3Tip,
}

const PersonMap = (props) => {
    const width = 1000,
        height = 1400

    const geojson = topojson.feature(
        koreaGeoData,
        koreaGeoData.objects.skorea_provinces_2018_geo
    )
    const center = d3.geoCentroid(geojson)
    console.log('geojson???', geojson)
    // slide bar 의 최소 / 최대 날짜 및 현재 날짜 설정 가능
    // data 기준이 현재날짜 - 12 month 이므로 해당날짜로 설정되어 있으나,
    // 필요에 따라 변경가능
    var startYear = moment().subtract(15, 'month'),
        endYear = moment().subtract(4, 'month'),
        currYear = endYear

    useEffect(() => {
        const svg = d3
            .select('#map-canvas')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .style('background-color', '#f2f2f7') //지도 배경색 변경
        const projection = d3
            .geoMercator()
            .scale(11000) //스케일
            //.scale(1)
            //.translate([0, 0])
            //.rotate([-10, 1, 0]) //지도 회전
            .center([127, 37.6]) //서울 중심좌표
            .translate([width / 3, height / 4])
        const path = d3.geoPath().projection(projection)
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

        const tip = d3
            .tip()
            .attr('class', 'toolTipMap')
            .attr('id', 'toolTipMap')
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

        map.call(tip)
        //<<----- adding slider ----->>
        // var rangeDate = d3.range(0, 12).map((d) => {
        //     //moment(startYear).add(d, 'month').format('YYYY-MM')
        //     let rangeValue = moment(startYear).add(d, 'month').format('YYYY-MM')

        //     return new Date(
        //         moment(rangeValue).format('YYYY'),
        //         moment(rangeValue).format('MM'),
        //         1
        //     )
        // })
        // console.log('rangedata???', rangeDate)

        // var slider = sliderBottom()
        //     .min(d3.min(rangeDate))
        //     .max(d3.max(rangeDate))
        //     .step(1000 * 60 * 60 * 24 * 30)
        //     .width(900)
        //     .tickFormat(timeFormat('%Y-%m'))
        //     .tickValues(rangeDate)
        //     .default(d3.max(rangeDate))
        //     .on('onchange', (val) => {
        //         d3.select('p#mapValue-time').text(d3.timeFormat('%Y-%m')(val))
        //     })

        // d3.select('#mapSlider')
        //     .append('svg')
        //     .attr('width', 1000)
        //     .attr('height', 100)
        //     .append('g')
        //     // .attr('transfrom', 'translate(30,30)')
        //     .call(slider)

        // d3.select('p#mapValue-time').text(d3.timeFormat('%Y')(slider.value()))
        //<<----- slider ----->>

        ChangeGeoLocation(geojson, currYear).then((data) => {
            // console.log('data???', data)
            svg.append('g')
                .attr('fill', 'gray')
                .attr('fill-opacity', 0.5)
                .attr('stroke', '#fff')
                .attr('stroke-width', 0.5)
                .selectAll('circle')
                //.attr('class', 'population')
                .data(data.filter((d) => d.loc))
                .join('circle')
                .on('mouseover', function (d, i, n) {
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
                .attr('transform', (d) => `translate(${d.loc})`)
                .attr('id', (d) => `${d.name}`)
                .attr('cx', (d) => projection(d.loc)[0] - 125)
                .attr('cy', (d) => projection(d.loc)[1] - 40)
                .transition()
                .duration(500)
                .attr('r', (d) => d3.scaleSqrt().range([10, 40])(d.cnt) / 100)
        })
    })

    return (
        <MapContainer>
            <h1>Person Map Viewer</h1>
            <div></div>
            <div id="mapSlider">
                <p id="mapValue-time"></p>
            </div>
            <div id="map-canvas"></div>
        </MapContainer>
    )
}

export default PersonMap

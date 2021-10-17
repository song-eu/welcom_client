import React, { useEffect, useState, useCallback, useRef } from 'react'
import { PieChartStyle } from '../style/chartStyle'
import { MapContainer } from '../style/mapStyle'
import * as d3module from 'd3'
import d3Tip from 'd3-tip'

import { geoEqualEarth, geoPath } from 'd3-geo'
import * as d3Legend from 'd3-svg-legend'
import { sampleData } from '../../sampledata/barData'
import koreaGeoData from './source/skorea-provinces-2018-topo-simple.json'
import * as topojson from 'topojson'

const d3 = {
    ...d3module,
    tip: d3Tip,
}

const PersonMap = (props) => {
    const width = 1000,
        height = 1200
    //const projection = geoEqualEarth();
    //const path = geoPath(projection);
    const geojson = topojson.feature(
        koreaGeoData,
        koreaGeoData.objects.skorea_provinces_2018_geo
    )
    const center = d3.geoCentroid(geojson)
    console.log('geojson???', geojson)

    useEffect(() => {
        const svg = d3
            .select('#map-canvas')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .style('background-color', '#f2f2f7') //지도 배경색 변경
        const projection = d3
            .geoMercator()
            .scale(1) //스케일
            .translate([0, 0])
        // .rotate([-10, 1, 0]) //지도 회전
        // .center([127, 37.6]) //서울 중심좌표
        // .translate([width / 2, height / 2])
        const path = d3.geoPath().projection(projection)
        const bounds = path.bounds(geojson)
        const widthScale = (bounds[1][0] - bounds[0][0]) / width
        const hieghtScale = (bounds[1][1] - bounds[0][1]) / height
        const scale = 1 / Math.max(widthScale, hieghtScale)
        const xoffset =
            width / 2 - (scale * (bounds[1][0] + bounds[0][0])) / 2 + 10
        const yoffset =
            height / 2 - (scale * (bounds[1][1] + bounds[0][1])) / 2 + 80
        const offset = [xoffset, yoffset]
        projection.scale(scale).translate(offset)

        var map = svg
            .append('g')
            .selectAll('path')
            .data(geojson.features)
            .enter()
            .append('path')
            .attr('d', path)
            .attr('fill', '#9980FA') // 지도 내부 색깔
            // 자목 색 #ed8b70
            // 회색 #9980FA
            .attr('stroke', '#fff') // 지도 선 색깔 변경
        // 오렌지색 liner #de6a6c
    })

    return (
        <MapContainer>
            <h1>Person Map Viewer</h1>
            <div id="map-canvas"></div>
        </MapContainer>
    )
}

export default PersonMap

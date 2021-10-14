import React, { useEffect, useState, useCallback, useRef } from 'react'
import { PieChartStyle } from '../style/chartStyle'
import { MapContainer } from '../style/mapStyle'
import * as d3module from 'd3'
import d3Tip from 'd3-tip'
import * as topojson from 'topojson'
import { geoEqualEarth, geoPath } from 'd3-geo'
import * as d3Legend from 'd3-svg-legend'
import { sampleData } from '../../sampledata/barData'

const d3 = {
    ...d3module,
    tip: d3Tip,
}

const PersonMap = (props) => {
    const koreaMap = require('./HangJeongDong_ver20210701.geojson')
    const width = 800,
        height = 700
    //const projection = geoEqualEarth();
    //const path = geoPath(projection);
    const chartWidth = 300
    const chartHeight = 300
    const backgroundColor = '#EAF2FA'
    const landColor = '#09A573'
    const landStroke = '#FCF5E9'
    const markerColor = '#E26F99'
    const center = d3.geoCentroid(koreaMap)

    const canvas = d3.select('#map-canvas')

    const svg = canvas.append('svg').attr('width', width).attr('height', height)

    const projection = d3.geoMercator().translate([width / 2, height / 2])

    const path = d3.geoPath().projection(projection)

    useEffect(() => {
        const projection = d3
            .geoMercator()
            .scale(1000) //스케일
            //.rotate([-10, 1, 0]) //지도 회전
            .center([127, 37.6]) //서울 중심좌표
            .translate([width / 2, height / 2])

        const pathGenerator = d3.geoPath(projection)
        const svg = d3
            .select('#mapView')
            .append('svg')
            .attr('width', chartWidth)
            .attr('height', chartHeight)
        var map = svg.append('g').attr('id', 'map')
        var places = svg.append('g').attr('id', 'places')

        d3.json(
            './source/sido_simplified_topo_q1e4.json',
            function (err, data) {
                console.log(data)
            }
        )

        //C:\welcome_dashboard\welcom_client\src\components\chart\source\sido_simplified_topo_q1e4.json
    })

    // svg.selectAll('circle')
    //     .data(markers)
    //     .join('circle')
    //     .attr('cx', (d) => projection(d.geometry.coordinates)[0])
    //     .attr('cy', (d) => projection(d.geometry.coordinates)[1])
    //     .attr('r', 4)
    //     .attr('fill-opacity', 0.5)
    //     .attr('fill', markerColor)
    //     .attr('stroke', markerColor)

    return (
        <MapContainer>
            <h1>Person Map Viewer</h1>
            <div id="map-canvas"></div>
        </MapContainer>
    )
}

export default PersonMap

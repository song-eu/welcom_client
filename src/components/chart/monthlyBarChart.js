import React, { useEffect, useState, useCallback, useRef } from 'react';
import { MonthlyBarChartStyle } from '../style/MonthlyBarChartStyle';
import * as d3 from 'd3';

const MonthlyBarChart = (props) => {

    const width = 900;
    const height = 500;
    const margin = {top: 40, left: 40, bottom: 40, right: 40};
    
    var sample = [
        {NAME: 'a', VALUE: 10},
        {NAME: 'b', VALUE: 29},
        {NAME: 'c', VALUE: 32},
        {NAME: 'd', VALUE: 25},
        {NAME: 'e', VALUE: 23},
        {NAME: 'f', VALUE: 15}
    ];
    var data = props.data? props.data:sample


    useEffect(() => {
        const x = d3.scaleBand()
        // .scaleBand() 그래프의 막대의 반복되는 범위를 정해줍니다.
        .domain(data.map(d => d.NAME))
        // .domain() 각각의 막대에 순서대로 막대에 매핑합니다.
        .range([margin.left, width - margin.right])
        // 시작위치와 끝 위치로 눈금의 범위를 지정합니다.
        .padding(0.2);
        // 막대의 여백을 설정합니다.
        
        // line chart와 동일
        const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.VALUE)]).nice()
            .range([height - margin.bottom, margin.top]);
        
        // line chart와 동일
        const xAxis = g => g
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(x)
            .tickSizeOuter(0));
        
        // line chart와 동일
        const yAxis = g => g
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select('.domain').remove());
        
        // line chart와 동일
        const svg = d3.select('#barchart')
                        .append('svg')
                        .style('width', width)
                        .style('height', height);
        
        svg.append('g').call(xAxis);
        svg.append('g').call(yAxis);
        svg.append('g')
        .attr('fill', 'steelblue')
        .selectAll('rect').data(data).enter().append('rect')
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
        .attr('x', d => x(d.NAME))
        .attr('y', d => y(d.VALUE))
        .attr('height', d => y(0) - y(d.VALUE))
        .attr('width', x.bandwidth());
    }, [])

    return(
        <MonthlyBarChartStyle>
            <div id= "barchart">
            </div>
        </MonthlyBarChartStyle>
    )
}

export default MonthlyBarChart;

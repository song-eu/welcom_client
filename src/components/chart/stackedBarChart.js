import React, { useEffect, useState, useCallback, useRef } from 'react';
import { MonthlyBarChartStyle } from '../style/chartStyle';
import * as d3 from 'd3';
import {sampleData} from '../../sampledata/barData'
import GenderAgeDivergingChart from './genderAgeDiverging';
import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';

const StackedBarChart = (props) => {

    const width = 900;
    const height = 500;
    const margin = {top: 40, left: 40, bottom: 40, right: 40};
    
    var sample = [
        { NAME: '2013-01', VALUE: 53, VALUE2: 100, VALUE3: 425 },
        { NAME: '2013-02', VALUE: 165, VALUE2: 134, VALUE3: 54  },
        { NAME: '2013-03', VALUE: 269, VALUE2: 125, VALUE3: 345  },
        { NAME: '2013-04', VALUE: 344, VALUE2: 145, VALUE3: 730  },
        { NAME: '2013-05', VALUE: 376, VALUE2: 435, VALUE3: 366  },
        { NAME: '2013-06', VALUE: 410, VALUE2: 843, VALUE3: 414  },
        { NAME: '2013-07', VALUE: 421, VALUE2: 354, VALUE3: 30  },
        { NAME: '2013-08', VALUE: 405, VALUE2: 76, VALUE3: 70  },
        { NAME: '2013-09', VALUE: 376, VALUE2: 43, VALUE3: 658  },
        { NAME: '2013-10', VALUE: 359, VALUE2: 965, VALUE3: 308  },
        { NAME: '2013-11', VALUE: 392, VALUE2: 347, VALUE3: 970  },
        { NAME: '2013-12', VALUE: 433, VALUE2: 107, VALUE3: 64  },
        { NAME: '2014-01', VALUE: 455, VALUE2: 560, VALUE3: 686  },
        { NAME: '2014-02', VALUE: 478, VALUE2: 501, VALUE3: 820  }
    ];
    // 소아 암병원 어린이 본원 강남 ? 소아?
    var data = sample
    //console.log('data?'. data, sampleData)
    //var data = sampleData

    useEffect(() => {
        const index = new Map(data.map((d, i) => [d, i]));
        console.log('data.columns', index)
        //const subgroups = data.columns.slice(1)
        var x = d3.scaleBand()
        // .scaleBand() 그래프의 막대의 반복되는 범위를 정해줍니다.
        .domain(data.map(d => d.NAME))
        // .domain() 각각의 막대에 순서대로 막대에 매핑합니다.
        .range([margin.left, width - margin.right])
        // 시작위치와 끝 위치로 눈금의 범위를 지정합니다.
        .padding(0.4);
        // 막대의 여백을 설정합니다.
        
        // line chart와 동일
        var y = d3.scaleLinear()
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
        .call(g => g.select('.domain').remove())
       //y axis grid 추가
        .append('g')
        .attr('class', 'grid')
                        .call(d3.axisLeft()
                                .scale(y)
                                .tickSize(-width, 0,0)
                                .tickFormat(''))
                        
                        
        
        // line chart와 동일
        const svg = d3.select('#barchart')
                        .append('svg')
                        .style('width', width-margin.left)
                        .style('height', height)
 
        svg.append('g').call(xAxis);
        svg.append('g').call(yAxis)
            //grid line color 추가
            .call(g => g.selectAll(".tick:not(:first-of-type) line")
                        .attr("class", "axis_y_tick")
                        .attr("stroke", "#bdc3c7"));
        
        // const stackedData = d3.stack()
        // .keys(subgroups)
        // (data)
        
        const barGroups = svg.selectAll()
                    .data(data)
                    .enter()
                    .append('g')
                    
        barGroups
            .append('rect')
            .attr('fill', '#BBD2C5')
            .attr('class', 'bar')
            .attr('x', d => x(d.NAME))
            .attr('width', x.bandwidth())
            //.attr('y', d => y(d.VALUE))
            //.attr('height', d => y(0) - y(d.VALUE))
            .attr('y', y(0))
            //.attr('height', (d) => y(0))
            //항목마다 mouse over 효과 추가
            .on('mouseenter', function (actual, i) {
                d3.selectAll('.value')
                    .attr('opacity', 0);
    
                d3.select(this)
                    .transition()
                    .duration(300)
                    .attr('opacity', 0.6)
                    .attr('x', (a) => x(a.NAME) - 5)
                    .attr('width', x.bandwidth() + 10)
        
                const yValue = y(i.VALUE)

                let line = svg.append('line')
                    .attr('id', 'limit')
                    .attr('stroke', '#ffc500')
                    .style('stroke-width', '2px')
                    .style('stroke-dasharray', 2)
                    .attr('x1', margin.left)
                    .attr('y1', yValue)
                    .attr('x2', width)
                    .attr('y2', yValue)
                    

                barGroups.append('text')
                    .attr('class', 'divergence')
                    .attr('x', (a) => x(a.NAME) +x.bandwidth()/2)
                    .attr('y', (a) => y(a.VALUE) + 30)
                    .attr('fill', '#616161')
                    .attr('text-anchor', 'middle')
                    .text((a, idx) => {
                        const divergence = (a.VALUE - i.VALUE).toFixed(1)

                        let text = ''
                        if(divergence > 0) text += '+'
                        text += `${divergence}%`

                        return idx!== i? text : '';

                    })
                
            })
            .on('mouseleave', function (actual, i) {
                d3.selectAll('.value')
                .attr('opacity', 1)
        
                d3.select(this)
                    .transition()
                    .duration(300)
                    .attr('opacity', 1)
                    .attr('x', (a) => x(a.NAME))
                    .attr('width', x.bandwidth())
        
                svg.selectAll('#limit').remove()
                svg.selectAll('.divergence').remove()   
        })
        barGroups.selectAll('rect')
        .transition()
        .duration(800)
        .attr('y', (d) => y(d[1]))
        .attr('height', (d) =>  y(d[0])- y(d[1]) )
        .delay((d, i) => i*100)
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
        
        // barGroups
        //     .append('text')
        //     .attr('class', 'value')
        //     .attr('x', (a) => x(a.NAME) + x.bandwidth()/2)
        //     .attr('y', (a) => y(a.VALUE) +30)
        //     .attr('text-anchor', 'middle')
        //     .text((a) => `${a.VALUE}`)

        
    }, [])

    return(
        <MonthlyBarChartStyle>
            <h1>{props.header}</h1>
            <div id= "barchart">
            </div>
        </MonthlyBarChartStyle>
    )
}

export default StackedBarChart;

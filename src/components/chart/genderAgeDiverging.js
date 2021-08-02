import React, { useEffect, useState, useCallback, useRef } from 'react';
import * as d3 from 'd3'
import {GenderChartSytle} from '../style/chartStyle'

const GenderAgeDivergingChart = (props) => {
    // SET UP DIMENSIONS
    var w = 500,
    h = 406;
  
    // margin.middle is distance from center line to each y-axis
    var margin = {
    top: 20,
    right: 20,
    bottom: 24,
    left: 20,
    middle: 28
    };
    
    // the width of each side of the chart
    var regionWidth = w/2 - margin.middle;

    // these are the x-coordinates of the y-axes
    var pointA = regionWidth,
    pointB = w - regionWidth;

    // some contrived data
    var exampleData = [
    {group: '0-9', male: 10, female: 12},
    {group: '10-19', male: 14, female: 15},
    {group: '20-29', male: 15, female: 18},
    {group: '30-39', male: 18, female: 18},
    {group: '40-49', male: 21, female: 22},
    {group: '50-59', male: 19, female: 24},
    {group: '60-69', male: 15, female: 14},
    {group: '70-79', male: 8, female: 10},
    {group: '80-89', male: 4, female: 5},
    {group: '90-99', male: 2, female: 3},
    {group: '100-109', male: 1, female: 1},
    ];
    console.log('props.header', props.header)

    useEffect(() => {
                
        // GET THE TOTAL POPULATION SIZE AND CREATE A FUNCTION FOR RETURNING THE PERCENTAGE
        var totalPopulation = d3.sum(exampleData, function(d) { return d.male + d.female; })
        
        
        // CREATE SVG
        var svg = d3.select('#negBarChart').append('svg')
        .attr('width', margin.left + w + margin.right)
        .attr('height', margin.top + h + margin.bottom)
        // ADD A GROUP FOR THE SPACE WITHIN THE MARGINS
        .append('g')
            .attr('transform', translation(margin.left, margin.top));

        // find the maximum data value on either side
        //  since this will be shared by both of the x-axes
        var maxValue = Math.max(
        d3.max(exampleData, (d) => d.male),
        d3.max(exampleData, (d) => d.female)
        );
        // SET UP SCALES
        const color = d3.scaleLinear().domain([0,1]).range([0.29, 0.74]);
        
        // the xScale goes from 0 to the width of a region
        //  it will be reversed for the left x-axis
        var xScale = d3.scaleLinear()
        .domain([0, maxValue])
        .range([0, regionWidth])
        .nice();

        var xScaleLeft = d3.scaleLinear()
        .domain([0, maxValue])
        .range([regionWidth, 0]);

        var xScaleRight = d3.scaleLinear()
        .domain([0, maxValue])
        .range([0, regionWidth]);

        var yScale = d3.scaleBand()
         .domain(exampleData.map(function(d) { return d.group; }))
         .rangeRound([h,0])
         .padding(0.1);


        // SET UP AXES
        var yAxisLeft = g => g
        .call(d3.axisRight(yScale)
            .tickSize(4,0)
            .tickPadding(margin.middle-4))

        var yAxisRight = g => g
        .call(d3.axisLeft(yScale)
            .tickSize(4,0)
            .tickFormat(''))
        

        var xAxisRight = g => g
        .call(d3.axisBottom(xScale)
         //   .tickFormat(d3.format('%'))
            );

        var xAxisLeft = g => g
        // REVERSE THE X-AXIS SCALE ON THE LEFT SIDE BY REVERSING THE RANGE
        .call(d3.axisBottom(xScale.copy().range([pointA, 0]))
       // .tickFormat(d3.format('%'))
        );
       

        // MAKE GROUPS FOR EACH SIDE OF CHART
        // scale(-1,1) is used to reverse the left side so the bars grow left instead of right
        var leftBarGroup = svg.append('g')
        .attr('transform', translation(pointA, 0) + 'scale(-1,1)');
        var rightBarGroup = svg.append('g')
        .attr('transform', translation(pointB, 0));

        // DRAW AXES
        svg.append('g')
        .attr('class', 'axis y left')
        .attr('transform', translation(pointA, 0))
        .call(yAxisLeft)
        .selectAll('text')
        .style('text-anchor', 'middle');

        svg.append('g')
        .attr('class', 'axis y right')
        .attr('transform', translation(pointB, 0))
        .call(yAxisRight);

        svg.append('g')
        .attr('class', 'axis x left')
        .attr('transform', translation(0, h))
        .call(xAxisLeft);

        svg.append('g')
        .attr('class', 'axis x right')
        .attr('transform', translation(pointB, h))
        .call(xAxisRight);

        // DRAW BARS
        leftBarGroup.selectAll('.bar.left')
        .data(exampleData)
        .enter().append('rect')
            .attr('class', 'bar left')
            .attr("fill", d3.interpolateSpectral(color(1)))
            .attr('x', 0)
            .attr('y', function(d) { return yScale(d.group); })
        //    .attr('width', function(d) { return xScale(d.male); })
            .attr('height', yScale.bandwidth())
            .transition()
            .duration(800)
            .attr('width', (d) => xScale(d.male))

        rightBarGroup.selectAll('.bar.right')
        .data(exampleData)
        .enter().append('rect')
            .attr('class', 'bar right')
            .attr("fill", d3.interpolateRdYlBu(color(0)))
            .attr('x', 0)
            .attr('y', function(d) { return yScale(d.group); })
        //    .attr('width', function(d) { return xScale(d.female); })
            .attr('height', yScale.bandwidth())
            .transition()
            .duration(800)
            .attr('width', (d) => xScale(d.female));


        // so sick of string concatenation for translations
        function translation(x,y) {
        return 'translate(' + x + ',' + y + ')';
        }
        
    }, [])
    return (
        <GenderChartSytle>
            <h1>{props.header}</h1>
            <div id = "negBarChart">
            </div>
        </GenderChartSytle>
    )
}

export default GenderAgeDivergingChart;

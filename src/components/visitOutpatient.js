import React, { useEffect, useState, useCallback, useRef } from 'react';
import MonthlyBarChart from './chart/monthlyBarChart';
import DeptHorizonBarChart from './chart/deptHorizonBarChart';
import GenderAgeBarChart from './chart/genderAgeBarChart';
import CircleCart from './chart/circleChart';
import * as d3 from 'd3'

const VisitOutpatient = (props) => {
    let totalThisMonth, avgThisMonth, totalOutpatient;

    const divRef = useRef();
    const [graphHeight, setGraphData] = useState(0);
    let incomingData = [23,4335,6,45354,23,132,99999];


    return(
        <div>
            <h1>Visit Outpatient</h1>
            <div className = "totalThisMonth">
                <div>이번달 총 외래 환자 수</div>
                <div>{totalThisMonth? totalThisMonth:3000} 명</div>
            </div>
            <div className = "avgThisMonth">
                <div>월 평균 외래 환자 수</div>
                <div>{avgThisMonth? avgThisMonth:3000} 명</div>
            </div>
            <div className = "totalOutpatient">
                <div>서울대병원 총 외래 환자 수</div>
                <div>{totalOutpatient? totalOutpatient:30000} 명</div>
            </div>
            <MonthlyBarChart />
            <DeptHorizonBarChart />
            <GenderAgeBarChart />
            <CircleCart />
        </div>
    )
}
export default VisitOutpatient;
import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import MonthlyBarChart from './chart/monthlyBarChart';
import DeptHorizonBarChart from './chart/deptHorizonBarChart';
import GenderAgeBarChart from './chart/genderAgeBarChart';
import CircleCart from './chart/circleChart';
import { BackgroudWrap, SmallBoxstyle, HeaderWrap,BigBoxstyle } from './style/backgraound';


const VisitOutpatient = (props) => {
    let totalThisMonth, avgThisMonth, totalOutpatient;

    const divRef = useRef();
    const [graphHeight, setGraphData] = useState(0);
    let incomingData = [23,4335,6,45354,23,132,99999];
    const [outBarchartData, setoutBarchartData ] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try{
            const response = await axios.get('http://localhost:30000/api/visitOut/');
            console.log('res: ', response)
            setoutBarchartData(response.data)
        } catch(e) {
            console.log(e);
            setError(true);
        }
    }
    useEffect(() =>{
        fetchData();
    }, [])



    return(
            <div>
                <HeaderWrap>
                    <h1>SNUH Data Dashboard</h1>
                </HeaderWrap>
                <div>Visit</div>
                
                <div className="firstLine">
                    <BigBoxstyle>
                        <SmallBoxstyle>
                            <div className = "totalThisMonth">
                                <div className ='countText'>이번달 총 외래 환자 수</div>
                                <div className = 'countNumber'>{totalThisMonth? totalThisMonth:3000} 명</div>
                            </div>
                        </SmallBoxstyle>
                        <SmallBoxstyle>
                        <div className = "avgThisMonth">
                            <div className ='countText'>월 평균 외래 환자 수</div>
                            <div className = 'countNumber'>{avgThisMonth? avgThisMonth:3000} 명</div>
                        </div>
                        </SmallBoxstyle>
                        <SmallBoxstyle>
                        <div className = "totalOutpatient">
                                <div className ='countText'>서울대병원 총 외래 환자 수</div>
                                <div className = 'countNumber'>{totalOutpatient? totalOutpatient:30000} 명</div>
                            </div>
                        </SmallBoxstyle>
                    </BigBoxstyle>
                    {outBarchartData? <MonthlyBarChart data={outBarchartData} />:null}
                </div>
                
                <DeptHorizonBarChart />
                <GenderAgeBarChart />
                <CircleCart />
            </div>
    )
}
export default VisitOutpatient;
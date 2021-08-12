import React, { useEffect, useState, useCallback, useRef } from 'react'
import axios from 'axios'
import MonthlyBarChart from './chart/monthlyBarChart'
import DeptHorizonBarChart from './chart/deptHorizonBarChart'
import GenderAgeBarChart from './chart/genderAgeBarChart'
import GenderAgeDivergingChart from './chart/genderAgeDiverging'
import CircleCart from './chart/circleChart'
import StackedBarChart from './chart/stackedBarChart'
import StackedBarChartTest from './chart/stackedBarCharttest'
import {
    BackgroudWrap,
    SmallBoxstyle,
    HeaderWrap,
    BigBoxstyle,
    OutPatientBg,
    CategoryButtons,
    PageHeaderWrap,
} from './style/backgraound'
import moment from 'moment'
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import

const VisitOutpatient = (props) => {
    let totalThisMonth, avgThisMonth, totalOutpatient

    const divRef = useRef()
    const [graphHeight, setGraphData] = useState(0)
    let incomingData = [23, 4335, 6, 45354, 23, 132, 99999]
    const [outBarchartData, setoutBarchartData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const outPatientVisitBarChart = 'Monthly Oupatinet Visit'
    const outPatientHBarChart = `Visit Top 10 Department in ${moment().format(
        'MMMM'
    )}`
    const outPatientGenderChart = 'Visit by Age and Sex'
    const outPatientPieChart = 'Visit by Nation'
    var currMonthName = moment().format('MMMM')
    //console.log('currMonthName', currMonthName)

    const fetchData = async () => {
        try {
            const response = await axios.get(
                'http://localhost:30000/api/visitOut/'
            )
            console.log('res: ', response)
            setoutBarchartData(response.data)
        } catch (e) {
            console.log(e)
            setError(true)
        }
    }
    useEffect(() => {
        //        fetchData();
    }, [])

    return (
        <div>
            <PageHeaderWrap>
                <h1>
                    <span>Outpatient Visit</span> / <span>Inpatient Visit</span>
                </h1>
            </PageHeaderWrap>

            <CategoryButtons>
                <div id="data1" className="category">
                    본원
                </div>
                <div id="data2" className="category">
                    암병원
                </div>
                <div id="data3" className="category">
                    어린이
                </div>
                <div id="data4" className="category">
                    강남
                </div>
                <div id="data5" className="category">
                    소아
                </div>
            </CategoryButtons>
            <OutPatientBg>
                <div className="firstLine">
                    <BigBoxstyle>
                        <SmallBoxstyle>
                            <div className="totalThisMonth">
                                <div className="countText">
                                    이번달 총 외래 환자 수
                                </div>
                                <div className="countNumber">
                                    {totalThisMonth ? totalThisMonth : 3000} 명
                                </div>
                            </div>
                        </SmallBoxstyle>
                        <SmallBoxstyle>
                            <div className="avgThisMonth">
                                <div className="countText">
                                    월 평균 외래 환자 수
                                </div>
                                <div className="countNumber">
                                    {avgThisMonth ? avgThisMonth : 3000} 명
                                </div>
                            </div>
                        </SmallBoxstyle>
                        <SmallBoxstyle>
                            <div className="totalOutpatient">
                                <div className="countText">
                                    서울대병원 총 외래 환자 수
                                </div>
                                <div className="countNumber">
                                    {totalOutpatient ? totalOutpatient : 30000}{' '}
                                    명
                                </div>
                            </div>
                        </SmallBoxstyle>
                    </BigBoxstyle>
                    {outBarchartData ? (
                        <StackedBarChartTest
                            data={outBarchartData}
                            header={outPatientVisitBarChart}
                        />
                    ) : (
                        <StackedBarChartTest header={outPatientVisitBarChart} />
                    )}
                </div>
            </OutPatientBg>
            <OutPatientBg>
                <div>
                    <DeptHorizonBarChart header={outPatientHBarChart} />
                    <GenderAgeDivergingChart header={outPatientGenderChart} />
                    <CircleCart header={outPatientPieChart} />
                </div>
            </OutPatientBg>
        </div>
    )
}
export default VisitOutpatient

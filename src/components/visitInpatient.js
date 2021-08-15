import React, { useEffect, useState, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'

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

const VisitInpatient = (props) => {
    let totalThisMonth, avgThisMonth, totalOutpatient

    const divRef = useRef()
    const [graphHeight, setGraphData] = useState(0)
    let incomingData = [23, 4335, 6, 45354, 23, 132, 99999]
    const [outBarchartData, setoutBarchartData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [selectData, setSelectData] = useState(null)
    const thisMonth = moment().format('MMMM')
    const outPatientVisitBarChart = 'Monthly Oupatinet Visits'
    const outPatientHBarChart = `Outpatient Visits by Department in ${thisMonth}`
    const outPatientGenderChart = 'Outpatient Visit by Age & Gender'
    const outPatientPieChart = 'Outpatient Visit by Nation'
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
    const onClickUpdate = (e) => {
        console.log('e.', e.target.id)
        setSelectData(e.target.id)
        console.log('setSelectData for props?', selectData)
    }
    useEffect(() => {
        //        fetchData();
    }, [])

    return (
        <div>
            <PageHeaderWrap>
                <h1>
                    <Link to="/visitOut">
                        <div className="unSelectedLink">Outpatient Visit</div>
                    </Link>
                    <div className="selectedLink">Inpatient Visit</div>
                </h1>
            </PageHeaderWrap>

            <CategoryButtons>
                <div
                    id="data1"
                    className="category"
                    onClick={(e) => onClickUpdate(e)}
                >
                    본원
                </div>
                <div
                    id="data2"
                    className="category"
                    onClick={(e) => onClickUpdate(e)}
                >
                    암병원
                </div>
                <div
                    id="data3"
                    className="category"
                    onClick={(e) => onClickUpdate(e)}
                >
                    어린이
                </div>
                <div
                    id="data4"
                    className="category"
                    onClick={(e) => onClickUpdate(e)}
                >
                    강남
                </div>
                <div
                    id="data5"
                    className="category"
                    onClick={(e) => onClickUpdate(e)}
                >
                    소아
                </div>
            </CategoryButtons>
            <OutPatientBg>
                <div className="firstLine">
                    <BigBoxstyle>
                        <SmallBoxstyle>
                            <div className="totalThisMonth">
                                <div className="countText">
                                    Average Daily <br />
                                    Inpatient Visits
                                </div>
                                <div className="countNumber">
                                    {totalThisMonth ? totalThisMonth : 3000} 명
                                </div>
                            </div>
                        </SmallBoxstyle>
                        <SmallBoxstyle>
                            <div className="avgThisMonth">
                                <div className="countText">
                                    Total Inpatient <br /> Visits in
                                    {' ' + thisMonth}
                                </div>
                                <div className="countNumber">
                                    {avgThisMonth ? avgThisMonth : 3000} 명
                                </div>
                            </div>
                        </SmallBoxstyle>
                        <SmallBoxstyle>
                            <div className="totalOutpatient">
                                <div className="countText">
                                    SNUH Total <br /> Outpatient Visits
                                </div>
                                <div className="countNumber">
                                    {totalOutpatient ? totalOutpatient : 30000}
                                    명
                                </div>
                            </div>
                        </SmallBoxstyle>
                    </BigBoxstyle>
                    <BigBoxstyle>
                        <SmallBoxstyle>
                            <div className="totalThisMonth">
                                <div className="countText">
                                    Average Daily <br />
                                    Inpatient Visits
                                </div>
                                <div className="countNumber">
                                    {totalThisMonth ? totalThisMonth : 3000} 명
                                </div>
                            </div>
                        </SmallBoxstyle>
                        <SmallBoxstyle>
                            <div className="avgThisMonth">
                                <div className="countText">
                                    Total Inpatient <br /> Visits in
                                    {' ' + thisMonth}
                                </div>
                                <div className="countNumber">
                                    {avgThisMonth ? avgThisMonth : 3000} 명
                                </div>
                            </div>
                        </SmallBoxstyle>
                        <SmallBoxstyle>
                            <div className="totalOutpatient">
                                <div className="countText">
                                    SNUH Total <br /> Outpatient Visits
                                </div>
                                <div className="countNumber">
                                    {totalOutpatient ? totalOutpatient : 30000}
                                    명
                                </div>
                            </div>
                        </SmallBoxstyle>
                    </BigBoxstyle>
                    {outBarchartData ? (
                        <StackedBarChart
                            data={outBarchartData}
                            header={outPatientVisitBarChart}
                        />
                    ) : (
                        <StackedBarChart
                            header={outPatientVisitBarChart}
                            // selectData={selectData}
                        />
                    )}
                    <GenderAgeDivergingChart
                        header={outPatientGenderChart}
                        selectData={selectData}
                    />
                </div>
            </OutPatientBg>
            <OutPatientBg>
                <div>
                    <DeptHorizonBarChart
                        header={outPatientHBarChart}
                        selectData={selectData}
                    />
                    <MonthlyBarChart
                        header={outPatientHBarChart}
                        selectData={selectData}
                    />
                    <CircleCart
                        header={outPatientPieChart}
                        selectData={selectData}
                    />
                </div>
            </OutPatientBg>
            <OutPatientBg>
                <div></div>
            </OutPatientBg>
        </div>
    )
}
export default VisitInpatient

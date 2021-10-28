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
import PersonMap from './chart/personMap'
import {
    RowStyle,
    BoxStyle,
    CountButton,
    ButtonRow,
    BigBox,
} from './style/backgraound'
import moment from 'moment'
import * as d3 from 'd3'
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import

const VisitOutpatient = (props) => {
    const [error, setError] = useState(null)
    const [selectData, setSelectData] = useState(null)
    const thisMonth = moment().subtract(1, 'month').format('MMMM')
    const outPatientVisitBarChart = 'Monthly Oupatinet Visits by Hospital'
    const outPatientHBarChart = `Outpatient Visits by Department in ${thisMonth}`
    const outPationtTotalBarChart = `Monthly Visit total (Outpatient & EM)`
    const outPatientGenderChart = `Outpatient Visit by Age & Gender in ${thisMonth}`
    const outPatientPersonMap = `Outpatient Visit by Location in ${thisMonth}`
    const outPatientPieChart = 'Outpatient Visit by Nation'

    const dataLocation = '/outpatientData'
    const outBarchartData = dataLocation + '/1_1year_total_by_hospital.csv'
    const outDepchartData = dataLocation + '/2_visit_dept_rank.csv'
    const outPersonMapData = dataLocation + '/3_1year_weekly_visits_addr.csv'
    const outGenderAgeData = dataLocation + '/4_AGE_GENDER_GROUP.csv'
    const outMonthlyBarData = dataLocation + '/5_1year_monthly_total.csv'

    var format = d3.format(',d')

    var numberAll = 3859411

    let numAll = d3.select('.numberAll')
    numAll
        .datum(numberAll)
        .transition()
        .duration(5000)
        .textTween((d) => {
            const i = d3.interpolate(0, d)
            return function (t) {
                format(i(t))
            }
        })

    const fetchData = async () => {
        try {
            const response = await axios.get(
                'http://localhost:30000/api/visitOut/'
            )
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
        <BigBox>
            <div>
                <ButtonRow>
                    <CountButton>
                        <div>서울대병원 전체</div>
                        <div className="numberAll"></div>
                    </CountButton>
                    <CountButton>
                        <div>본원 방문</div>
                        <div className="number">2,801,323</div>
                    </CountButton>
                    <CountButton>
                        <div>어린이병원 방문</div>
                        <div className="number">736,803</div>
                    </CountButton>
                    <CountButton>
                        <div>암병원 방문</div>
                        <div className="number">502,859</div>
                    </CountButton>
                    <CountButton>
                        <div>강남 센터 방문</div>
                        <div className="number">172,677</div>
                    </CountButton>
                </ButtonRow>

                <RowStyle>
                    <BoxStyle>
                        <StackedBarChart
                            data={outBarchartData}
                            header={outPatientVisitBarChart}
                        />

                        <DeptHorizonBarChart
                            header={outPatientHBarChart}
                            data={outDepchartData}
                        />
                    </BoxStyle>
                    <BoxStyle>
                        <PersonMap
                            header={outPatientPersonMap}
                            dataloc={outPersonMapData}
                        />
                    </BoxStyle>
                    <BoxStyle>
                        <GenderAgeDivergingChart
                            header={outPatientGenderChart}
                            dataloc={outGenderAgeData}
                        />
                        <MonthlyBarChart
                            header={outPationtTotalBarChart}
                            dataloc={outMonthlyBarData}
                        />
                    </BoxStyle>
                </RowStyle>
            </div>
        </BigBox>
    )
}
export default VisitOutpatient

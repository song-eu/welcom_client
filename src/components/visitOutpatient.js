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
import { RowStyle, BoxStyle, CountButton, ButtonRow } from './style/backgraound'
import moment from 'moment'
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import

const VisitOutpatient = (props) => {
    const [error, setError] = useState(null)
    const [selectData, setSelectData] = useState(null)
    const thisMonth = moment().format('MMMM')
    const outPatientVisitBarChart = 'Monthly Oupatinet Visits by Hospital'
    const outPatientHBarChart = `Outpatient Visits by Department in ${thisMonth}`
    const outPationtTotalBarChart = 'Monthly Visit total (Outpatient & EM)'
    const outPatientGenderChart = 'Outpatient Visit by Age & Gender'
    const outPatientPersonMap = 'Outpatient Visit by Location'
    const outPatientPieChart = 'Outpatient Visit by Nation'

    const dataLocation = '/outpatientData'
    const outBarchartData = dataLocation + '/1year_total_by_hospital.csv'
    const outDepchartData = dataLocation + '/july_visit_dept_rank.csv'
    const outPersonMapData = dataLocation + '/1_year_weekly_visits_addr.csv'
    const outGenderAgeData = dataLocation + '/july_AGE_GENDER_GROUP.csv'
    const outMonthlyBarData = dataLocation + '/1year_monthly_total.csv'

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
        <div>
            <ButtonRow>
                <CountButton>
                    <div>서울대병원 전체</div>
                    <div>30,000,000명</div>
                </CountButton>
                <CountButton>
                    <div>본원 방문</div>
                    <div>30,000,000명</div>
                </CountButton>
                <CountButton>
                    <div>어린이병원 방문</div>
                    <div>30,000,000명</div>
                </CountButton>
                <CountButton>
                    <div>강남병원 방문</div>
                    <div>30,000,000명</div>
                </CountButton>
                <CountButton>
                    <div>이번달 본원 방문</div>
                    <div>30,000,000명</div>
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
    )
}
export default VisitOutpatient

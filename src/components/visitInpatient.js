import React, { useEffect, useState, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import MonthlyBarChart from './chart/monthlyBarChart'
import DeptHorizonBarChart from './chart/deptHorizonBarChart'
import GenderAgeDivergingChart from './chart/genderAgeDiverging'
import StackedBarChart from './chart/stackedBarChart'
import PersonMap from './chart/personMap'
import { RowStyle, BoxStyle, ButtonRow, CountButton } from './style/backgraound'
import moment from 'moment'
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import

const VisitInpatient = (props) => {
    let totalThisMonth, avgThisMonth, totalOutpatient

    const divRef = useRef()
    const [graphHeight, setGraphData] = useState(0)
    let incomingData = [23, 4335, 6, 45354, 23, 132, 99999]
    //  const [outBarchartData, setoutBarchartData] = useState(null)
    const thisMonth = moment().format('MMMM')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const inPatientVisitBarChart = 'Monthly Inpatinet Visits by Hospital'
    const inPatientHBarChart = `Inpatient Visits by Department in ${thisMonth}`
    const inPationtTotalBarChart = 'Monthly Visit total (Inpatient)'
    const inPatientGenderChart = 'Inpatient Visit by Age & Gender'
    const inPatientPersonMap = 'Inpatient Visit by Location'

    const dataLocation = '/inpatientData'
    const inBarchartData = dataLocation + '/1year_total_by_hospital.csv'
    const inDepchartData = dataLocation + '/july_visit_dept_rank.csv'
    const inPersonMapData = dataLocation + '/1_year_weekly_visits_addr.csv'
    const inGenderAgeData = dataLocation + '/july_AGE_GENDER_GROUP.csv'
    const inMonthlyBarData = dataLocation + '/1year_monthly_total.csv'

    const fetchData = async () => {
        try {
            const response = await axios.get(
                'http://localhost:30000/api/visitOut/'
            )
            console.log('res: ', response)
            // setoutBarchartData(response.data)
        } catch (e) {
            console.log(e)
            setError(true)
        }
    }
    const onClickUpdate = (e) => {
        console.log('e.', e.target.id)
        //   setSelectData(e.target.id)
        // console.log('setSelectData for props?', selectData)
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
                        data={inBarchartData}
                        header={inPatientVisitBarChart}
                    />

                    <DeptHorizonBarChart
                        header={inPatientHBarChart}
                        data={inDepchartData}
                    />
                </BoxStyle>
                <BoxStyle>
                    <PersonMap
                        header={inPatientPersonMap}
                        dataloc={inPersonMapData}
                    />
                </BoxStyle>
                <BoxStyle>
                    <GenderAgeDivergingChart
                        header={inPatientGenderChart}
                        dataloc={inGenderAgeData}
                    />
                    <MonthlyBarChart
                        header={inPationtTotalBarChart}
                        dataloc={inMonthlyBarData}
                    />
                </BoxStyle>
            </RowStyle>
        </div>
    )
}
export default VisitInpatient

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
//slider open source
import Box from '@mui/material/Box'
import { IOSSlider } from './style/buttonStyle'
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import

const VisitOutpatient = (props) => {
    const thisMonth = moment().subtract(1, 'month').format('MMMM')
    const [error, setError] = useState(null)
    const [selectData, setSelectData] = useState(
        moment().subtract(1, 'month').format('YYYY-MM')
    )
    const outPatientVisitBarChart = 'Monthly Oupatinet Visits by Hospital'
    const outPatientHBarChart = `Outpatient Visits by Department in ${thisMonth}`
    const outPationtTotalBarChart = `Monthly Visit total (Outpatient & EM)`
    const outPatientGenderChart = `Outpatient Visit by Age & Gender in ${thisMonth}`
    const outPatientPersonMap = `Outpatient Visit by Location in ${thisMonth}`
    const outPatientPieChart = 'Outpatient Visit by Nation'

    const dataLocation = '/outpatientData'
    const outBarchartData = dataLocation + '/1_1year_total_by_hospital.csv'
    const outDepchartData = dataLocation + '/2_visit_dept_rank.csv'
    const outPersonMapData = dataLocation + '/3_1year_Monthly_visits_SIDO.json'
    const outGenderAgeData = dataLocation + '/4_AGE_GENDER_GROUP.csv'
    const outMonthlyBarData = dataLocation + '/5_1year_monthly_total.csv'

    var sliderMark = []
    for (let i = 11; i >= 0; i--) {
        let set = moment().subtract(13, 'month').format('YYYY-MM')
        let obj = {}
        obj.value = i
        obj.label = moment(set)
            .add(i + 1, 'month')
            .format('YYYY-MM')
        sliderMark.push(obj)
    }

    // console.log('sliderMardk', sliderMark)
    const handleDatePickerChange = (event, newVal) => {
        // console.log('handleDatePickerChange??', event, 'newVal?', newVal)
        console.log('value??', sliderMark[newVal].label)
        setSelectData(sliderMark[newVal].label)
    }

    function valuetext(value) {
        // console.log('valuetext value?? ', value)
        return `${sliderMark[value].label}`
    }

    function valueLabelFormat(value) {
        // console.log('valueLabelFormat value?? ', value, sliderMark[value].value)
        return `${sliderMark[value].label}`
    }

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

    var format = d3.format(',d')
    const number = {
        all: 3859411,
        HQ: 2801323,
        children: 736803,
        cc: 502859,
        kn: 172677,
    }
    useEffect(() => {
        let numAll = d3
            .select('.numberAll')
            .attr('text-anchor', 'middle')
            .attr('dy', '.3em')
        numAll
            .datum(number.all)
            .transition()
            .duration(1500)
            .textTween((d) => {
                const i = d3.interpolate(0, d)
                return function (t) {
                    return format(i(t))
                }
            })
            .delay(500)

        let numHQ = d3
            .select('.numberHQ')
            .attr('text-anchor', 'middle')
            .attr('dy', '.3em')
        numHQ
            .datum(number.HQ)
            .transition()
            .duration(1500)
            .textTween((d) => {
                const i = d3.interpolate(0, d)
                return function (t) {
                    return format(i(t))
                }
            })
            .delay(500)

        let numCH = d3
            .select('.numberCH')
            .attr('text-anchor', 'middle')
            .attr('dy', '.3em')
        numCH
            .datum(number.children)
            .transition()
            .duration(1000)
            .textTween((d) => {
                const i = d3.interpolate(0, d)
                return function (t) {
                    return format(i(t))
                }
            })
            .delay(500)

        let numCC = d3
            .select('.numberCC')
            .attr('text-anchor', 'middle')
            .attr('dy', '.3em')
        numCC
            .datum(number.cc)
            .transition()
            .duration(1000)
            .textTween((d) => {
                const i = d3.interpolate(0, d)
                return function (t) {
                    return format(i(t))
                }
            })
            .delay(500)

        let numKN = d3
            .select('.numberKN')
            .attr('text-anchor', 'middle')
            .attr('dy', '.3em')
        numKN
            .datum(number.kn)
            .transition()
            .duration(1000)
            .textTween((d) => {
                const i = d3.interpolate(0, d)
                return function (t) {
                    return format(i(t))
                }
            })
            .delay(500)
    }, [])

    return (
        <BigBox>
            <div>
                <ButtonRow>
                    <CountButton>
                        <div>서울대병원 전체</div>
                        <div className="numberAll">0</div>
                    </CountButton>
                    <CountButton>
                        <div>본원 방문</div>
                        <div className="numberHQ">0</div>
                    </CountButton>
                    <CountButton>
                        <div>어린이병원 방문</div>
                        <div className="numberCH">0</div>
                    </CountButton>

                    <CountButton>
                        <div>암병원 방문</div>
                        <div className="numberCC">0</div>
                    </CountButton>
                    <CountButton>
                        <div>강남 센터 방문</div>
                        <div className="numberKN">0</div>
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
                            dateCtrl={selectData}
                        />
                    </BoxStyle>
                    <BoxStyle>
                        <Box
                            sx={{
                                margin: '40px 40px 0 40px ',
                                width: 800,
                                color: '#fff',
                            }}
                        >
                            <IOSSlider
                                aria-label="Restricted values"
                                defaultValue={11}
                                valueLabelFormat={valueLabelFormat}
                                getAriaValueText={valuetext}
                                step={null}
                                valueLabelDisplay="auto"
                                marks={sliderMark}
                                min={0}
                                max={11}
                                onChange={handleDatePickerChange}
                            />
                        </Box>
                        <PersonMap
                            header={outPatientPersonMap}
                            dataloc={outPersonMapData}
                            dateCtrl={selectData}
                        />
                    </BoxStyle>
                    <BoxStyle>
                        <GenderAgeDivergingChart
                            header={outPatientGenderChart}
                            dataloc={outGenderAgeData}
                            dateCtrl={selectData}
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

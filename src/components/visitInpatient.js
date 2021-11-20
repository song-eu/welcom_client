import React, { useEffect, useState, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import * as d3 from 'd3'
import axios from 'axios'
import MonthlyBarChart from './chart/monthlyBarChart'
import DeptHorizonBarChart from './chart/deptHorizonBarChart'
import GenderAgeDivergingChart from './chart/genderAgeDiverging'
import StackedBarChart from './chart/stackedBarChart'
import PersonMap from './chart/personMap'
import {
    RowStyle,
    BoxStyle,
    ButtonRow,
    CountButton,
    BigBox,
} from './style/backgraound'
import moment from 'moment'

import Box from '@mui/material/Box'
import { IOSSlider } from './style/buttonStyle'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import

const VisitInpatient = (props) => {
    const [thisMonth, setThisMonth] = useState(
        moment().subtract(1, 'month').format('MMMM YYYY')
    )
    const [error, setError] = useState(null)
    const [selectData, setSelectData] = useState(
        moment().subtract(1, 'month').format('YYYY-MM')
    )
    //  const [outBarchartData, setoutBarchartData] = useState(null)
    const [loading, setLoading] = useState(false)

    const inPatientVisitBarChart = 'Monthly Inpatinet Visits by Hospital'
    const inPatientHBarChart = `Inpatient Visits by Department in ${thisMonth}`
    const inPationtTotalBarChart = 'Monthly Visit total (Inpatient)'
    const inPatientGenderChart = 'Inpatient Visit by Age & Gender'
    const inPatientPersonMap = 'Inpatient Visit by Location'

    const dataLocation = '/inpatientData'
    const inBarchartData = dataLocation + '/1_1year_total_by_hospital_in.csv'
    const inDepchartData = dataLocation + '/2_visit_dept_rank_in.json'
    const inPersonMapData =
        dataLocation + '/3_1year_Monthly_visits_SIDO_IN.json'
    const inGenderAgeData = dataLocation + '/4_AGE_GENDER_GROUP_IN.json'
    const inMonthlyBarData = dataLocation + '/5_1year_monthly_total_in.csv'

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
        setSelectData(sliderMark[11 - newVal].label)
        setThisMonth(moment(sliderMark[11 - newVal].label).format('MMMM YYYY'))
    }

    function valuetext(value) {
        return `${sliderMark[11 - value].label}`
    }

    function valueLabelFormat(value) {
        // console.log('label?', sliderMark[11 - value], value, sliderMark)
        return `${sliderMark[11 - value].label}`
    }

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
                        <Card sx={{ minWidth: 275 }} variant="outlined">
                            <CardContent>
                                <Typography
                                    variant="h5"
                                    component="div"
                                    color="text.secondary"
                                >
                                    서울대병원 전체
                                </Typography>
                                <Typography variant="body1">
                                    <br />
                                </Typography>
                                <Typography
                                    variant="h4"
                                    className="numberAll"
                                    align="right"
                                    fontWeight="700"
                                >
                                    0
                                </Typography>
                            </CardContent>
                        </Card>
                    </CountButton>
                    <CountButton>
                        <Card sx={{ minWidth: 275 }} variant="outlined">
                            <CardContent>
                                <Typography
                                    variant="h5"
                                    component="div"
                                    color="text.secondary"
                                >
                                    본원 방문 누적
                                </Typography>
                                <Typography variant="body1">
                                    <br />
                                </Typography>
                                <Typography
                                    variant="h4"
                                    className="numberHQ"
                                    align="right"
                                    fontWeight="700"
                                >
                                    0
                                </Typography>
                            </CardContent>
                        </Card>
                    </CountButton>
                    <CountButton>
                        <Card sx={{ minWidth: 275 }} variant="outlined">
                            <CardContent>
                                <Typography
                                    variant="h5"
                                    component="div"
                                    color="text.secondary"
                                >
                                    어린이병원 누적
                                </Typography>
                                <Typography variant="body1">
                                    <br />
                                </Typography>
                                <Typography
                                    variant="h4"
                                    className="numberCH"
                                    align="right"
                                    fontWeight="700"
                                >
                                    0
                                </Typography>
                            </CardContent>
                        </Card>
                    </CountButton>
                    <CountButton>
                        <Card sx={{ minWidth: 275 }} variant="outlined">
                            <CardContent>
                                <Typography
                                    variant="h5"
                                    component="div"
                                    color="text.secondary"
                                >
                                    암병원 누적
                                </Typography>
                                <Typography variant="body1">
                                    <br />
                                </Typography>
                                <Typography
                                    variant="h4"
                                    className="numberCC"
                                    align="right"
                                    fontWeight="700"
                                >
                                    0
                                </Typography>
                            </CardContent>
                        </Card>
                    </CountButton>
                    <CountButton>
                        <Card sx={{ minWidth: 275 }} variant="outlined">
                            <CardContent>
                                <Typography
                                    variant="h5"
                                    component="div"
                                    color="text.secondary"
                                >
                                    강남센터 누적
                                </Typography>
                                <Typography variant="body1">
                                    <br />
                                </Typography>
                                <Typography
                                    variant="h4"
                                    className="numberKN"
                                    align="right"
                                    fontWeight="700"
                                >
                                    0
                                </Typography>
                            </CardContent>
                        </Card>
                    </CountButton>
                </ButtonRow>
                <ButtonRow>
                    <Box
                        sx={{
                            margin: '40px 40px 0 40px ',
                            width: 800,
                            color: '#fff',
                        }}
                    >
                        <IOSSlider
                            aria-label="Time Picker"
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
                </ButtonRow>
                <RowStyle>
                    <BoxStyle>
                        <StackedBarChart
                            data={inBarchartData}
                            header={inPatientVisitBarChart}
                        />

                        <DeptHorizonBarChart
                            header={inPatientHBarChart}
                            dataloc={inDepchartData}
                            dateCtrl={selectData}
                        />
                    </BoxStyle>
                    <BoxStyle>
                        <PersonMap
                            header={inPatientPersonMap}
                            dataloc={inPersonMapData}
                            dateCtrl={selectData}
                        />
                    </BoxStyle>
                    <BoxStyle>
                        <GenderAgeDivergingChart
                            header={inPatientGenderChart}
                            dataloc={inGenderAgeData}
                            dateCtrl={selectData}
                        />
                        <MonthlyBarChart
                            header={inPationtTotalBarChart}
                            dataloc={inMonthlyBarData}
                            dateCtrl={selectData}
                        />
                    </BoxStyle>
                </RowStyle>
            </div>
        </BigBox>
    )
}
export default VisitInpatient

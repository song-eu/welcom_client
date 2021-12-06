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
import MonthlyBarLineChart from './chart/monthlyBarLineChart'
import PersonMap from './chart/personMap'
import Treemap from './chart/Treemap'

import {
    RowStyle,
    BoxStyle,
    CountButton,
    ButtonRow,
    BigBox,
    RightBack,
    LeftBack,
    BackRowStyle,
} from './style/backgraound'
import moment from 'moment'
import * as d3 from 'd3'
//slider open source
import Box from '@mui/material/Box'
import { IOSSlider } from './style/buttonStyle'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import BubbleCircleChart from './chart/BubbleChart'
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import

axios.defaults.baseURL = 'http://172.29.113.6:30003/api/visitOut/'
// axios.defaults.withCredentials = true

const VisitOutpatient = (props) => {
    const [thisMonth, setThisMonth] = useState(
        moment().subtract(1, 'month').format('MMMM YYYY')
    )
    const [thisYear, setThisYear] = useState(
        moment().subtract(1, 'month').format('YYYY')
    )
    const [error, setError] = useState(null)
    const [selectData, setSelectData] = useState(
        moment().subtract(1, 'month').format('YYYY-MM')
    )
    const [vocId, setVocId] = useState(null)
    const [codeId, setCodeId] = useState(null)
    const [vocName, setvocName] = useState(null)

    // console.log('selectData?', selectData)
    const outPatientVisitBarChart = 'Monthly Visits by Hospital'
    const outPatientHBarChart = `Patient Visits by Department Last 1 Year`
    const outPatientRightBarChart = `${vocName} Visits by Department Last 1 Year`
    const outPationtTotalBarChart = `Monthly Surgery Count`
    const outPatientGenderChart = `${vocName} Patient Age & Gender Last 1 Year`

    const patientBarChart = `${vocName} Patient Monthly Visits`
    const outPatientPersonMap = `${vocName} Visit by Location`
    const outPatientPieChart = 'Outpatient Visit by Nation'
    const outPatientTreemapHeader = `SNUH Top Diagnosis Last 1 Year`
    const patientRightTreemapHeader = `${vocName} Top Measurement Last 1 Year`
    const outPatientBubbleHeader = `SNUH Top Procedure Last 1 Year`

    const [dataLocation, setDataLocation] = useState('/outpatientData')
    const outBarchartData = dataLocation + '/1_1year_total_by_hospital_OUT.csv'
    const outDepchartData = dataLocation + '/2_visit_dept_rank_YEAR_OUT.json'
    const outPersonMapData = dataLocation + '/3_1year_Monthly_visits_SIDO.json'
    const outGenderAgeData = dataLocation + '/4_AGE_GENDER_GROUP_OUT.json'
    // dataLocation + '/monthly_age_sec_group_order_by_dgns.json'
    const [outGenderAgeData2, setOutGenderAgeData2] = useState(null)
    const [outPersonMapData2, setOutPersonMapData2] = useState(null)
    const [outDeptData2, setDeptData2] = useState(null)
    const [outLabData2, setLabData2] = useState(null)
    const [outMonthData2, setMonthData2] = useState(null)

    const outMonthlyBarData = dataLocation + '/5_1year_monthly_total_OUT.csv'
    const outMonthlyBarLineData =
        dataLocation + '/5-2_1year_monthly_total_ER_OUT.json'
    const outYearlyProcedureData =
        dataLocation + '/yearly_procedure_order_by_hsp_pcnt_OUT.json'
    const outDGTreeData = dataLocation + '/monthly_dgns_order_by_hsp_pcnt.json'

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
    const handleDatePickerChange = async (event, newVal) => {
        setSelectData(sliderMark[11 - newVal].label)
        setThisMonth(moment(sliderMark[11 - newVal].label).format('MMMM YYYY'))
        // console.log('fetch date select ', {
        //     voc_id: vocId,
        //     id: codeId,
        //     month: sliderMark[11 - newVal].label,
        // })
        let getData = await axios.get('personMap', {
            params: {
                voc_id: vocId,
                id: codeId,
                month: sliderMark[11 - newVal].label,
            },
            headers: { 'Contents-type': 'application/json' },
        })
        setOutPersonMapData2(getData.data)
    }

    function valuetext(value) {
        return `${sliderMark[11 - value].label}`
    }

    function valueLabelFormat(value) {
        // console.log('label?', sliderMark[11 - value], value, sliderMark)
        return `${sliderMark[11 - value].label}`
    }

    const onClickEvent = async (id, voc_id, voc_nm) => {
        if (id === 'OP') {
            setOutGenderAgeData2(
                dataLocation + '/monthly_age_sec_group_order_by_srgr.json'
            )
        } else {
            setOutGenderAgeData2(
                dataLocation + '/monthly_age_sec_group_order_by_dgns.json'
            )
        }
        let getData = await axios.get('personMap', {
            params: {
                voc_id: voc_id,
                id: id,
                month: selectData,
            },
            headers: { 'Contents-type': 'application/json' },
        })
        // console.log('get data?', getData)

        let getDataDept = await axios.get('deptRank', {
            params: {
                voc_id: voc_id,
                id: id,
                month: selectData,
            },
            headers: { 'Contents-type': 'application/json' },
        })

        let getDataMonth = await axios.get('monthlyStat', {
            params: {
                voc_id: voc_id,
                id: id,
                month: selectData,
            },
            headers: { 'Contents-type': 'application/json' },
        })
        let getDataLab = await axios.get('labRank', {
            params: {
                voc_id: voc_id,
                id: id,
                month: selectData,
            },
            headers: { 'Contents-type': 'application/json' },
        })
        // console.log('rank data', getDataLab)
        setLabData2(getDataLab.data)
        setMonthData2(getDataMonth.data)
        setDeptData2(getDataDept.data)
        setOutPersonMapData2(getData.data)
        setVocId(voc_id)
        setCodeId(id)
        // console.log('setCodeId', codeId)
        setvocName(voc_nm)
    }

    const fetchData = async (api) => {
        try {
            const response = await axios
                .get('http://172.29.113.6:30003/api/visitOut')
                .then((res) => {
                    console.log('respons?', res)
                })
            console.log(response)
        } catch (e) {
            console.log('error', e)
            setError(true)
        }
    }

    var format = d3.format(',d')
    const number = {
        all: 5871474,
        HQ: 3352698,
        children: 891886,
        cc: 506750,
        kn: 188919,
    }
    const numberRight = {
        all: 1113209,
        allTM: 30656474,
        rdAll: 4379895,
        rdTM: 38841018,
    }
    useEffect(() => {
        let numAll = d3
            .select('.numberAll')
            .attr('text-anchor', 'middle')
            .attr('font-family', 'bitro')
            .attr('dy', '.3em')
        numAll
            .datum(number.all)
            .transition()
            .duration(1500)
            .textTween((d) => {
                const i = d3.interpolate(0, d)
                return function (t) {
                    return format(i(t)) + ' 명'
                }
            })
            .delay(500)

        let numHQ = d3
            .select('.numberHQ')
            .attr('text-anchor', 'middle')
            .attr('font-family', 'bitro')
            .attr('dy', '.3em')
        numHQ
            .datum(number.HQ)
            .transition()
            .duration(1500)
            .textTween((d) => {
                const i = d3.interpolate(0, d)
                return function (t) {
                    return format(i(t)) + ' 명'
                }
            })
            .delay(500)

        let numCH = d3
            .select('.numberCH')
            .attr('text-anchor', 'middle')
            .attr('font-family', 'bitro')
            .attr('dy', '.3em')
        numCH
            .datum(number.children)
            .transition()
            .duration(1000)
            .textTween((d) => {
                const i = d3.interpolate(0, d)
                return function (t) {
                    return format(i(t)) + ' 명'
                }
            })
            .delay(500)

        let numCC = d3
            .select('.numberCC')
            .attr('text-anchor', 'middle')
            .attr('font-family', 'bitro')
            .attr('dy', '.3em')
        numCC
            .datum(number.cc)
            .transition()
            .duration(1000)
            .textTween((d) => {
                const i = d3.interpolate(0, d)
                return function (t) {
                    return format(i(t)) + ' 명'
                }
            })
            .delay(500)

        let numKN = d3
            .select('.numberKN')
            .attr('text-anchor', 'middle')
            .attr('font-family', 'bitro')
            .attr('dy', '.3em')
        numKN
            .datum(number.kn)
            .transition()
            .duration(1000)
            .textTween((d) => {
                const i = d3.interpolate(0, d)
                return function (t) {
                    return format(i(t)) + ' 명'
                }
            })
            .delay(500)
        let numAllRight = d3
            .select('.numberAllRight')
            .attr('text-anchor', 'middle')
            .attr('dy', '.3em')
        numAllRight
            .datum(numberRight.all)
            .transition()
            .duration(1500)
            .textTween((d) => {
                const i = d3.interpolate(0, d)
                return function (t) {
                    return format(i(t)) + ' 건'
                }
            })
            .delay(500)

        let numTM = d3
            .select('.numberThisMonth')
            .attr('text-anchor', 'middle')
            .attr('dy', '.3em')
        numTM
            .datum(numberRight.allTM)
            .transition()
            .duration(1500)
            .textTween((d) => {
                const i = d3.interpolate(0, d)
                return function (t) {
                    return format(i(t)) + ' 건'
                }
            })
            .delay(500)

        let numRDAll = d3
            .select('.numberRDAll')
            .attr('text-anchor', 'middle')
            .attr('dy', '.3em')
        numRDAll
            .datum(numberRight.rdAll)
            .transition()
            .duration(1500)
            .textTween((d) => {
                const i = d3.interpolate(0, d)
                return function (t) {
                    return format(i(t)) + ' 건'
                }
            })
            .delay(500)

        let numRD = d3
            .select('.numberRDThismonth')
            .attr('text-anchor', 'middle')
            .attr('dy', '.3em')
        numRD
            .datum(numberRight.rdTM)
            .transition()
            .duration(1500)
            .textTween((d) => {
                const i = d3.interpolate(0, d)
                return function (t) {
                    return format(i(t)) + ' 건'
                }
            })
            .delay(500)
        // onClickEvent('DG', 'D00002883')

        onClickEvent('DG', 'D00002883', 'C73')
    }, [])

    return (
        <BigBox>
            <div>
                <BackRowStyle>
                    <RightBack>
                        <ButtonRow>
                            <CountButton>
                                <Card
                                    sx={{
                                        minWidth: 275,
                                        background:
                                            'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                    }}
                                    variant="outlined"
                                >
                                    <CardContent>
                                        <Typography
                                            variant="h5"
                                            component="div"
                                            color="#fff"
                                            fontFamily="bitro"
                                        >
                                            서울대병원 전체 환자수
                                        </Typography>
                                        <Typography variant="body1">
                                            <br />
                                        </Typography>
                                        <Typography
                                            variant="h4"
                                            className="numberAll"
                                            align="right"
                                            fontWeight="700"
                                            color="#fff"
                                        >
                                            0 명
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </CountButton>
                            <CountButton>
                                <Card
                                    sx={{
                                        minWidth: 275,
                                        background:
                                            'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                    }}
                                    variant="outlined"
                                >
                                    <CardContent>
                                        <Typography
                                            variant="h5"
                                            component="div"
                                            color="#fff"
                                            fontFamily="bitro"
                                        >
                                            본원 방문 환자수
                                        </Typography>
                                        <Typography variant="body1">
                                            <br />
                                        </Typography>
                                        <Typography
                                            variant="h4"
                                            className="numberHQ"
                                            align="right"
                                            fontWeight="700"
                                            color="#fff"
                                        >
                                            0 명
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </CountButton>
                            <CountButton>
                                <Card
                                    sx={{
                                        minWidth: 275,
                                        background:
                                            'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                    }}
                                    variant="outlined"
                                >
                                    <CardContent>
                                        <Typography
                                            variant="h5"
                                            component="div"
                                            color="#fff"
                                            fontFamily="bitro"
                                        >
                                            어린이병원 환자수
                                        </Typography>
                                        <Typography variant="body1">
                                            <br />
                                        </Typography>
                                        <Typography
                                            variant="h4"
                                            className="numberCH"
                                            align="right"
                                            fontWeight="700"
                                            color="#fff"
                                        >
                                            0 명
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </CountButton>
                            <CountButton>
                                <Card
                                    sx={{
                                        minWidth: 275,
                                        background:
                                            'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                    }}
                                    variant="outlined"
                                >
                                    <CardContent>
                                        <Typography
                                            variant="h5"
                                            component="div"
                                            color="#fff"
                                            fontFamily="bitro"
                                        >
                                            암병원 환자수
                                        </Typography>
                                        <Typography variant="body1">
                                            <br />
                                        </Typography>
                                        <Typography
                                            variant="h4"
                                            className="numberCC"
                                            align="right"
                                            fontWeight="700"
                                            color="#fff"
                                        >
                                            0 명
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </CountButton>
                            <CountButton>
                                <Card
                                    sx={{
                                        minWidth: 275,
                                        background:
                                            'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                    }}
                                    variant="outlined"
                                >
                                    <CardContent>
                                        <Typography
                                            variant="h5"
                                            component="div"
                                            color="#fff"
                                            fontFamily="bitro"
                                        >
                                            강남센터 환자수
                                        </Typography>
                                        <Typography variant="body1">
                                            <br />
                                        </Typography>
                                        <Typography
                                            variant="h4"
                                            className="numberKN"
                                            align="right"
                                            fontWeight="700"
                                            color="#fff"
                                        >
                                            0 명
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </CountButton>
                        </ButtonRow>
                        <RowStyle>
                            <BoxStyle>
                                <StackedBarChart
                                    data={outBarchartData}
                                    header={outPatientVisitBarChart}
                                />

                                <MonthlyBarChart
                                    header={outPationtTotalBarChart}
                                    dataloc={outMonthlyBarData}
                                    dataloc2={outMonthlyBarLineData}
                                />
                            </BoxStyle>
                            <BoxStyle>
                                <DeptHorizonBarChart
                                    header={outPatientHBarChart}
                                    dataloc={outDepchartData}
                                    dateCtrl={selectData}
                                    left={true}
                                />
                            </BoxStyle>
                            <BoxStyle>
                                <Treemap
                                    header={outPatientTreemapHeader}
                                    dateCtrl={selectData}
                                    pageInfo={'G'}
                                    onClickEvent={onClickEvent}
                                    left={true}
                                    dataloc={outDGTreeData}
                                />
                                <BubbleCircleChart
                                    header={outPatientBubbleHeader}
                                    dataloc={outYearlyProcedureData}
                                    dateCtrl={selectData}
                                    pageInfo={'1'}
                                    onClickEvent={onClickEvent}
                                />
                            </BoxStyle>
                        </RowStyle>
                    </RightBack>
                    <LeftBack>
                        <ButtonRow>
                            <CountButton>
                                <Card
                                    sx={{
                                        minWidth: 275,
                                        background:
                                            'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                                        maxHeight: 135,
                                    }}
                                    variant="outlined"
                                >
                                    <CardContent>
                                        <Typography
                                            variant="h5"
                                            component="div"
                                            color="#fff"
                                        >
                                            수술 데이터 전체
                                        </Typography>
                                        <Typography variant="h5">
                                            <br />
                                        </Typography>
                                        <Typography
                                            variant="h4"
                                            className="numberAllRight"
                                            align="right"
                                            fontWeight="700"
                                            color="#fff"
                                        >
                                            0 건
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </CountButton>
                            <CountButton>
                                <Card
                                    sx={{
                                        minWidth: 275,
                                        background:
                                            'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                                        maxHeight: 135,
                                    }}
                                    variant="outlined"
                                >
                                    <CardContent>
                                        <Typography
                                            variant="h5"
                                            component="div"
                                            color="#fff"
                                        >
                                            영상 데이터 전체
                                        </Typography>
                                        <Typography variant="h5">
                                            <br />
                                        </Typography>
                                        <Typography
                                            variant="h4"
                                            className="numberThisMonth"
                                            align="right"
                                            fontWeight="700"
                                            color="#fff"
                                        >
                                            0 건
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </CountButton>
                            <CountButton>
                                <Card
                                    sx={{
                                        minWidth: 275,
                                        maxHeight: 135,
                                        background:
                                            'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                                    }}
                                    variant="outlined"
                                >
                                    <CardContent>
                                        <Typography
                                            variant="h5"
                                            component="div"
                                            color="#fff"
                                        >
                                            병리 데이터 전체
                                        </Typography>{' '}
                                        <Typography variant="h5">
                                            <br />
                                        </Typography>
                                        <Typography
                                            variant="h4"
                                            className="numberRDAll"
                                            align="right"
                                            fontWeight="700"
                                            color="#fff"
                                        >
                                            0 건
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </CountButton>
                            <CountButton>
                                <Card
                                    sx={{
                                        minWidth: 275,
                                        maxHeight: 135,
                                        background:
                                            'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                                    }}
                                    variant="outlined"
                                >
                                    <CardContent>
                                        <Typography
                                            variant="h5"
                                            component="div"
                                            color="#fff"
                                        >
                                            기록지 데이터 전체
                                        </Typography>
                                        <Typography variant="h5">
                                            <br />
                                        </Typography>
                                        <Typography
                                            variant="h4"
                                            className="numberRDThismonth"
                                            align="right"
                                            fontWeight="700"
                                            color="#fff"
                                        >
                                            0 건
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </CountButton>
                        </ButtonRow>
                        <RowStyle>
                            <BoxStyle>
                                <GenderAgeDivergingChart
                                    header={outPatientGenderChart}
                                    dataloc={outGenderAgeData}
                                    dataloc2={outGenderAgeData2}
                                    dateCtrl={selectData}
                                    vocId={vocId}
                                />
                                <MonthlyBarChart
                                    header={patientBarChart}
                                    // dataloc={outMonthlyBarData}
                                    dateCtrl={selectData}
                                    pageInfo={1}
                                    data2={outMonthData2}
                                    vocId={vocId}
                                />
                            </BoxStyle>
                            <BoxStyle>
                                <PersonMap
                                    header={outPatientPersonMap}
                                    // dataloc={outPersonMapData}
                                    dateCtrl={selectData}
                                    data2={outPersonMapData2}
                                    vocId={vocId}
                                    codeId={codeId}
                                />
                            </BoxStyle>
                            <BoxStyle>
                                <DeptHorizonBarChart
                                    header={outPatientRightBarChart}
                                    // dataloc={outDepchartData}
                                    dateCtrl={selectData}
                                    data2={outDeptData2}
                                    vocId={vocId}
                                    left={false}
                                />
                                <Treemap
                                    header={patientRightTreemapHeader}
                                    dateCtrl={selectData}
                                    left={false}
                                    data2={outLabData2}
                                    vocId={vocId}
                                />
                            </BoxStyle>
                        </RowStyle>
                    </LeftBack>
                </BackRowStyle>
            </div>
        </BigBox>
    )
}
export default VisitOutpatient

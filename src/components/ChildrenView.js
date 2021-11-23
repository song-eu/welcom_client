import React, { useEffect, useState, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import RankHorizonBarChart from './chart/RankHorizonBarChart'
import MonthlyBarChart from './chart/monthlyBarChart'
import PersonMap from './chart/personMap'
import GenderAgeDivergingChart from './chart/genderAgeDiverging'
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
import Treemap from './chart/Treemap'

// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import

const ChildrenView = (props) => {
    //  const [outBarchartData, setoutBarchartData] = useState(null)
    const [thisMonth, setThisMonth] = useState(
        moment().subtract(1, 'month').format('MMMM YYYY')
    )
    const [error, setError] = useState(null)
    const [selectData, setSelectData] = useState(
        moment().subtract(1, 'month').format('YYYY-MM')
    )
    const childrenHBarChart = `Chilren Hospital Visits by Rare disease in ${thisMonth}`
    const childrenBarChart = 'Monthly Children Rare disease Visits'
    const childrenGenderChart = 'Chilren Rare disease Visits by Age & Gender'
    const childrenPersonMap = 'Children Rare disease Visits by Location'
    const childrenTreemapHeader = `Children Hospital Top Dignose in ${thisMonth}`
    const dataLocation = '/children'
    const childrenDisesasehCartData =
        dataLocation + '/2-1_children_raredisease_count_year_by_disease.json'

    const childrenDisesaseBarChartData =
        dataLocation +
        '/2-2_children_raredisease_monthly_count_year_by_month.json'

    const childrenDisesaseGAChartData =
        dataLocation +
        '/2-3_children_raredisease_monthly_count_year_by_gender_age.json'

    const childrenDiseasePersonData =
        dataLocation +
        '/2-4_children_raredisease_monthly_count_year_by_SIDO.json'

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

    return (
        <BigBox>
            <div>
                <ButtonRow>
                    <Box
                        sx={{
                            margin: '30px 40px 10px 40px ',
                            width: 1500,
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
                        <RankHorizonBarChart
                            header={childrenHBarChart}
                            dataloc={childrenDisesasehCartData}
                            dateCtrl={selectData}
                        />
                    </BoxStyle>
                    <BoxStyle>
                        <MonthlyBarChart
                            header={childrenBarChart}
                            dataloc={childrenDisesaseBarChartData}
                        />
                        <RowStyle>
                            <GenderAgeDivergingChart
                                header={childrenGenderChart}
                                dataloc={childrenDisesaseGAChartData}
                                dateCtrl={selectData}
                            />
                            <PersonMap
                                header={childrenPersonMap}
                                dataloc={childrenDiseasePersonData}
                                dateCtrl={selectData}
                            />
                        </RowStyle>
                    </BoxStyle>
                </RowStyle>
                <RowStyle>
                    <BoxStyle>
                        <Treemap
                            header={childrenTreemapHeader}
                            dateCtrl={selectData}
                            pageInfo={2}
                        />
                    </BoxStyle>
                </RowStyle>
            </div>
        </BigBox>
    )
}
export default ChildrenView

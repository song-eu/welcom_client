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

// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import

const ChildrenView = (props) => {
    //  const [outBarchartData, setoutBarchartData] = useState(null)
    const thisMonth = moment().subtract(1, 'month').format('MMMM')

    const childrenHBarChart = `Chilren Hospital Visits by Rare disease in ${thisMonth}`
    const childrenBarChart = 'Monthly Children Rare disease Visits'
    const childrenGenderChart = 'Chilren Rare disease Visits by Age & Gender'
    const childrenPersonMap = 'Children Rare disease Visits by Location'
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
    return (
        <BigBox>
            <div>
                <RowStyle>
                    <BoxStyle>
                        <RankHorizonBarChart
                            header={childrenHBarChart}
                            dataloc={childrenDisesasehCartData}
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
                            />
                            <PersonMap
                                header={childrenPersonMap}
                                dataloc={childrenDiseasePersonData}
                            />
                        </RowStyle>
                    </BoxStyle>
                </RowStyle>
            </div>
        </BigBox>
    )
}
export default ChildrenView

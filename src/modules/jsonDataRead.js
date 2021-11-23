import * as d3 from 'd3'
import * as moment from 'moment'

const jsonToData = (dataloc, geojson) => {
    //console.log('dataloc', dataloc)
    // var data = require('../../public/children/2-1_children_raredisease_count_year_by_disease.json')
    console.log('data', process.env.PUBLIC_URL + dataloc)
    var lastMonth = moment().subtract(3, 'month').format('YYYY-MM') // 2021-07 or 마지막 달

    var resultArr = []

    return d3.json(process.env.PUBLIC_URL + dataloc).then((data) => {
        // console.log(
        //     'resutl????',
        //     data[Object.keys(data)[0]],
        //     data[Object.keys(data)[0]].length
        // )
        let base = data[Object.keys(data)[0]]
        var result = {}
        var resultArr = []

        // { name: '신경외과', value: 336 },
        base.forEach((d, i) => {
            if (d.RN && d.CLDG_NM) {
                // console.log('data treemap?', d)
                if (result[d.MONTH]) {
                    if (!result[d.MONTH][d.HSP_TP_CD]) {
                        result[d.MONTH][d.HSP_TP_CD] = []
                        result[d.MONTH][d.HSP_TP_CD].push({
                            name: 'Origin',
                            name_full: '',
                            value: 0,
                            parent: '',
                            Origin: '',
                        })
                    }
                    result[d.MONTH][d.HSP_TP_CD].push({
                        name: d.ICD10_CD,
                        name_full: d.CLDG_NM,
                        value: parseInt(d.PCNT),
                        parent: 'Origin',
                        Origin: '',
                    })
                } else {
                    result[d.MONTH] = {}
                    result[d.MONTH][d.HSP_TP_CD] = []
                    result[d.MONTH][d.HSP_TP_CD].push({
                        name: 'Origin',
                        name_full: '',
                        value: 0,
                        parent: '',
                        Origin: '',
                    })
                    result[d.MONTH][d.HSP_TP_CD].push({
                        name: d.ICD10_CD,
                        name_full: d.CLDG_NM,
                        value: parseInt(d.PCNT),
                        parent: 'Origin',
                        Origin: '',
                    })
                    // console.log('data process', result)
                }
            } else if (d.ICD10_CD) {
                if (result[d.MONTH]) {
                    result[d.MONTH].push({
                        name: d.ICD10_CD,
                        name_full: d.CD_ENG_NM,
                        value: parseInt(d.PCNT),
                    })
                } else {
                    result[d.MONTH] = []
                    result[d.MONTH].push({
                        name: d.ICD10_CD,
                        name_full: d.CD_ENG_NM,
                        value: parseInt(d.PCNT),
                    })
                }
            } else if (d.MED_DEPT_CD) {
                if (result[d.MONTH]) {
                    result[d.MONTH].push({
                        name: d.MED_DEPT_CD,
                        name_full: d.MED_DEPT_NM,
                        value: parseInt(d.PCNT),
                    })
                } else {
                    result[d.MONTH] = []
                    result[d.MONTH].push({
                        name: d.MED_DEPT_CD,
                        name_full: d.MED_DEPT_NM,
                        value: parseInt(d.PCNT),
                    })
                }
            } else if (d.AGE_GROUP) {
                // console.log('d???', d)
                // { group: '0-9', male: 240, female: 154 }
                let tempFlag = false
                if (d.AGE_GROUP !== 'OVER 100') {
                    if (result[d.DATE]) {
                        for (let i = 0; i < result[d.DATE].length; i++) {
                            // console.log('d???', result[d.DATE][i], d)
                            if (result[d.DATE][i].group === d.AGE_GROUP) {
                                // console.log('d???', d)
                                tempFlag = true
                                if (d.SEX_TP_CD === 'F') {
                                    result[d.DATE][i]['female'] = parseInt(
                                        d.PCNT
                                    )
                                } else {
                                    result[d.DATE][i]['male'] = parseInt(d.PCNT)
                                }
                            }
                        }
                        if (!tempFlag) {
                            let obj = {}
                            obj['group'] = d.AGE_GROUP
                            if (d.SEX_TP_CD === 'F') {
                                obj['female'] = parseInt(d.PCNT)
                            } else {
                                obj['male'] = parseInt(d.PCNT)
                            }
                            result[d.DATE].push(obj)
                        }
                    } else {
                        result[d.DATE] = []
                        let obj = {}
                        obj['group'] = d.AGE_GROUP
                        if (d.SEX_TP_CD === 'F') {
                            obj['female'] = parseInt(d.PCNT)
                        } else {
                            obj['male'] = parseInt(d.PCNT)
                        }

                        result[d.DATE].push(obj)
                    }
                }
            } else if (d.SIDO_ADDR) {
                // console.log('sidodata?', d)
                if (result[d.DATE]) {
                    if (d.SIDO_ADDR !== '') {
                        let obj = {}
                        let temFlag_map = false
                        for (let i = 0; i < geojson.features.length; i++) {
                            if (
                                d.SIDO_ADDR.substring(0, 2) ===
                                geojson.features[i].properties.name.substring(
                                    0,
                                    2
                                )
                            ) {
                                for (
                                    let n = 0;
                                    n < result[d.DATE].length;
                                    n++
                                ) {
                                    // console.log('dd?', d, 'obj?', obj, result)
                                    if (
                                        result[d.DATE][n].name.substring(
                                            0,
                                            2
                                        ) === d.SIDO_ADDR.substring(0, 2)
                                    ) {
                                        result[d.DATE][n].cnt += parseInt(
                                            d.PCNT
                                        )
                                        temFlag_map = true
                                    }
                                }
                                if (!temFlag_map) {
                                    obj.cnt = parseInt(d.PCNT)
                                    obj.id = geojson.features[i].properties.code
                                    obj.name =
                                        geojson.features[i].properties.name
                                    obj.loc = d3.geoCentroid(
                                        geojson.features[i].geometry
                                    )
                                    result[d.DATE].push(obj)
                                }
                            }
                        }
                    }
                } else {
                    result[d.DATE] = []
                    let obj = {}
                    for (let i = 0; i < geojson.features.length; i++) {
                        if (
                            d.SIDO_ADDR.substring(0, 2) ===
                            geojson.features[i].properties.name.substring(0, 2)
                        ) {
                            obj.cnt = parseInt(d.PCNT)
                            obj.id = geojson.features[i].properties.code
                            obj.name = geojson.features[i].properties.name
                            obj.loc = d3.geoCentroid(
                                geojson.features[i].geometry
                            )
                        }
                    }
                    result[d.DATE].push(obj)
                }
            } else {
                let obj = {}
                //console.log('dd??', d)
                obj['NAME'] = d.MONTH
                obj['VALUE'] = parseInt(d.PCNT)
                resultArr.push(obj)
            }
        })

        if (resultArr.length > 1 && !dataloc.includes('SIDO')) {
            return resultArr
        }

        return result
    })
}
export default jsonToData

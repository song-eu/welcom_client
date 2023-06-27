import * as d3 from 'd3'
import * as moment from 'moment'

const fetchToData = async (data, geojson, op) => {
    // console.log('fetch data?', data)

    var result = {}
    var resultArr = []
    if (op) {
        // console.log('data??? call fetch', data, op)
        if (data) {
            for (let n = 0; n < data.length; n++) {
                // console.log('d???', d, resultArr)
                // { group: '0-9', male: 240, female: 154 }
                let tempFlag = false
                if (data[n].AGE_GROUP !== 'OVER 100') {
                    if (resultArr.length !== 0) {
                        for (let i = 0; i < resultArr.length; i++) {
                            // console.log('d???', resultArr[i].group)
                            if (resultArr[i].group === data[n].age_group) {
                                // console.log('d???', d)
                                tempFlag = true
                                if (data[n].SEX_TP_CD === 'F') {
                                    resultArr[i]['female'] = parseInt(
                                        data[n].PCNT
                                    )
                                } else {
                                    resultArr[i]['male'] = parseInt(
                                        data[n].PCNT
                                    )
                                }
                            }
                        }
                        if (!tempFlag) {
                            let obj = {}
                            obj['group'] = data[n].age_group
                            if (data[n].SEX_TP_CD === 'F') {
                                obj['female'] = parseInt(data[n].PCNT)
                            } else {
                                obj['male'] = parseInt(data[n].PCNT)
                            }
                            // console.log('temp?')
                            resultArr.push(obj)
                        }
                    } else {
                        // resultArr = []
                        let obj = {}
                        obj['group'] = data[n].age_group
                        if (data[n].SEX_TP_CD === 'F') {
                            obj['female'] = parseInt(data[n].PCNT)
                        } else {
                            obj['male'] = parseInt(data[n].PCNT)
                        }

                        resultArr.push(obj)
                        // console.log('result???', resultArr)
                    }
                }
            }
        }
        return resultArr
    }

    data.forEach((d) => {
        if (d.SIDO_ADDR && d.VOC_ID) {
            // console.log('sidodata?', d)
            if (result[d.VOC_ID]) {
                if (result[d.VOC_ID][d.DATE]) {
                    if (d.SIDO_ADDR !== '') {
                        let obj = {}
                        let temFlag_map = false
                        for (let i = 0; i < geojson.features.length; i++) {
                            // console.log('d.SIDO_ADDR', d.SIDO_ADDR)
                            if (
                                d.SIDO_ADDR.substring(0, 2) ===
                                geojson.features[i].properties.name.substring(
                                    0,
                                    2
                                )
                            ) {
                                for (
                                    let n = 0;
                                    n < result[d.VOC_ID][d.DATE].length;
                                    n++
                                ) {
                                    // console.log('dd?', d, 'obj?', obj, result)
                                    if (
                                        result[d.VOC_ID][d.DATE][
                                            n
                                        ].name.substring(0, 2) ===
                                        d.SIDO_ADDR.substring(0, 2)
                                    ) {
                                        result[d.VOC_ID][d.DATE][n].cnt +=
                                            parseInt(d.PCNT)
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
                                    result[d.VOC_ID][d.DATE].push(obj)
                                }
                            }
                        }
                    }
                } else {
                    result[d.VOC_ID][d.DATE] = []
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
                    result[d.VOC_ID][d.DATE].push(obj)
                }
            } else {
                result[d.VOC_ID] = {}
                result[d.VOC_ID][d.DATE] = []
                let obj = {}
                for (let i = 0; i < geojson.features.length; i++) {
                    if (
                        d.SIDO_ADDR.substring(0, 2) ===
                        geojson.features[i].properties.name.substring(0, 2)
                    ) {
                        obj.cnt = parseInt(d.PCNT)
                        obj.id = geojson.features[i].properties.code
                        obj.name = geojson.features[i].properties.name
                        obj.loc = d3.geoCentroid(geojson.features[i].geometry)
                    }
                }
                result[d.VOC_ID][d.DATE].push(obj)
            }
        } else if (d.MED_DEPT_CD) {
            if (result[d.DATE]) {
                result[d.DATE].push({
                    name: d.MED_DEPT_CD,
                    name_full: d.MED_DEPT_NM,
                    value: parseInt(d.PCNT),
                })
            } else {
                result[d.DATE] = []
                result[d.DATE].push({
                    name: d.MED_DEPT_CD,
                    name_full: d.MED_DEPT_NM,
                    value: parseInt(d.PCNT),
                })
            }
        } else if (d.VOC_ID && d.EXM_CD) {
            // "VOC_ID": "D00001408",
            // "EXM_CD": "L2002",
            // "PCNT": 622,
            // "DATE": "2021",
            // "EXM_NM": "RBC(검사24시간가능)"
            // console.log('data treemap?', d)
            if (result[d.DATE]) {
                if (!result[d.DATE]) {
                    result[d.DATE] = []
                    result[d.DATE].push({
                        name: 'Origin',
                        name_full: '',
                        value: 0,
                        parent: '',
                        Origin: '',
                        voc_id: d.VOC_ID,
                    })
                }
                result[d.DATE].push({
                    name: d.EXM_CD,
                    name_full: d.EXM_NM,
                    value: parseInt(d.PCNT),
                    parent: 'Origin',
                    Origin: '',
                    voc_id: d.VOC_ID,
                })
            } else {
                result[d.DATE] = []
                result[d.DATE].push({
                    name: 'Origin',
                    name_full: '',
                    value: 0,
                    parent: '',
                    Origin: '',
                    voc_id: d.VOC_ID,
                })
                result[d.DATE].push({
                    name: d.EXM_CD,
                    name_full: d.EXM_NM,
                    value: parseInt(d.PCNT),
                    parent: 'Origin',
                    Origin: '',
                    voc_id: d.VOC_ID,
                })
                // console.log('data process', result)
            }
        } else {
            let obj = {}
            //console.log('dd??', d)
            obj['NAME'] = d.DATE
            obj['VALUE'] = parseInt(d.PCNT)
            resultArr.push(obj)
        }
    })
    if (Object.keys(result).length !== 0) {
        return result
    }
    // console.log('array to data ?', result)
    return resultArr
}

export default fetchToData

import * as d3 from 'd3'
import * as moment from 'moment'

const csvToData = (dataloc) => {
    //console.log('dataloc', dataloc)
    // console.log(
    //     'data',
    //     process.env.PUBLIC_URL + dataloc,
    //     process.env.PUBLIC_URL
    // )
    var resultArr = []

    //      { sample data
    //     NAME: '2013-02',
    //     소아: 165,
    //     강남: 134,
    //     어린이: 54,
    //     암병원: 463,
    //     본원: 243,
    // },
    return d3
        .csv(process.env.PUBLIC_URL + dataloc, (map) => {
            //console.log('map???', map)
            if (map.HOSPITAL) {
                let tempFlag = false
                if (resultArr.length !== 0) {
                    for (let i = 0; i < resultArr.length; i++) {
                        if (resultArr[i].NAME === map.MONTH) {
                            tempFlag = true
                            resultArr[i][map.HOSPITAL] = parseInt(map.PCNT)
                        }
                    }
                    if (!tempFlag) {
                        let obj = {}
                        obj['NAME'] = map.MONTH
                        obj[map.HOSPITAL] = parseInt(map.PCNT)
                        resultArr.push(obj)
                    }
                } else {
                    let obj = {}
                    obj['NAME'] = map.MONTH
                    obj[map.HOSPITAL] = parseInt(map.PCNT)
                    resultArr.push(obj)
                }
            } else if (map.MED_DEPT_CD) {
                let obj = {}
                obj['name'] = map.MED_DEPT_CD
                obj['DepName'] = map.MED_DEPT_NM
                obj['value'] = parseInt(map.PCNT)
                resultArr.push(obj)
            } else if (map.AGE_GROUP) {
                // { group: '0-9', male: 240, female: 154 }
                let tempFlag = false
                if (resultArr.length !== 0) {
                    for (let i = 0; i < resultArr.length; i++) {
                        if (resultArr[i].group === map.AGE_GROUP) {
                            tempFlag = true
                            if (map.SEX_TP_CD === 'F') {
                                resultArr[i]['female'] = parseInt(map.PCNT)
                            } else {
                                resultArr[i]['male'] = parseInt(map.PCNT)
                            }
                        }
                    }
                    if (!tempFlag) {
                        let obj = {}
                        obj['group'] = map.AGE_GROUP
                        if (map.SEX_TP_CD === 'F') {
                            obj['female'] = parseInt(map.PCNT)
                        } else {
                            obj['male'] = parseInt(map.PCNT)
                        }
                        resultArr.push(obj)
                    }
                } else {
                    let obj = {}
                    obj['group'] = map.AGE_GROUP
                    if (map.SEX_TP_CD === 'F') {
                        obj['female'] = parseInt(map.PCNT)
                    } else {
                        obj['male'] = parseInt(map.PCNT)
                    }

                    resultArr.push(obj)
                }
            } else if (map.MONTH) {
                let obj = {}
                //console.log('map??', map)
                obj['NAME'] = map.MONTH
                obj['VALUE'] = parseInt(map.PCNT)
                resultArr.push(obj)
            }
        })
        .then(() => {
            //console.log('resutl????', resultArr)
            return resultArr
        })
}
export default csvToData

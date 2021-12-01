import * as d3 from 'd3'
import * as moment from 'moment'

const fetchToData = (data, geojson) => {
    console.log('fetch data?', data)
    var result = {}
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
        }
    })
    console.log('array to data ?', result)
    return result
}

export default fetchToData

import * as d3 from 'd3'
import * as moment from 'moment'

const ChangeGeoLocation = async (geojson, date) => {
    //console.log(mapData)
    var lastMonth = moment().subtract(3, 'month').format('YYYY-MM') // 2021-07 or 마지막 달
    var result = {}
    console.log('date????', date)

    return d3
        .csv(
            process.env.PUBLIC_URL + '/1_year_weekly_visits_addr.csv',
            (map) => {
                // 데이터 월 = 마지막 달
                if (map.DATE.substring(0, 7) === date) {
                    if (map.SIDO_ADDR != '') {
                        for (let i = 0; i < geojson.features.length; i++) {
                            if (
                                geojson.features[i].properties.name.substring(
                                    0,
                                    2
                                ) === map.SIDO_ADDR.substring(0, 2)
                            ) {
                                if (!result[map.SIDO_ADDR.substring(0, 2)]) {
                                    if (
                                        geojson.features[i].geometry
                                            .coordinates[0][0].length === 2
                                    ) {
                                        result[map.SIDO_ADDR.substring(0, 2)] =
                                            {
                                                id: geojson.features[i]
                                                    .properties.code,
                                                name: geojson.features[i]
                                                    .properties.name,
                                                cnt: 0,
                                                // loc: geojson.features[i]
                                                //     .geometry.coordinates[0][0],
                                                loc: d3.geoCentroid(
                                                    geojson.features[i].geometry
                                                ),
                                            }
                                    } else {
                                        result[map.SIDO_ADDR.substring(0, 2)] =
                                            {
                                                id: geojson.features[i]
                                                    .properties.code,
                                                name: geojson.features[i]
                                                    .properties.name,
                                                cnt: 0,
                                                // loc: geojson.features[i]
                                                //     .geometry
                                                //     .coordinates[0][0][0],
                                                loc: d3.geoCentroid(
                                                    geojson.features[i].geometry
                                                ),
                                            }
                                    }
                                }
                                result[map.SIDO_ADDR.substring(0, 2)].cnt +=
                                    parseInt(map.PCNT)
                                //result.lad =
                            } else {
                                if (!result.other) {
                                    result.other = {
                                        id: '999',
                                        name: 'other',
                                        cnt: parseInt(map.PCNT),
                                    }
                                }
                                result.other.cnt += parseInt(map.PCNT)
                            }
                        }
                    }
                }
            }
        )
        .then(() => {
            let resultArr = []
            Object.keys(result).forEach((el) => {
                resultArr.push(result[el])
            })
            return resultArr
        })
}

export default ChangeGeoLocation

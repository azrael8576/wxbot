const request = require('request')
const cheerio = require('cheerio')

const url = 'http://www.cwb.gov.tw/V7/forecast/taiwan/Taipei_City.htm'



async function getAreaWeather() {
    var weathers = []
    var replyMsge = '未定義'
    var reason = '失敗'

    // const promise = new Promise(function (resolve, reject) {
    //     // 成功時
    //     resolve(value)
    //     // 失敗時
    //     reject(reason)
    // });

    //   promise.then(function(value) {
    //     // on fulfillment(已實現時)
    //   }, function(reason) {
    //     // on rejection(已拒絕時)
    //   })
    const promise = new Promise(async function (resolve, reject) {
        request(url, (err, res, body) => {
            const $ = cheerio.load(body)
            $('#box8 .FcstBoxTable01 tbody tr').each(function (i, elem) {
                weathers.push(
                    $(this)
                        .text()
                        .split('\n')
                )
            })

            weathers = weathers.map(weather => ({
                time: weather[1].substring(2).split(' ')[0],
                temp: weather[2].substring(2),
                rain: weather[6].substring(2),
            }))

            //console.log(weathers[0].time);
            replyMsge = weathers[0].time
        })
        // 成功時   
        await resolve(weathers[0])
        // 失敗時
        await reject(reason)
    });
    promise.then(function (value) {
        // on fulfillment(已實現時)
        console.log(weathers[0]);
        console.log("hello,成功" + value)
        return value
    }, function (reason) {
        console.log("失敗")
        return '失敗'
        // on rejection(已拒絕時)
    })
}


module.exports.getAreaWeather = getAreaWeather;
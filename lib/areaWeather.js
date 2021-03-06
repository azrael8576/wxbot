var rp = require('request-promise');
var cheerio = require('cheerio'); // Basically jQuery for node.js

async function getAreaWeather(searchCity) {
    const stations = require('../data/CWB_stations_location.json');
    var replyMsge = ''
    var weathers = []
    var city = stations[searchCity]['city']
    var options = {
        uri: `http://www.cwb.gov.tw/V7/forecast/taiwan/${city}.htm`,
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    try {
        var $ = await rp(options)
        {
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
            replyMsge = replyMsge + '地區：' + searchCity + '\n'
            for (i = 0; i < 2; i++) {
                replyMsge = replyMsge + '時間：' + weathers[i].time +
                    '\n降雨機率：' + weathers[i].rain +
                    '\n氣溫：' + weathers[i].temp + '\n\n';
            }
            replyMsge = replyMsge + '----------------------' + '\n';
            replyMsge = replyMsge + '來源：中央氣象局'
            return replyMsge
        }
    }
    catch (err) {
        console.error(err);
    }
}


module.exports.getAreaWeather = getAreaWeather;


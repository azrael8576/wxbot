var rp = require('request-promise');
var cheerio = require('cheerio'); // Basically jQuery for node.js

async function getAreaWeather(searchCity) {
    const stations = require('../data/CWB_stations_location.json');
    // for (const stid in stations) {
    //     const dist = geodist({
    //         lat,
    //         lon
    //     }, stations[stid], {
    //         exact: true,
    //         unit: 'km'
    //     })
    //     // if distance between target and station less than 10km
    //     if (dist < 5 && distance > dist) {
    //         distance = dist;
    //         stationId = stid;
    //     }
    // }
    console.log(stations)
    var replyMsge = ''
    var weathers = []
    var city = 'Taipei_City'
    var options = {
        uri: `http://www.cwb.gov.tw/V7/forecast/taiwan/${city}.htm`,
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    await rp(options)
        .then(function ($) {
            // Process html like you would with jQuery...
            // console.log($)
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
            console.log(weathers[0]);
            //replyMsge = weathers[0].time

            for (i = 0; i < 3; i++) {
                replyMsge = replyMsge + weathers[i].time + '，降雨機率：' + weathers[i].rain + '，氣溫：' + weathers[i].temp + '\n'
            }
        })
        .catch(function (err) {
            // Crawling failed or Cheerio choked...
            console.log('Failed');
        });
    return replyMsge
}


module.exports.getAreaWeather = getAreaWeather;


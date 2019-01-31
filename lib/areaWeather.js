var rp = require('request-promise');
var cheerio = require('cheerio'); // Basically jQuery for node.js

async function getAreaWeather() {
    var replyMsge = ''
    var weathers = []
    var options = {
        uri: 'http://www.cwb.gov.tw/V7/forecast/taiwan/Taipei_City.htm',
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


const {
    getAreaWeather,
} = require('../lib/areaWeather');

const {
    platformReplyText,
    platformReplyImage
} = require("./crossPlatformHandle");


async function textHandle(context, text) {
    let msg = text;
    // trim space and change charactor
    msg = msg.replace(/\s/g, '');
    msg = msg.replace(/台/g, '臺');
    msg = msg.toLowerCase();

    var replyMsg = "You can enter \'help\' to view the command";
    if (msg == 'hi') { replyMsg = 'Hello'; }
    if (msg == 'howareyou') { replyMsg = 'I am fine,You can enter \'help\' to view the command'; }
    if (msg == 'help') { replyMsg = '＊[City] （ex：台北）\n Currently only supports Taiwan city weather'; }
    if (msg == '臺北') { replyMsg = '台北降雨機率：\n' + await getAreaWeather(); }


    await platformReplyText(context, replyMsg);

}

module.exports = textHandle;
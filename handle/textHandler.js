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

    var replyMsg = "你可以輸入\'help\'查看我的指令";
    if (msg == 'hi' || msg == '嗨' || msg == '妳好' || msg == '你好') { replyMsg = 'Hello,我是你的個人助理. \n你可以輸入\'help\'查看我的指令'; }
    if (msg == 'howareyou' || msg == 'howareyou?') { replyMsg = 'I am fine,You can enter \'help\' to view the command'; }
    if (msg == 'help') { replyMsg = '＊[City] （ex：台北市）\n目前暫時只支援台灣城市天氣\n請輸入完整「縣 or 市」\n＊講笑話\n\n\n------------------\n回饋 & Bug回報：https://goo.gl/forms/jy2EXg3G3bD9MGWl2 \n\n目前支援平台：LINE、Messenger'; }

    //北部
    if (msg == '臺北市') { replyMsg = await getAreaWeather(msg); }
    if (msg == '基隆市') { replyMsg = await getAreaWeather(msg); }
    if (msg == '新北市') { replyMsg = await getAreaWeather(msg); }
    if (msg == '桃園市') { replyMsg = await getAreaWeather(msg); }
    if (msg == '新竹市') { replyMsg = await getAreaWeather(msg); }
    if (msg == '新竹縣') { replyMsg = await getAreaWeather(msg); }
    if (msg == '苗栗縣') { replyMsg = await getAreaWeather(msg); }
    //中部
    if (msg == '臺中市') { replyMsg = await getAreaWeather(msg); }
    if (msg == '彰化縣') { replyMsg = await getAreaWeather(msg); }
    if (msg == '南投縣') { replyMsg = await getAreaWeather(msg); }
    if (msg == '雲林縣') { replyMsg = await getAreaWeather(msg); }
    if (msg == '嘉義市') { replyMsg = await getAreaWeather(msg); }
    if (msg == '嘉義縣') { replyMsg = await getAreaWeather(msg); }
    //東部
    if (msg == '宜蘭縣') { replyMsg = await getAreaWeather(msg); }
    if (msg == '花蓮縣') { replyMsg = await getAreaWeather(msg); }
    if (msg == '臺東縣') { replyMsg = await getAreaWeather(msg); }
    //南部

    if (msg == '臺南市') { replyMsg = await getAreaWeather(msg); }
    if (msg == '高雄市') { replyMsg = await getAreaWeather(msg); }
    if (msg == '屏東縣') { replyMsg = await getAreaWeather(msg); }
    //外島
    if (msg == '連江縣') { replyMsg = await getAreaWeather(msg); }
    if (msg == '金門縣') { replyMsg = await getAreaWeather(msg); }
    if (msg == '澎湖縣') { replyMsg = await getAreaWeather(msg); }
    //講笑話
    function random(items) {
        const randomIndex = Math.floor(
            Math.random() * items.length
        );
        return items[randomIndex];
    }
    if (msg == '講笑話') {
        replyMsg = random([
            '加油站最怕什麼樣的員工？油槍滑掉的員工',
            '有一天，西瓜、榴蓮、奇異果一起出去玩，結果榴蓮不見了。因為榴蓮忘返',
            '海記憶體知己，天涯若比鄰',
        ])
    }








    await platformReplyText(context, replyMsg);

}

module.exports = textHandle;
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const { LineClient } = require('messaging-api-line');
const client = LineClient.connect({
  accessToken: config.channelAccessToken,
  channelSecret: config.channelSecret,
});
const facebook = require('fb-messenger-bot-api');
const messageClient = new facebook.FacebookMessagingAPIClient(config.messengerAccessToken);


const {
  getAreaWeather,
} = require('./lib/areaWeather');
const stations = require('./data/CWB_stations_location.json');


// Platforms
const {
  LineBot,
  MessengerBot,
  ConsoleBot,
} = require('bottender');

const { registerRoutes } = require('bottender/express');

const handler = require('./handle/handler');

const server = express();

// const post = require('./api/post');

server.use(bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
    console.log(req.route)
  },
}));

// Choose platform
let bots;
if (process.argv[2] == "console") {
  bots = new ConsoleBot({
    fallbackMethods: true,
  }).onEvent(handler);
  bots.createRuntime();
} else {
  bots = {
    messenger: new MessengerBot({
      accessToken: config.messengerAccessToken,
      appSecret: config.messengerAppSecret,
    })
      .onEvent(handler),

    line: new LineBot({
      channelSecret: config.channelSecret,
      accessToken: config.channelAccessToken,
    })
      .onEvent(handler),
  };
  registerRoutes(server, bots.line, {
    path: '/line'
  });

  registerRoutes(server, bots.messenger, {
    path: '/messenger',
    verifyToken: config.messengerVerifyToken
  });
  // Express Router
  // 建立 Router 物件
  var router = express.Router();
  // 首頁路由 (http://localhost:8080)
  router.post('/', async function (req, res) {
    // var post = new Post()
    var userId = req.body.userId
    let msg = req.body.city;
    let platform = req.body.platform;
    //爬蟲天氣
    for (const stid in stations) {
      if (msg == stid) { replyMsg = await getAreaWeather(msg); }
    }
    if (platform == 1) {
      client.push(userId, [
        {
          type: 'text',
          text: "******訂閱推播******\n" + replyMsg + '\n＊欲取消訂閱請回覆"取消訂閱"',
        },
      ]);
      res.send('success post to userId: ' + userId)
    }
    else if (platform == 2) {
      messageClient.sendTextMessage(userId, "******訂閱推播******\n" + replyMsg + '\n＊欲取消訂閱請回覆"取消訂閱"\n＊FB用戶請回覆我"續訂"')
      res.send('success post to userId: ' + userId)
    }
  });
  // 將路由套用至應用程式
  server.use('/post', router);

  server.listen(8080, () => {
    console.log('server is running on 8080 port...');
  });
}
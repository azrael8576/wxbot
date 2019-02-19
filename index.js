const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const { LineClient } = require('messaging-api-line');
const client = LineClient.connect({
  accessToken: config.channelAccessToken,
  channelSecret: config.channelSecret,
});

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
  router.get('/', async function () {
    let userId = 'U0051e296713d9446d34a22013834ad81';
    let msg = '臺北市';
    //爬蟲天氣
    for (const stid in stations) {
      if (msg == stid) { replyMsg = await getAreaWeather(msg); }
    }

    client.push(userId, [
      {
        type: 'text',
        text: replyMsg,
      },
    ]);
  });
  // 將路由套用至應用程式
  server.use('/post', router);

  server.listen(8080, () => {
    console.log('server is running on 8080 port...');
  });
}
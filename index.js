const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');

// Platforms
const {
  LineBot,
  MessengerBot,
  ConsoleBot,
} = require('bottender');

const { registerRoutes } = require('bottender/express');

const handler = require('./handle/handler');

const server = express();

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

  server.listen(8080, () => {
    console.log('server is running on 8080 port...');
  });
}


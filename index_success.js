const express = require('express');
const bodyParser = require('body-parser');
const config = require('./bottender.config').messenger;

const MAX_ITEMS_IN_CACHE = 500;
const EXPIRED_IN_FIVE_MINUTE = 5 * 60;
// Initialize Variable
global.CLOUD_POOL_SIZE = 0;

// Platforms
const {
    LineBot,
    LineHandler,
    MessengerBot,
    MessengerHandler,
    MemorySessionStore
} = require('bottender');

const {
    registerRoutes
} = require('bottender/express');

// const handler = require("./handle/handler");
const messengerhandler = new MessengerHandler()
    .onText(/yo/i, async context => {
        await context.sendText('Hi there!');
    })
    .onEvent(async context => {
        await context.sendText("I don't know what you say.");
    })
    .onError(async context => {
        await context.sendText('Something wrong happened.');
    });

const linehandler = new LineHandler()
    .onText(/yo/i, async context => {
        await context.sendText('Hi there!');
    })
    .onEvent(async context => {
        await context.sendText("I don't know what you say.");
    })
    .onError(async context => {
        await context.sendText('Something wrong happened.');
    });

const server = express();

server.use(bodyParser.json({
    verify: (req, res, buf) => {
        req.rawBody = buf.toString();
    },
}));

// Session: how we store session. We stores sessions in memory.
const mSession = new MemorySessionStore(MAX_ITEMS_IN_CACHE, EXPIRED_IN_FIVE_MINUTE);

// Session data: used for conversation
const sessData = {
    isGotImgWaitAnwser: false,
    isGotReqWaitImg: false,
    previousContext: {}
}

// Choose platform
let bots;
bots = {
    messenger: new MessengerBot({
        accessToken: config.accessToken,
        appSecret: config.appSecret,
        sessionStore: mSession,
    }).setInitialState(sessData).onEvent(messengerhandler),
    line: new LineBot({
        channelSecret: '03b7de370e0d852fe25b7b0e3b8f16f7',
        accessToken: 'yIVA22uhyV5bjZeuM1VdeTCxj3idljOSBPdUcGMpDrbVzYAMkbqwh1y1EzLlLFUpIjnG9J+tsvvgkyFUP6dxshykZw60hu9QNnn8On+bBX7uSzKmzfJhVg4WP4FVhy5N9uKGjnkxSFMuCKGLHQC98QdB04t89/1O/w1cDnyilFU=',
        sessionStore: mSession,
    }).setInitialState(sessData).
        onEvent(linehandler),
};
registerRoutes(server, bots.messenger, {
    path: '/messenger',
    verifyToken: config.verifyToken
});
registerRoutes(server, bots.line, {
    path: '/line'
});

server.listen(8080, () => {
    console.log('server is running on 5000 port...');
});
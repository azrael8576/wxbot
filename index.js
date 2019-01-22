//FB
const {
  MessengerBot,
  MessengerHandler,
  LineBot,
  LineHandler
} = require('bottender');

const { createServer } = require('bottender/express');

const config = require('./bottender.config').messenger;

const handler = new MessengerHandler()
  .onText(/yo/i, async context => {
    await context.sendText('Hi there!');
  })
  .onEvent(async context => {
    await context.sendText("I don't know what you say.");
  })
  .onError(async context => {
    await context.sendText('Something wrong happened.');
  });

// Choose platform
let bot;
bot = new MessengerBot({
  accessToken: config.accessToken,
  appSecret: config.appSecret,
})
// line: new LineBot({
//     channelSecret: '03b7de370e0d852fe25b7b0e3b8f16f7',
//     accessToken: 'yIVA22uhyV5bjZeuM1VdeTCxj3idljOSBPdUcGMpDrbVzYAMkbqwh1y1EzLlLFUpIjnG9J+tsvvgkyFUP6dxshykZw60hu9QNnn8On+bBX7uSzKmzfJhVg4WP4FVhy5N9uKGjnkxSFMuCKGLHQC98QdB04t89/1O/w1cDnyilFU=',
// }).onEvent(handler),
// };

bot.onEvent(handler);
// bot.onEvent(async context => {
//   await context.sendText('Hello World');
// });

const server = createServer(bot, { verifyToken: config.verifyToken });

server.listen(8080, () => {
  console.log('server is running on 8080 port...');
});



//LINE
// const { LineBot, LineHandler } = require('bottender');
// const { createServer } = require('bottender/express');

// const bot = new LineBot({
//   channelSecret: '03b7de370e0d852fe25b7b0e3b8f16f7',
//   accessToken: 'yIVA22uhyV5bjZeuM1VdeTCxj3idljOSBPdUcGMpDrbVzYAMkbqwh1y1EzLlLFUpIjnG9J+tsvvgkyFUP6dxshykZw60hu9QNnn8On+bBX7uSzKmzfJhVg4WP4FVhy5N9uKGjnkxSFMuCKGLHQC98QdB04t89/1O/w1cDnyilFU=',
// });

// const handler = new LineHandler()
//   .onText(/yo/i, async context => {
//     await context.sendText('Hi there!');
//   })
//   .onEvent(async context => {
//     await context.sendText("I don't know what you say.");
//   })
//   .onError(async context => {
//     await context.sendText('Something wrong happened.');
//   });

// bot.onEvent(handler);

// const server = createServer(bot);
// server.listen(8080, () => {
//   console.log('server is running on 8080 port...');
// });





// const server = app.listen(process.env.PORT || 8080, () => {
//   const host = server.address().address;
//   const port = server.address().port;

//   console.log(`Example app listening at http://${host}:${port}`);
// });

// const bot = new ConsoleBot();

// function random(items) {
//   const randomIndex = Math.floor(
//     Math.random() * items.length
//   );
//   return items[randomIndex];
// }

// bot.onEvent(async context => {
//   //講笑話
//   if (context.event.text === '講笑話') {
//     await context.sendText(random([
//       '加油站最怕什麼樣的員工？油槍滑掉的員工',
//       '有一天，西瓜、榴蓮、奇異果一起出去玩，結果榴蓮不見了。因為榴蓮忘返',
//       '海記憶體知己，天涯若比鄰',
//     ]));
//   } else if (context.event.text === '天氣') {
//     var cwbcrawler = require("./cwbcrawler")
//     await context.sendText(
//       cwbcrawler,

//       JSON.stringify(cwbcrawler)
//     );
//   }
// });

// bot.createRuntime();

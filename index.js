const express = require('express');
const { ConsoleBot } = require('bottender');
const app = express();
//const { cwbcrawler } = require('./cwbcrawler');

app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello, world!')
    .end();
});

const server = app.listen(process.env.PORT || 8080, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});

const bot = new ConsoleBot();

function random(items) {
  const randomIndex = Math.floor(
    Math.random() * items.length
  );
  return items[randomIndex];
}

bot.onEvent(async context => {
  //講笑話
  if (context.event.text === '講笑話') {
    await context.sendText(random([
      '加油站最怕什麼樣的員工？油槍滑掉的員工',
      '有一天，西瓜、榴蓮、奇異果一起出去玩，結果榴蓮不見了。因為榴蓮忘返',
      '海記憶體知己，天涯若比鄰',
    ]));
  } else if (context.event.text === '天氣') {
    var cwbcrawler = require("./cwbcrawler")
    await context.sendText(
      cwbcrawler,

      JSON.stringify(cwbcrawler)
    );
  }
});

bot.createRuntime();

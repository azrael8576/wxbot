const { LineClient } = require('messaging-api-line');
const config = require('../config');


const client = LineClient.connect({
    accessToken: config.channelAccessToken,
    channelSecret: config.channelSecret,
});

client.push('U0051e296713d9446d34a22013834ad81', [
    {
        type: 'text',
        text: 'Hello!這是函數',
    },
]);



const textHandler = require('./textHandler');

const handler = async context => {
    if (context.event.isText) {
        await textHandler(context, context.event.text);
    }
    else {
        //nothing
    }
}

module.exports = handler;
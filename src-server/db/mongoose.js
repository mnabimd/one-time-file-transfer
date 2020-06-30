const mongoose = require('mongoose');
const log4js = require('log4js');

log4js.configure({
  appenders: {cheese: { type: 'file', filename: './src-server/logs/log4js.log'} },
  categories: { default: { appenders: ['cheese'], level: 'error'}}
});

const logger = log4js.getLogger('cheese');

mongoose.connect('mongodb+srv://mohammad:Afghan321@cluster0.d2iyo.mongodb.net/transfer-api?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database Connected!')
}).catch(e => {
    console.log(e);
    logger.error(e);
});


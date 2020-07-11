const log4js = require('log4js');

log4js.configure({
    appenders: { log: { type: 'file', filename: 'src-server/logger/logs/log.log'}},
    categories: { default: {appenders: ['log'], level: 'trace'} }
});

const logger = log4js.getLogger('log');

module.exports = logger;


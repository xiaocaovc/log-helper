var log4js = require("log4js");
const _ = require('lodash');
const defaultOptions =
	{
		appenders: {
			console: {
				type: 'console',
				layout: {
					type: 'pattern',
					pattern: '%[%d{yyyy-MM-dd hh:mm:ss:SSS} pid:%x{pid} %p %c -%] %m',
					tokens: {
						pid: function () {
							return process.pid;
						}
					}
				}
			},
			dateLog: {
				type: 'dateFile', filename: "logs/web",
				pattern: "-yyyy-MM-dd.log", alwaysIncludePattern: true,
				pollInterval: 1,
				layout: {
					type: 'pattern',
					pattern: '[%d{yyyy-MM-dd hh:mm:ss:SSS}] [%p]:%m'
				}
			}
		},
		categories: {
			default: {appenders: ['console'], level: 'debug'},
			dateLog: {appenders: ['dateLog'], level: 'debug'}
		},
		pm2: true, // pm2 install pm2-intercom
		pm2InstanceVar: 'INSTANCE_ID'
	};
var LOGGER = function (options,name) {
	var options = _.merge({}, defaultOptions, options);
	log4js.configure(options); // log_config
	const logger = log4js.getLogger();
	console.log = logger.info.bind(logger);
	var fileLogger = {};
	fileLogger.logger = log4js.getLogger(name);
	fileLogger.use=function () { // for koa framework
		return function (ctx, next) {
			ctx.logger = log4js.getLogger(name);
			return next();
		};
	};
	return fileLogger;
};
module.exports = LOGGER;
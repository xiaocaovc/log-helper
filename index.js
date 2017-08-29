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

log4js.configure(defaultOptions);
const logger = log4js.getLogger('console');
console.log = logger.info.bind(logger);
/**
 * 日志配置
 */
exports.configure = function (options) {
	var options = _.merge({}, defaultOptions, options);
	log4js.configure(options); // log_config
};

/**
 * 暴露到应用的日志接口，调用该方法前必须确保已经configure过
 * @param name 指定log4js配置文件中的category。依此找到对应的appender。
 *              如果appender没有写上category，则为默认的category。可以有多个
 * @returns {Logger}
 */
exports.logger = function (name) {
	var loger = log4js.getLogger(name);
	return loger;
};

/**
 * 用于koa2中间件，调用该方法前必须确保已经configure过
 * @returns {Function|*}
 */
exports.use = function (name, level) {
	return function (ctx, next) {
		ctx.logger = log4js.getLogger(name);
		ctx.logger.level = level;
		return next();
	};
};
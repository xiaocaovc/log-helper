/*
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
		pm2: true,
		pm2InstanceVar: 'INSTANCE_ID',
		replaceConsole: true
	};
 */

var log4js = require("../index");
log4js.configure({appenders:{dateLog:{filename: "logs/net"}}})
var logger = log4js.logger("dateLog");
logger.info("info abcd");
console.log("mmmmm");
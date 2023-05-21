import winston from 'winston';
import logConfig from '../config/log.js';

let transports = [new winston.transports.File({ filename: logConfig.file })];

if (logConfig.debug) {
	transports.push(new winston.transports.Console());
}

export default winston.createLogger({
	level: logConfig.level,
	format: winston.format.json(),
	transports: transports,
	format: winston.format.combine(
		winston.format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		winston.format.printf((info) => {
			return (
				JSON.stringify({
					timestamp: info.timestamp,
					level: info.level,
					message: info.message,
					context: info.context,
					refID: info.refID,
				}) + ','
			);
		})
	),
});

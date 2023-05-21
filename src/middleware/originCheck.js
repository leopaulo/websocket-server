import allowedOriginConfig from '../config/allowedOrigin.js';
import logger from '../utils/logger.js';

function validateOrigin(whitelist, origin) {
	if (whitelist.includes('*')) return true;

	return whitelist.some(function (domainPattern) {
		domainPattern = domainPattern.trim();
		let pattern = domainPattern.replace(/\*/, '').replace(/\W/g, (match) => `\\${match}`);
		pattern = RegExp(`^${pattern}`, 'g');
		let isValid = pattern.test(origin);
		return isValid;
	});
}

export default function ({ headers: { origin } }, callback) {
	if (validateOrigin(allowedOriginConfig, origin)) {
		return callback(null, true);
	} else {
		logger.error(`Origin not allowed ${origin}`);
		return callback(`Origin not allowed`, false);
	}
}

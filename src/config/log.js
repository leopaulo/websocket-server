import '../utils/loadConfig.js';

export default {
	level: process.env.LOG_LEVEL || 'info',
	file: process.env.LOG_FILE || './logs/app.log',
	debug: process.env.APP_DEBUG || true,
};

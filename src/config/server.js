import '../utils/loadConfig.js';

export default {
	port: process.env.APP_PORT || 8080,
	host: process.env.APP_HOST_LISTENER || '0.0.0.0',
};

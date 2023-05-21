import '../utils/loadConfig.js';

export default {
	clusters: process.env.REDIS_CLUSTERS.split('|'),
	password: process.env.REDIS_PASSWORD || null,
	showFriendlyErrorStack: process.env.REDIS_SHOW_ERROR || false,
};

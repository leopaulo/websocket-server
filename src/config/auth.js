import '../utils/loadConfig.js';

export default {
	secretKey: process.env.AUTH_KEY,
	algorithm: process.env.AUTH_ALGORITHM,
};

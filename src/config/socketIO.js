import '../utils/loadConfig.js';

export default {
	path: process.env.WS_PATH || '/ws',
	serveClient: false,
	pingTimeout: process.env.WS_PING_TIMEOUT || 120000,
	pingInterval: process.env.WS_PING_INTERVAL || 30000,
	transports: ['websocket'],
	perMessageDeflate: false,
	cookie: process.env.WS_ALLOW_COOKIE || false,
};

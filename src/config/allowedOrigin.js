import '../utils/loadConfig.js';

export default process.env.ORIGIN_ALLOWED ? process.env.ORIGIN_ALLOWED.split('|') : ['*'];

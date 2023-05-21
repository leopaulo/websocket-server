import http from 'http';
import { Server } from 'socket.io';
import socketIOConfig from '../config/socketIO.js';
import originCheck from '../middleware/originCheck.js';

let socketIOServer;

export function create(expressServer) {
	let httpServer = http.createServer(expressServer);
	socketIOConfig.allowRequest = originCheck;
	socketIOServer = new Server(httpServer, socketIOConfig);

	return httpServer;
}

export function get() {
	return socketIOServer;
}

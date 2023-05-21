import express from 'express';
import serverConfig from './config/server.js';
import * as socketIOServer from './utils/socketIOServer.js';
import onConnect from './event/onConnect.js';
import onSend from './event/onSend.js';
import onSendRoom from './event/onSendRoom.js';
import onJoin from './event/onJoin.js';
import onLeave from './event/onLeave.js';
import connectAuth from './middleware/connectAuth.js';
import * as redisHelper from './utils/redisHelper.js';
import { connectHandler, eventHandler } from './utils/eventHandler.js';

// Http Server
let expressServer = express();

expressServer.get('/', (req, res) => {
	res.send('This is a websocket server, nothing to do here...');
});

// Create Websocket Server
let socketHttpServer = socketIOServer.create(expressServer);
let socketIOServerInstance = socketIOServer.get();

// Redis adapter setup
redisHelper.adapter(socketIOServerInstance);

// Websocket Event handlers
socketIOServerInstance.use(connectAuth).on(
	'connection',
	connectHandler(function (...args) {
		let socket = args[0];

		onConnect.apply(this, args);

		socket.on('send', eventHandler(onSend, socket));
		socket.on('sendRoom', eventHandler(onSendRoom, socket));
		socket.on('join', eventHandler(onJoin, socket));
		socket.on('leave', eventHandler(onLeave, socket));
	})
);

// Start Server
socketHttpServer.listen(serverConfig.port, serverConfig.host, () => {
	console.log(`Server on http://${serverConfig.host}:${serverConfig.port}`);
});

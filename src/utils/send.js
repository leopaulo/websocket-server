import * as socketIOServer from './socketIOServer.js';

export function send(event, reciever, data, socket) {
	socketIOServer.get().to(reciever).emit(event, { data: data, from: socket.userSession.userID });
}

export function notify(socket, data) {
	socketIOServer.get().to(socket.id).emit('notice', data);
}

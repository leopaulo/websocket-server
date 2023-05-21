import { notify } from '../utils/send.js';
import { userRoomID } from '../utils/userID.js';

export default function (socket) {
	socket.join(userRoomID(socket.userSession.userID));

	notify(socket, {
		message: 'Succesfully Connected!',
		version: process.env.npm_package_version,
	});
}

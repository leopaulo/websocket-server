import { validate } from '../eventvalidation/onSend.js';
import eventError from '../exception/eventError.js';
import { send } from '../utils/send.js';
import successHandler from '../utils/successHandler.js';
import { userRoomID } from '../utils/userID.js';

export default function (data, callback, socket) {
	let validatedData = validate(data);

	if (validatedData.result == true) {
		send(data.event, userRoomID(socket.userSession.userID), data.data, socket);

		successHandler(
			{
				event: validatedData.event,
				to: validatedData.to,
			},
			callback
		);
	} else {
		throw new eventError(validatedData, callback);
	}
}

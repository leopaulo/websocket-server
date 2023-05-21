import { validate } from '../eventValidation/onSendRoom.js';
import eventError from '../exception/eventError.js';
import { send } from '../utils/send.js';
import successHandler from '../utils/successHandler.js';

export default function (data, callback, socket) {
	let validatedData = validate(data, socket);

	if (validatedData.result == true) {
		send(data.event, data.rooms, data.data, socket);

		successHandler(
			{
				event: validatedData.event,
				rooms: data.rooms,
			},
			callback
		);
	} else {
		throw new eventError(validatedData, callback);
	}
}

import { validate } from '../eventValidation/onLeave.js';
import eventError from '../exception/eventError.js';
import successHandler from '../utils/successHandler.js';

export default function (data, callback, socket) {
	let validatedData = validate(data);

	if (validatedData.result == true) {
		data.rooms.forEach((roomValue) => {
			socket.leave(roomValue);
		});

		successHandler(
			{
				rooms: data.rooms,
			},
			callback
		);
	} else {
		throw new eventError(validatedData, callback);
	}
}

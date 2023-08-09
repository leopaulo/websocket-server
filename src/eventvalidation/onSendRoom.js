import { errorFormat, successFormat } from './resultFormat.js';
import { getUserIDPrefix } from '../utils/userID.js';
import { inArray } from '../utils/arrayHelper.js';
import { getInvalidSendEvents } from '../utils/invalidValues.js';

export function validate(data, socket) {
	if (Object.hasOwn(data, 'from')) {
		return errorFormat('ERR_00003', 'Invalid send property "from"', data);
	}

	if (Object.hasOwn(data, 'event') && inArray(data.event, getInvalidSendEvents())) {
		return errorFormat('ERR_00003', 'Invalid event value', data);
	}

	if (!Object.hasOwn(data, 'rooms')) {
		return errorFormat('ERR_00003', 'No "rooms"', data);
	}

	if (!Array.isArray(data.rooms)) {
		return errorFormat('ERR_00004', '"rooms" is not an array', data);
	}

	let invalidRoom = data.rooms.find(
		(roomValue) => roomValue.startsWith(getUserIDPrefix()) || !socket.rooms.has(roomValue)
	);

	if (invalidRoom !== undefined) {
		return errorFormat('ERR_00004', `Invalid room name or you are  not joined "${invalidRoom}"`, {
			...data,
			available: socket.rooms,
		});
	}

	return successFormat();
}

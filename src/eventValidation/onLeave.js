import { errorFormat, successFormat } from './resultFormat.js';
import { getUserIDPrefix } from '../utils/userID.js';

export function validate(data) {
	if (!Object.hasOwn(data, 'rooms')) {
		return errorFormat('ERR_00003', 'No "rooms"', data);
	}

	if (!Array.isArray(data.rooms)) {
		return errorFormat('ERR_00004', '"rooms" is not an array', data);
	}

	let invalidRoom = data.rooms.find((roomValue) => roomValue.startsWith(getUserIDPrefix()));

	if (invalidRoom !== undefined) {
		return errorFormat('ERR_00004', `Invalid room name "${invalidRoom}"`, {
			...data,
		});
	}

	return successFormat();
}

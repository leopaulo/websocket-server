import { errorFormat, successFormat } from './resultFormat.js';

export function validate(data) {
	if (data.error) {
		return errorFormat('ERR_00001', `Invalid token ${data.token}`, data);
	}

	if (!Array.isArray(data.rooms)) {
		return errorFormat('ERR_00003', `Invalid room`, data);
	}

	return successFormat();
}

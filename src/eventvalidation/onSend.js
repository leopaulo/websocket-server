import { errorFormat, successFormat } from './resultFormat.js';
import { inArray } from '../utils/arrayHelper.js';
import { isEmpty } from '../utils/dataType.js';
import { getInvalidSendEvents } from '../utils/invalidValues.js';

export function validate(data) {
	if (Object.hasOwn(data, 'from')) {
		return errorFormat('ERR_00003', 'Invalid send property "from"', data);
	}

	if (Object.hasOwn(data, 'event') && inArray(data.event, getInvalidSendEvents())) {
		return errorFormat('ERR_00003', 'Invalid event value', data);
	}

	if (isEmpty(data.to)) {
		return errorFormat('ERR_00003', 'No recipient "to"', data);
	}

	return successFormat();
}

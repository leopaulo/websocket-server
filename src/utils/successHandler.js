import { isFunction } from './dataType.js';

export default function successHandler(data, callback) {
	data = data || {};

	if (isFunction(callback)) {
		callback({ result: true, data });
	}
}

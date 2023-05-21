export function isObject(value) {
	return typeof value === 'object' && value !== null;
}

export function isString(value) {
	return typeof value === 'string';
}

export function isEmpty(value) {
	// undefined and null
	if (typeof value == 'undefined' || value == null) {
		return true;
	}

	// string
	if (typeof value == 'string') {
		return value == '';
	}

	// array
	if (Array.isArray(value)) {
		return value.length <= 0;
	}

	// object
	if (typeof value === 'object') {
		for (var prop in value) {
			if (Object.prototype.hasOwnProperty.call(value, prop)) {
				return false;
			}
		}
		return true;
	}

	return false;
}

export function isFunction(value) {
	return typeof value === 'function';
}

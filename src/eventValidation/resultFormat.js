export function errorFormat(messageCode, message, data) {
	return {
		result: false,
		errorMessage: message,
		errorData: {
			messageCode,
			context: data,
		},
	};
}

export function successFormat() {
	return { result: true };
}

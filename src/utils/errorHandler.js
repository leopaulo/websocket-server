import logger from '../utils/logger.js';
import { randomNumber } from './generator.js';
import { parse } from 'stack-trace';
import { send } from './send.js';
import { isFunction } from './dataType.js';

const ERROR_MESSAGE = {
	ERR_00001: 'Auth token invalid',
	ERR_00002: 'Something went wrong',
	ERR_00003: 'Invalid payload format',
	ERR_00004: 'Invalid room',
};

export function middlewareError(errorCode, logContext) {
	let message = ERROR_MESSAGE[errorCode];
	let refID = randomNumber(9);

	logger.error({
		message: message,
		context: logContext,
		refID: refID,
	});

	let error = new Error(message);
	error.data = { code: errorCode, refID: refID };
	return error;
}

export function eventError(error, socket) {
	let refID = randomNumber(9);
	let messageCode = error.messageCode || 'ERR_00002';
	let additionalContext = error.context || {};
	let trace = parse(error);
	let fileName;
	let line;

	if (trace.length > 0) {
		fileName = trace[0].fileName;
		line = trace[0].lineNumber;
	}

	logger.error({
		message: error.message,
		refID: refID,
		context: {
			messageCode: messageCode,
			file: fileName,
			line: line,
			...additionalContext,
		},
	});

	let errorMessage = {
		result: false,
		message: ERROR_MESSAGE[messageCode],
		code: messageCode,
		refID: refID,
	};

	if (isFunction(error.callback)) {
		error.callback(errorMessage);
	} else {
		send(
			'error',
			socket.id,
			{
				message: ERROR_MESSAGE[messageCode],
				code: messageCode,
				refID: refID,
			},
			socket
		);
	}

	socket.disconnect();
}

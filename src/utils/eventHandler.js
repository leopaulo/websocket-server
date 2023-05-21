import { eventError } from './errorHandler.js';

export function eventHandler(handler, socket) {
	return (...args) => {
		args.push(socket);

		try {
			const ret = handler.apply(this, args);

			if (ret && typeof ret.catch === 'function') {
				// async handler
				ret.catch((error) => eventError.apply(this, [error, socket, ...args]));
			}
		} catch (error) {
			// sync handler
			eventError.apply(this, [error, socket, ...args]);
		}
	};
}

export function connectHandler(handler) {
	return (...args) => {
		try {
			const ret = handler.apply(this, args);

			if (ret && typeof ret.catch === 'function') {
				// async handler
				ret.catch((error) => eventError.apply(this, [error, ...args]));
			}
		} catch (error) {
			// sync handler
			eventError.apply(this, [error, ...args]);
		}
	};
}

import { validate } from '../eventvalidation/onJoin.js';
import eventError from '../exception/eventError.js';
import authConfig from '../config/auth.js';
import successHandler from '../utils/successHandler.js';
import jwt from 'jsonwebtoken';

export default function (data, callback, socket) {
	jwt.verify(data.token, authConfig.secretKey, { algorithms: [authConfig.algorithm] }, function (error, rooms) {
		let validatedData = validate({
			...data,
			error,
			rooms,
		});

		if (validatedData.result == true) {
			socket.join(rooms);

			successHandler(
				{
					rooms: rooms,
				},
				callback
			);
		} else {
			throw new eventError(validatedData, callback);
		}
	});
}

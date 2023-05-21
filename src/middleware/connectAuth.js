import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.js';
import { middlewareError } from '../utils/errorHandler.js';
import { isEmpty } from '../utils/dataType.js';

let errorResponse = function (socket, next) {
	return next(middlewareError('ERR_00001', socket.handshake.auth.token));
};

let validateTokenContent = function (userSession) {
	return !isEmpty(userSession.userID);
};

export default function (socket, next) {
	let token = socket.handshake.auth.token;

	if (token) {
		jwt.verify(token, authConfig.secretKey, { algorithms: [authConfig.algorithm] }, function (err, userSession) {
			if (err) {
				return errorResponse(socket, next);
			} else {
				socket.userSession = userSession;

				if (validateTokenContent(userSession)) {
					return next();
				} else {
					return errorResponse(socket, next);
				}
			}
		});
	} else {
		return errorResponse(socket, next);
	}
}

import { io } from 'socket.io-client';

const CONFIG = {
	randomizationFactor: 0,
	autoConnect: false,
	transports: ['websocket'],
	rememberUpgrade: true,
};

let isConnected = false;
let isConnecting = false;
let isError = false;
let connectionError;
let onConnectedPoll = [];
let onErrorPoll = [];
let socket;

function callbackFormatter(success, error) {
	return success || error
		? (data) => {
				if (data.result) {
					success && success(data);
				} else {
					error && error(data);
				}
		  }
		: null;
}

export function join(token, success, error) {
	socket.emit(
		'join',
		{
			token,
		},
		callbackFormatter(success, error)
	);
}

export function leave(rooms, success, error) {
	socket.emit(
		'leave',
		{
			rooms,
		},
		callbackFormatter(success, error)
	);
}

/**
 * @param {event, to, data} detail
 * @param function success
 * @param function error
 */
export function send(detail, success, error) {
	let event = detail.event || 'message';
	let data = detail.data;

	socket.emit(
		'send',
		{
			event: event,
			to: detail.to,
			data: data,
		},
		callbackFormatter(success, error)
	);
}

/**
 * @param {event, to, data} detail
 * @param function success
 * @param function error
 */
export function sendRoom(detail, success, error) {
	let event = detail.event || 'message';
	let data = detail.data;

	socket.emit(
		'sendRoom',
		{
			event: event,
			rooms: detail.rooms,
			data: data,
		},
		callbackFormatter(success, error)
	);
}

function setAsError(onError, error) {
	onError && onError(error);
	onErrorPoll.forEach((onErrorItem) => {
		onErrorItem(error);
	});
	isConnected = true;
	isConnecting = false;
	isError = true;
	connectionError = error;
}

/**
 * @param function getSocketAuth      // function to pass websocket connection options
 * 									  // function(success callback, error callback)
 * @param function onConnected
 * @param function onError
 */
export default function connect(getSocketAuth, onConnected, onError) {
	if (!isConnected && !isConnecting) {
		isConnecting = true;

		getSocketAuth(
			function ({ data: { data } }) {
				let connectError = 0;

				socket = io(data.url, {
					auth: {
						token: data.token,
					},
					...data.options,
					...CONFIG,
				});

				socket.on('connect', () => {
					isConnected = true;
					isConnecting = false;
					onConnected && onConnected(socket);
					onConnectedPoll.forEach((onConnectedItem) => {
						onConnectedItem(socket);
					});
				});

				socket.on('connect_error', (error) => {
					if (
						error.data !== undefined &&
						error.data.code != undefined &&
						error.data.code != null &&
						error.data.code.trim() != ''
					) {
						setAsError(onError, error);
					} else {
						if (connectError >= data.reconnectionAttempts) {
							setAsError(onError, error);
						} else {
							connectError++;
						}
					}
				});

				socket.connect();
			},
			() => {
				setAsError(onError, {
					return: false,
					code: 'ERR_00000',
					message: 'Error getting the config',
					refID: 'Unknown',
				});
			}
		);
	} else {
		if (isConnected) {
			if (isError) {
				onError && onError(connectionError);
			} else {
				onConnected && onConnected(socket);
			}
		} else {
			onConnected && onConnectedPoll.push(onConnected);
			onError && onErrorPoll.push(onError);
		}
	}
}

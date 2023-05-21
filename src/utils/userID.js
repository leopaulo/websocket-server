const USER_ROOM_REFIX = 'userID';

export function userRoomID(userID) {
	return USER_ROOM_REFIX + userID;
}

export function getUserIDPrefix() {
	return USER_ROOM_REFIX;
}

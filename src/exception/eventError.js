export default class MyError extends Error {
	constructor(data, callback) {
		super(data.errorMessage);
		this.messageCode = data.errorData.messageCode;
		this.context = data.errorData.context;
		this.reqNumber = data.errorData.context.reqNumber;
		this.callback = callback;
	}
}

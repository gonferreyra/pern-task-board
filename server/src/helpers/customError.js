export class CustomError extends Error {
  constructor(message, statusCode, errorCode = null) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isCustom = true; // To differentiate custom errors.
  }
}

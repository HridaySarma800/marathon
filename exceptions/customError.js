export class CustomError extends Error {
  constructor(message, status, additionalInfo) {
    super(message);
    this.message = message;
    this.status = status;
    this.additionalInfo = additionalInfo;
  }
}

export const IResponseError = {
  message: "",
  additionalInfo: "",
};

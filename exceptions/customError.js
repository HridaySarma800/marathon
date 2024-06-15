export class CustomError extends Error{
    constructor(){
        this.message,
        this.status,
        this.additionalInfo
    }
}

export const IResponseError = {
    message,
    additionalInfo
}
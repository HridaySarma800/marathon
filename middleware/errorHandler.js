import { CustomError, IResponseError } from "../exceptions/customError.js";
import GlobalResponse from "../models/global_response.js";

export function errorHandler({ err, req, res, next }) {
  console.error(err);
  if (!(err instanceof CustomError)) {
    res.status(500).send(
      new GlobalResponse(false, "An server error occurred", err.message)
    );
  } else {
    const response = IResponseError(err.message);
    if (err.additionalInfo) response.additionalInfo = err.additionalInfo;
    res.status(err.status).type("json").send(JSON.stringify(response));
  }
}

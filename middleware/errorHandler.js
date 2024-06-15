import { CustomError, IResponseError } from "../exceptions/customError";

export function errorHandler({err,req,res,next}){
    console.error(err)
    if(!(err instanceof CustomError)){
        res.status(500).send(
            JSON.stringify({
                message:"Server error, please try again later."
            })
        )
    }else{
     const response = IResponseError(err.message);
     if(err.additionalInfo) response.additionalInfo = err.additionalInfo

     res.status(err.status).type('json').send(JSON.stringify(response))
    }
}
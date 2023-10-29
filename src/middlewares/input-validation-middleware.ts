import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

type ErrorsMessages = {
    message: string
    field: string
}


export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const myValidationResult = validationResult.withDefaults({
        formatter: (error) => {
            return {
                    message: error.msg,
                    field: error.path
                    }

    }})
    const errors  = myValidationResult(req)
    if (!errors.isEmpty()) {

        res.status(400).json({ errorsMessages: errors.array()})
        return

    } else {
        next()
    }
}
import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";


export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const errorsMessages = validationResult(req).array()

    if (errorsMessages) {
        res.status(400).json({ errors: errorsMessages })
        return
    } else {
        next()
    }
}
import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";


export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array()
    if (errors) {
        res.status(400).json({ errors: errors })
        return
    } else {
        next()
    }
}
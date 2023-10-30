import {NextFunction, Request, Response} from "express";


export const authorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const admin = req.headers.authorization
    if (admin === 'Basic YWRtaW4=') {
        return next()
    } else {
        res.sendStatus(401)
    }
}
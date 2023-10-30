import {body} from "express-validator";

export const blogInputValidation = [
    body('name')
        .trim()
        .isLength({ min: 1, max: 15}),

    body('description')
        .trim()
        .isLength({ min: 1, max: 500}),

    body('websiteUrl')
        .isURL({ protocols: ['https'] })
]
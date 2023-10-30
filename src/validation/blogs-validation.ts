import {body} from "express-validator";

export const blogInputValidation = [
    body('name')
        .isString().withMessage('Invalid type')
        .trim()
        .isLength({ min: 1, max: 15}).withMessage('Invalid Length'),

    body('description')
        .isString().withMessage('Invalid type')
        .trim()
        .isLength({ min: 1, max: 500}).withMessage('Invalid Length'),

    body('websiteUrl')
        .isString().withMessage('Invalid type')
        .isLength({ min: 1, max: 100}).withMessage('Invalid Length')
        .isURL({ protocols: ['https'] }).withMessage('Invalid URL')
]
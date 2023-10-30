import {body} from "express-validator";
import {blogsRepository} from "../repositories/blogs-repository";


export const postInputValidation = [
    body('title')
        .isString().withMessage('Invalid type')
        .trim()
        .isLength({ min: 1, max: 30}).withMessage('Invalid Length'),

    body('shortDescription')
        .isString().withMessage('Invalid type')
        .trim()
        .isLength({ min: 1, max: 100}).withMessage('Invalid Length'),

    body('content')
        .isString().withMessage('Invalid type')
        .trim()
        .isLength({ min: 1, max: 1000}).withMessage('Invalid Length'),

    body('blogId')
        .isString().withMessage('Invalid type')
        .custom(id => {
            const isBlog = blogsRepository.findBlogById(id)
            if (!isBlog) {
                throw new Error("Invalid BlogId")
            } else {
                return true
            }
        })
]
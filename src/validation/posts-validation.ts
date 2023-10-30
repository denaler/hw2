import {body} from "express-validator";
import {blogsRepository} from "../repositories/blogs-repository";


export const postInputValidation = [
    body('title')
        .trim()
        .isLength({ min: 1, max: 30}),

    body('shortDescription')
        .trim()
        .isLength({ min: 1, max: 100}),

    body('content')
        .trim()
        .isLength({ min: 1, max: 1000}),

    body('blogId')
        .custom(id => {
            const isBlog = blogsRepository.findBlogById(id)
            if (!isBlog) {
                throw new Error("blogId")
            } else {
                return true
            }
        })
]
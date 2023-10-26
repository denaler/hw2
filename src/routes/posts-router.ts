import {Router} from "express";
import express, {Request, Response} from 'express';
import {postsRepository} from "../repositories/posts-repository";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";

export const postsRouter = Router({})

type RequestWithParams<P> = Request<P, {}, {}, {}>
type RequestWithBody<B> = Request<{}, {}, B, {}>
type RequestWithParamsAndBody<P,B> = Request<P, {}, B, {}>

const titleValidation = body('title').trim().isLength({ min: 1, max: 30})
const shortDescriptionValidation = body('shortDescription').trim().isLength({ min: 1, max: 100})
const contentValidation = body('content').trim().isLength({ min: 1, max: 1000})
const blogIdValidation = body('blogId').trim().isLength({ min: 1 })
postsRouter.get('/', (req:Request, res: Response) => {

    res.status(200).send(postsRepository.posts(1))
})

postsRouter.post('/',
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation,
    inputValidationMiddleware,
    (req:RequestWithBody<
    {title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
    }>, res: Response) => {

    let {title, shortDescription, content, blogId, blogName } = req.body

    const newPost = postsRepository.createPost(title, shortDescription, content, blogId, blogName)
    res.status(201).send(newPost)
})

postsRouter.get('/:id', (req:RequestWithParams<{ id: string }>, res: Response) => {

    const post = postsRepository.findPostById(req.params.id)

    if (!post) {
        res.sendStatus(404)
        return
    }
    res.status(200).send(post)
})

postsRouter.put('/:id',
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation,
    inputValidationMiddleware,
    (req:RequestWithParamsAndBody<
    { id: string },
    {title: string,
    shortDescription: string,
    content: string,
    blogId: string
    blogName: string
}>, res: Response) => {

    const post = postsRepository.findPostById(req.params.id)
    if (!post) {
        res.sendStatus(404)
        return
    }

    let {title, shortDescription, content, blogId, blogName} = req.body
    let {id} = req.params

    const isUpdate = postsRepository.updatePost(id, title, shortDescription, content, blogId, blogName)
    if (isUpdate) {
        res.sendStatus(204)
    }
    res.sendStatus(422)
})

postsRouter.delete('/:id', (req:RequestWithParams<{ id: string }>, res: Response) => {

    const post = postsRepository.findPostById(req.params.id)
    if (!post) {
        res.sendStatus(404)
        return
    }

    const isDelete = postsRepository.deletePost(req.params.id)
    if (isDelete) {
        res.sendStatus(204)
    }
    res.sendStatus(422)
})
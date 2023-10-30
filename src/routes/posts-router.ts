import {Router} from "express";
import express, {Request, Response} from 'express';
import {postsRepository} from "../repositories/posts-repository";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {authorizationMiddleware} from "../middlewares/authorization-middleware";
import {postInputValidation} from "../validation/posts-validation";
import {BodyPostModel} from "../features/posts/models/input/body-post-model";
import {ParamsPostModel} from "../features/posts/models/input/params-post-model";


export const postsRouter = Router({})

type RequestWithParams<P> = Request<P, {}, {}, {}>
type RequestWithBody<B> = Request<{}, {}, B, {}>
type RequestWithParamsAndBody<P,B> = Request<P, {}, B, {}>


postsRouter.get('/', (req:Request, res: Response) => {

    res.status(200).send(postsRepository.posts(1))
})

postsRouter.post('/', authorizationMiddleware, postInputValidation, inputValidationMiddleware,

    (req:RequestWithBody<BodyPostModel>, res: Response) => {

    let {title, shortDescription, content, blogId, blogName } = req.body

        const newPost = postsRepository.createPost(title, shortDescription, content, blogId, blogName)

        res.status(201).send(newPost)
})

postsRouter.get('/:id', (req:RequestWithParams<ParamsPostModel>, res: Response) => {

    const post = postsRepository.findPostById(req.params.id)

    if (!post) {
        res.sendStatus(404)
        return
    }
    res.status(200).send(post)
})

postsRouter.put('/:id', authorizationMiddleware, postInputValidation, inputValidationMiddleware,

    (req:RequestWithParamsAndBody<ParamsPostModel, BodyPostModel>, res: Response) => {

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

postsRouter.delete('/:id', authorizationMiddleware,

    (req:RequestWithParams<ParamsPostModel>, res: Response) => {

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
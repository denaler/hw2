import {Router} from "express";
import express, {Request, Response} from 'express';
import {postsRepository} from "../repositories/posts-repository";
export const postsRouter = Router({})

type RequestWithParams<P> = Request<P, {}, {}, {}>
type RequestWithBody<B> = Request<{}, {}, B, {}>
type RequestWithParamsAndBody<P,B> = Request<P, {}, B, {}>
type ErrorsMessages = {
    message: string,
    field: string
}
type ErrorType = {
    errorsMessages: ErrorsMessages[]
}

postsRouter.get('/', (req:Request, res: Response) => {
    res.status(200).send(postsRepository.posts(1))
})

postsRouter.post('/', (req:RequestWithBody<
    {title: string,
    shortDescription: string,
    content: string,
    blogId: string
    }>, res: Response) => {

    let errors: ErrorType = {
        errorsMessages: []
    }
    let {title, shortDescription, content, blogId} = req.body

    if (!title || title.trim().length > 30) {
        errors.errorsMessages.push({message: 'Invalid title', field: 'title'})
    }
    if (!shortDescription || shortDescription.trim().length > 500) {
        errors.errorsMessages.push({message: 'Invalid shortDescription', field: 'shortDescription'})
    }
    if (!content || content.trim().length > 1000) {
        errors.errorsMessages.push({message: 'Invalid content', field: 'content'})
    }
    if (!blogId) {
        errors.errorsMessages.push({message: 'Invalid blogId', field: 'blogId'})
    }

    if (errors.errorsMessages.length) {
        res.status(400).send(errors)
        return
    }

    const newPost = postsRepository.createPost(title, shortDescription, content, blogId)
    res.status(201).send(newPost)
})

postsRouter.get('/:id', (req:RequestWithParams<{ id: string }>, res: Response) => {
    const post = postsRepository.findPostsById(req.params.id)

    if (!post) {
        res.sendStatus(404)
        return
    }
    res.status(200).send(post)
})

postsRouter.put('/:id', (req:RequestWithParamsAndBody<
    { id: string },
    { title: string,
    shortDescription: string,
    content: string,
    blogId: string
    }>, res: Response) => {

    const post = postsRepository.findPostsById(req.params.id)
    if (!post) {
        res.sendStatus(404)
        return
    }

    let errors: ErrorType = {
        errorsMessages: []
    }

    let {title, shortDescription, content, blogId} = req.body
    let {id} = req.params

    if (!title || title.trim().length > 30) {
        errors.errorsMessages.push({message: 'Invalid title', field: 'title'})
    }
    if (!shortDescription || shortDescription.trim().length > 100) {
        errors.errorsMessages.push({message: 'Invalid shortDescription', field: 'shortDescription'})
    }
    if (!content || content.trim().length > 1000) {
        errors.errorsMessages.push({message: 'Invalid content', field: 'content'})
    }
    if (!blogId) {
        errors.errorsMessages.push({message: 'Invalid blogId', field: 'blogId'})
    }

    if (errors.errorsMessages.length) {
        res.status(400).send(errors)
        return
    }

    const isUpdate = postsRepository.updatePosts(id, title, shortDescription, content, blogId)
    if (isUpdate) {
        res.sendStatus(204)
    }
    res.sendStatus(422)
})

postsRouter.delete('/:id', (req:RequestWithParams<{ id: string }>, res: Response) => {

    const post = postsRepository.findPostsById(req.params.id)
    if (!post) {
        res.sendStatus(404)
        return
    }

    const isDelete = postsRepository.deletePosts(req.params.id)
    if (isDelete) {
        res.sendStatus(200)
    }
    res.sendStatus(422)
})
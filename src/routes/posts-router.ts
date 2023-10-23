import {Router} from "express";
import express, {Request, Response} from 'express';
export const postsRouter = Router({})

type RequestWithParams<P> = Request<P, {}, {}, {}>
type RequestWithBody<B> = Request<{}, {}, B, {}>
type RequestWithParamsAndBody<P,B> = Request<P, {}, B, {}>

type PostType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
}

type ErrorsMessages = {
    message: string,
    field: string
}

type ErrorType = {
    errorsMessages: ErrorsMessages[]
}

export const postsDb: PostType[] = []

postsRouter.get('/', (req:Request, res: Response) => {
    res.status(200).send(postsDb)
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

    const newPost: PostType = {
        id: (new Date()).toString(),
        title: title,
        shortDescription: shortDescription,
        content: content,
        blogId: blogId,
        blogName: ''
    }

    postsDb.push(newPost)

    res.status(201).send(newPost)
})

postsRouter.get('/:id', (req:RequestWithParams<{ id: string }>, res: Response) => {
    const id = req.params.id
    const post = postsDb.find((post) => post.id === id)

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

    const id = req.params.id
    const post = postsDb.find((post) => post.id === id)

    if (!post) {
        res.sendStatus(404)
        return
    }

    let errors: ErrorType = {
        errorsMessages: []
    }
    let {title, shortDescription, content, blogId} = req.body

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

    let i = postsDb.indexOf(post)
    postsDb[i].title = title
    postsDb[i].shortDescription = shortDescription
    postsDb[i].content = content
    postsDb[i].blogId = blogId

    res.sendStatus(204)
})

postsRouter.delete('/:id', (req:RequestWithParams<{ id: string }>, res: Response) => {
    const id = req.params.id
    const post = postsDb.find((post) => post.id === id)

    if (!post) {
        res.sendStatus(404)
        return
    }
    postsDb.slice(postsDb.indexOf(post), 1)

    res.sendStatus(200)
})
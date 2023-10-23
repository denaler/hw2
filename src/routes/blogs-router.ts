import {Router} from "express";
import express, {Request, Response} from 'express';
export const blogsRouter = Router({})

type RequestWithParams<P> = Request<P, {}, {}, {}>
type RequestWithBody<B> = Request<{}, {}, B, {}>
type RequestWithParamsAndBody<P,B> = Request<P, {}, B, {}>

type BlogType = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string
}

type ErrorsMessages = {
    message: string,
    field: string
}

type ErrorType = {
    errorsMessages: ErrorsMessages[]
}
export const blogsDb: BlogType[] = []

blogsRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(blogsDb)
})

blogsRouter.post('/', (req: RequestWithBody<
    {name: string,
    description: string,
    websiteUrl: string
    }>, res: Response) => {

    let errors: ErrorType = {
        errorsMessages: []
    }
    let {name, description, websiteUrl} = req.body

    if (!name || name.trim().length > 15) {
        errors.errorsMessages.push({message: 'Invalid name', field: 'name'})
    }
    if (!description || description.trim().length > 500) {
        errors.errorsMessages.push({message: 'Invalid description', field: 'description'})
    }
    if (!websiteUrl || websiteUrl.trim().length > 100) {
        errors.errorsMessages.push({message: 'Invalid websiteUrl', field: 'websiteUrl'})
    }

    if (errors.errorsMessages.length) {
        res.status(400).send(errors)
        return
    }

    const newBlog: BlogType = {
        id: (new Date()).toString(),
        name: name,
        description: description,
        websiteUrl: websiteUrl
    }

    blogsDb.push(newBlog)

    res.status(201).send(newBlog)
})

blogsRouter.get('/:id', (req:RequestWithParams<{ id: string }>, res: Response) => {
    const id = req.params.id
    const blog = blogsDb.find((blog) => blog.id === id)

    if (!blog) {
        res.sendStatus(404)
        return
    }
    res.status(200).send(blog)
})

blogsRouter.put('/:id', (req:RequestWithParamsAndBody<
    { id: string },
    { name: string,
    description: string,
    websiteUrl: string
}>, res: Response) => {

    const id = req.params.id
    const blog = blogsDb.find((blog) => blog.id === id)

    if (!blog) {
        res.sendStatus(404)
        return
    }

    let errors: ErrorType = {
        errorsMessages: []
    }
    let {name, description, websiteUrl} = req.body

    if (!name || name.trim().length > 15) {
        errors.errorsMessages.push({message: 'Invalid name', field: 'name'})
    }
    if (!description || description.trim().length > 500) {
        errors.errorsMessages.push({message: 'Invalid description', field: 'description'})
    }
    if (!websiteUrl || websiteUrl.trim().length > 100) {
        errors.errorsMessages.push({message: 'Invalid websiteUrl', field: 'websiteUrl'})
    }

    if (errors.errorsMessages.length) {
        res.status(400).send(errors)
        return
    }

    let i = blogsDb.indexOf(blog)
    blogsDb[i].name = name
    blogsDb[i].description = description
    blogsDb[i].websiteUrl = websiteUrl

    res.sendStatus(204)
})

blogsRouter.delete('/:id', (req:RequestWithParams<{ id: string }>, res: Response) => {
    const id = req.params.id
    const blog = blogsDb.find((blog) => blog.id === id)

    if (!blog) {
        res.sendStatus(404)
        return
    }
    blogsDb.slice(blogsDb.indexOf(blog), 1)

    res.sendStatus(204)
})

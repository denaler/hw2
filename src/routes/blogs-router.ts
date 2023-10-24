import {Router} from "express";
import express, {Request, Response} from 'express';
import {blogsDb, blogsRepository} from "../repositories/blogs-repository";
export const blogsRouter = Router({})

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

    const newBlog = blogsRepository.createBlogs(name,description,websiteUrl)
    res.status(201).send(newBlog)
})

blogsRouter.get('/:id', (req:RequestWithParams<{ id: string }>, res: Response) => {

    let blog = blogsRepository.findBlogById(req.params.id)
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

    const blog = blogsRepository.findBlogById(req.params.id)
    if (!blog) {
        res.sendStatus(404)
        return
    }

    let errors: ErrorType = {
        errorsMessages: []
    }
    let {name, description, websiteUrl} = req.body
    let {id} = req.params

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

    const isUpdate = blogsRepository.updateBlog(blog)
    if (isUpdate) {
        res.sendStatus(204)
    }
    res.sendStatus(422)
})

blogsRouter.delete('/:id', (req:RequestWithParams<{ id: string }>, res: Response) => {

    const blog = blogsRepository.findBlogById(req.params.id)
    if (!blog) {
        res.sendStatus(404)
        return
    }

    const isDelete = blogsRepository.deleteBlog(req.params.id)
    if (isDelete) {
        res.sendStatus(204)
    }
    res.sendStatus(422)
})
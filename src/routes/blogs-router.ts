import {Router} from "express";
import express, {Request, Response} from 'express';
import {blogsRepository} from "../repositories/blogs-repository";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";

export const blogsRouter = Router({})

type RequestWithParams<P> = Request<P, {}, {}, {}>
type RequestWithBody<B> = Request<{}, {}, B, {}>
type RequestWithParamsAndBody<P,B> = Request<P, {}, B, {}>

const nameValidation = body('name').trim().isLength({ min: 1, max: 15})
const descriptionValidation = body('description').trim().isLength({ min: 1, max: 500})
const websiteUrlValidation = body('websiteUrl').trim().isLength({ min: 1, max: 100}).isURL({ protocols: ['https'] })

blogsRouter.get('/', (req: Request, res: Response) => {

    res.status(200).send(blogsRepository.blogs(1))
})

blogsRouter.post('/',
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
    inputValidationMiddleware,
    (req: RequestWithBody<
    {name: string,
    description: string,
    websiteUrl: string
    }>, res: Response) => {

    let {name, description, websiteUrl} = req.body

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

blogsRouter.put('/:id',
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
    inputValidationMiddleware,
    (req:RequestWithParamsAndBody<
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

    let {name, description, websiteUrl} = req.body
    let {id} = req.params

    const isUpdate = blogsRepository.updateBlog(id, name, description, websiteUrl)
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
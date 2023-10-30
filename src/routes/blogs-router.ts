import {Router} from "express";
import express, {Request, Response} from 'express';
import {blogsRepository} from "../repositories/blogs-repository";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {blogInputValidation} from "../validation/blogs-validation";
import {authorizationMiddleware} from "../middlewares/authorization-middleware";
import {BodyBlogModel} from "../features/blogs/models/input/body-blog-model";
import {ParamsBlogModel} from "../features/blogs/models/input/params-blog-model";

export const blogsRouter = Router({})

type RequestWithParams<P> = Request<P, {}, {}, {}>
type RequestWithBody<B> = Request<{}, {}, B, {}>
type RequestWithParamsAndBody<P,B> = Request<P, {}, B, {}>

blogsRouter.get('/', (req: Request, res: Response) => {

    res.status(200).send(blogsRepository.blogs(1))
})

blogsRouter.post('/', authorizationMiddleware, blogInputValidation, inputValidationMiddleware,

    (req: RequestWithBody<BodyBlogModel>, res: Response) => {

    let {name, description, websiteUrl} = req.body

        const newBlog = blogsRepository.createBlogs(name,description,websiteUrl)

        res.status(201).send(newBlog)
})

blogsRouter.get('/:id', (req:RequestWithParams<ParamsBlogModel>, res: Response) => {

    let blog = blogsRepository.findBlogById(req.params.id)
    if (!blog) {
        res.sendStatus(404)
        return
    }
    res.status(200).send(blog)
})

blogsRouter.put('/:id', authorizationMiddleware, blogInputValidation, inputValidationMiddleware,

    (req:RequestWithParamsAndBody<ParamsBlogModel, BodyBlogModel>, res: Response) => {

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

blogsRouter.delete('/:id', authorizationMiddleware,

    (req:RequestWithParams<ParamsBlogModel>, res: Response) => {

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
import {Router} from "express";
import express, {Request, Response} from 'express';
import {blogsRouter} from "./blogs-router";
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

export const postsDb: PostType[] = [
    {
        id: "0",
        title: "hello",
        shortDescription: "si",
        content: "back",
        blogId: "1",
        blogName: "dalerback"
    }
]

postsRouter.get('/', (req:Request, res: Response) => {

})

postsRouter.post('/', (req:Request, res: Response) => {

})

postsRouter.get('/:id', (req:Request, res: Response) => {

})

postsRouter.put('/:id', (req:Request, res: Response) => {

})

postsRouter.delete('/:id', (req:Request, res: Response) => {

})
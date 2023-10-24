import {Router} from "express";
import express, {Request, Response} from 'express';
import {blogsDb} from "../repositories/blogs-repository";
import {postsDb} from "../repositories/posts-repository";
export const testingRouter = Router({})

testingRouter.delete('/all-data', (req: Request, res: Response) => {
    blogsDb.length = 0
    postsDb.length = 0
    res.sendStatus(204)
})
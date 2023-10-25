import {Router} from "express";
import express, {Request, Response} from 'express';
import {blogsRepository} from "../repositories/blogs-repository";
import {postsRepository} from "../repositories/posts-repository";
export const testingRouter = Router({})

testingRouter.delete('/all-data', (req: Request, res: Response) => {
    if (blogsRepository.deleteDb(0) && postsRepository.deleteDb(0)) {
        res.sendStatus(204)
    }
    res.sendStatus(404)

})
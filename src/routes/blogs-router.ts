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

export const blogsDb: BlogType[] = [
    {
        id: "1",
        name: "daler",
        description: "string",
        websiteUrl: "https://localhost:4343"
    }
]



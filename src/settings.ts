import express, {Request, Response} from 'express';
import {blogsDb, blogsRouter} from "./routes/blogs-router";
import {postsDb, postsRouter} from "./routes/posts-router";

export const app = express()

app.use(express.json())

app.delete('/testing/all-data', (req: Request, res: Response) => {
    blogsDb.length = 0
    postsDb.length = 0
    res.sendStatus(204)
})

app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
export type BlogType = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string
}
export const blogsDb: BlogType[] = []
export const blogsRepository = {
    findBlogs(searchTerm: string | null) {

    },
    findBlogById(id: string) {
        return blogsDb.find(b => b.id === id)
    },
    createBlogs(name: string, description: string, websiteUrl: string) {
        const newBlog: BlogType = {
            id: (new Date()).toString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl
        }
        blogsDb.push(newBlog)
        return newBlog
    },
    updateBlog(blog: BlogType) {
        let i = blogsDb.indexOf(blog)
        blogsDb[i].name = blog.name
        blogsDb[i].description = blog.description
        blogsDb[i].websiteUrl = blog.websiteUrl
        return true
    },
    deleteBlog(id: string) {
        blogsDb.splice(blogsDb.indexOf(this.findBlogById(id)), 1)
        return true
    }
}
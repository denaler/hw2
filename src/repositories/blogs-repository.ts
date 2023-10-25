type BlogType = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string
}
const blogsDb: BlogType[] = []
export const blogsRepository = {
    blogs(searchTerm: number) {
        return blogsDb
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
    updateBlog(id: string, name: string, description: string, websiteUrl: string) {
        let i = blogsDb.indexOf(<BlogType>blogsDb.find(b => b.id === id))
        blogsDb[i].name = name
        blogsDb[i].description = description
        blogsDb[i].websiteUrl = websiteUrl
        return true
    },
    deleteBlog(id: string) {
        blogsDb.splice(blogsDb.indexOf(<BlogType>this.findBlogById(id)), 1)
        return true
    },
    deleteDb(del: number) {
        blogsDb.length = del
        return true
    }
}
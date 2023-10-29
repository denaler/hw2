type PostType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string | null
}
const postsDb: PostType[] = []
export const postsRepository = {
    posts(searchTerm: number) {
        return postsDb
    },
    findPostById(id: string) {
        return postsDb.find(p => p.id === id)
    },
    createPost(title: string, shortDescription: string, content: string, blogId: string, blogName: string) {
        const newPost: PostType = {
            id: (new Date()).toString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: ""
        }
        postsDb.push(newPost)
        return newPost
    },
    updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string, blogName: string) {
        let i = postsDb.indexOf(<PostType>this.findPostById(id))
        postsDb[i].title = title
        postsDb[i].shortDescription = shortDescription
        postsDb[i].content = content
        postsDb[i].blogId = blogId
        if (blogName) {
            postsDb[i].blogName = blogName
        }
        return true
    },
    deletePost(id: string) {
        postsDb.splice(postsDb.indexOf(<PostType>this.findPostById(id)), 1)
        return true
    },
    deleteDb(del: number) {
        postsDb.length = del
        return true
    }
}
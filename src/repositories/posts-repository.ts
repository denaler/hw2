type PostType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
}
const postsDb: PostType[] = []
export const postsRepository = {
    posts(searchTerm: number) {
        return postsDb
    },
    findPostsById(id: string) {
        return postsDb.find(p => p.id === id)
    },
    createPost(title: string, shortDescription: string, content: string, blogId: string) {
        const newPost: PostType = {
            id: (new Date()).toString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: ''
        }
        postsDb.push(newPost)
        return newPost
    },
    updatePosts(id: string, title: string, shortDescription: string, content: string, blogId: string) {
        let i = postsDb.indexOf(<PostType>this.findPostsById(id))
        postsDb[i].title = title
        postsDb[i].shortDescription = shortDescription
        postsDb[i].content = content
        postsDb[i].blogId = blogId
        return true
    },
    deletePosts(id: string) {
        postsDb.splice(postsDb.indexOf(<PostType>postsDb.find(p => p.id === id)), 1)
        return true
    },
    deleteDb(del: number) {
        postsDb.length = del
        return true
    }
}
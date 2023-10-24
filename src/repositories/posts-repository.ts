export type PostType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
}
export const postsDb: PostType[] = []
export const postsRepository = {
    findPosts(searchTerm: string | null) {

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
    updatePosts(post: PostType) {
        let i = postsDb.indexOf(post)
        postsDb[i].title = post.title
        postsDb[i].shortDescription = post.shortDescription
        postsDb[i].content = post.content
        postsDb[i].blogId = post.blogId
        return true
    },
    deletePosts(id: string) {
        postsDb.splice(postsDb.indexOf(this.findPostsById(id)), 1)
        return true
    }
}
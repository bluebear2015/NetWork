import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PostService {
    async getPosts() {

        const res = await api.get('api/posts')
        logger.log(res.data.posts)
        AppState.posts = res.data.posts.map(posts => new Post(posts))
        logger.log(AppState.posts)
        AppState.previousPageUrl = res.data.older;
        AppState.nextPageUrl = res.data.newer;
    }

    async submitPostForm(formData) {
        const res = await api.post('api/posts/', formData)
        logger.log('[CREATING POST]', res.data)
        AppState.posts.unshift(new Post(res.data))
    }

    async getPostByProfile(id) {
        const res = await api.get('api/posts/',
            {
                params: {
                    creatorId: id
                }

            })
        AppState.posts = res.data.posts.map(p => new Post(p))
    }


    async changePage(url) {
        const res = await api.get(url);
        // logger.log(res.data);
        AppState.posts = res.data.posts;
        AppState.previousPageUrl = res.data.older;
        AppState.nextPageUrl = res.data.newer;
    }



    async likePost(postId) {

        const res = await api.post(`api/posts/${postId}/like`)
        AppState.posts = AppState.posts.filter(p => p.id != postId)
        AppState.posts.likeIds++
        logger.log('[liking post]', res.data.posts)
    }

    async deletePost(postId) {
        const res = await api.delete(`api/posts/${postId}`)
        logger.log('[DELETING post]', res.data)
        AppState.posts = AppState.posts.filter(p => p.id != postId)
    }

    async searchPosts(searchTerm) {

        const res = await api.get('api/posts/', {
            params: {
                query: searchTerm,

            }
        })
        logger.log('[SEARCHING Posts]', res.data)

        AppState.query = searchTerm

        AppState.previousPageUrl = res.data.older;
        AppState.nextPageUrl = res.data.newer;
        AppState.posts = res.data.posts.map(p => new Post(p))


    }

}

export const postService = new PostService()


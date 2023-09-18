<template >
    <div class="d-flex flex-row justify-content-evenly">

        <div class="text-center text-dark fw-bold">
            <h1>{{ postProp?.title }}</h1>
        </div>
        <div class="">
            <div class="p-3">
                <img class="img-fluid border border-3 border-warning elevation-5 rounded" :src="postProp?.imgUrl" alt="">
                <h5
                    class="flex-inline elevation-5 my-3 border border-3 border-warning rounded text-center d-flex text-dark fw-bold bg-light">
                    <span class="text-danger"> Likes: </span> {{
                        postProp?.likeIds.length }}
                </h5>
                <span v-if="user.isAuthenticated" @mouseover="showLikesTooltip = true"
                    @mouseleave="showLikesTooltip = false"> <button
                        class="btn btn-warning border border-primary border-3 elevation-5" @click="likePost(postProp?.id)">
                        👍🏾👍🏾👍🏾 </button>
                </span>

                <div v-if="showLikesTooltip" class="likes-tooltip">
                    <div class="likes-tooltip-content">
                        <div v-for="userId in postProp?.likeIds" :key="userId">{{ getUserById(userId).name }}</div>
                    </div>
                </div>

            </div>
            <div class=" border border-3 border-warning rounded bg-newPink elevation-5 m-2">
                <div class=" d-flex flex-column text-center text-dark fw-bold">
                    <p> <span class="text-warning"> Title: </span> {{ postProp?.body }}</p>

                </div>
                <router-link v-if="user.isAuthenticated" :to="{ name: 'Profile', params: { id: postProp?.creatorId } }">
                    <div class="text-center text-dark fw-bold">
                        <p> <span class="text-warning"> Creator: </span> {{ postProp?.creator.name }}</p>
                        <p> <span class="text-warning"> Posted: </span> {{ postProp?.createdAt }}</p>
                    </div>
                    <img class="creator-picture border border-3 border-primary rounded-circle offset-4 elevation-5"
                        :src="postProp?.creator.picture">
                </router-link>
            </div>
            <div @click="deletePost(postProp?.id)" v-if="postProp?.creator.id == account?.id"
                class="border border-3 border-primary elevation-5 btn btn-danger m-1">𝗫
            </div>
        </div>

    </div>
</template>

<script>
import { ref } from 'vue';
import { computed, onMounted } from 'vue'
import { Post } from '../models/Post.js'
import { AppState } from '../AppState.js'
import { postService } from '../services/PostService.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'


export default {
    props: {
        postProp: { type: Post, required: true }
    }, setup() {
        const editable = ref({})

        return {
            showLikesTooltip: false,

            getUserById(userId) {
                return this.users.find(user => user.id === userId) || {};
            },


            async likePost(postId) {
                try {
                    await postService.likePost(postId)


                } catch (error) {
                    logger.error(error)
                    Pop.toast(error.message, 'error')
                }
            },
            async deletePost(postId) {
                try {
                    await postService.deletePost(postId)
                } catch (error) {
                    logger.error(error);
                    Pop.error(error)
                }
            },


            posts: computed(() => AppState.posts),

            account: computed(() => AppState.account),

            user: computed(() => AppState.user)







        }
    }
}
</script>

<style>
.creator-picture {
    height: 60px;
    width: 60px;
    object-fit: cover
}

.pCard {
    background-color: #f36f9dd2;
    font-family: 'Courier New', Courier, monospace;
}

.pFont {
    font-family: 'Courier New', Courier, monospace;
}

.bg-newPink {
    background: #45a2ffb1 !important;
}

.likes-tooltip {
    position: absolute;
    top: 30px;
    /* Adjust as needed */
    left: 0;
    display: none;
    background-color: #ffffff;
    border: 1px solid #ccc;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

.likes-tooltip-content {
    padding: 10px;
}

/* Show the tooltip on hover */
span:hover+.likes-tooltip {
    display: block;
}
</style>
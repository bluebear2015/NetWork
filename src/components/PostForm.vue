<template>
    <div class="posting text-dark fw-bold">
        <form action="" @submit="submitPostForm()">
            <div>
                <label for="title">Title:</label>
                <input required name="title" placeholder="Title" class="form-control" type="text" v-model="editable.title">
            </div>
            <div>
                <label for="body">Post Body:</label>
                <input type="text" name="body" v-model="editable.body" required class="form-control"
                    placeholder="Type blog here...">
            </div>
            <div>
                <label for="imgUrl">Img Url:</label>
                <input type="text" name="imgUrl" v-model="editable.imgUrl" required class="form-control"
                    placeholder="img url">
            </div>
            <button class="btn btn-light Fs-3 text-dark fw-bold m-2" type="submit">POST-IT</button>
        </form>
    </div>
</template>
    
<script>
import { ref } from 'vue';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { postService } from '../services/PostService.js';
import { Account } from '../models/Account.js';
import { Profile } from '../models/Profile.js';

export default {
    props: {
        // profile: { type: Object, required: true }
        profile: { type: [Profile, Account], required: true }
    },
    setup(props) {
        const editable = ref({})

        return {
            editable,
            async submitPostForm() {
                try {
                    logger.log('submitting the Post form')

                    const formData = editable.value
                    window.event.preventDefault()
                    await postService.submitPostForm(formData)
                    editable.value = { ...AppState.account }

                } catch (error) {
                    Pop.error(error.message, ['Log in to post!!'])
                    logger.log(['you must be logged in to post'])
                }
            }
        }
    }
}
</script>
    
    
<style lang="scss" scoped>
.posting {
    border: 2px solid rgba(37, 154, 227, 0.768);
    border-radius: 5px;
    background-color: #f36f9ddb;
    color: rgb(139, 144, 98);
    font-family: 'Courier New', Courier, monospace;
    font-size: 1.5em;
    text-align: center;
    width: 100%;
    font-weight: 100px;


}
</style>
<template>
  <div class="profilePage hero-img">
    <div class="container">
      <div class="p-4 justify-content-between d-flex ">
        <button :disabled="!previousUrl" @click="changePage(previousUrl)" class="pFont btn fs-4 m-2 btn-secondary">Older
          Posts</button>
        <button :disabled="!nextUrl" @click="changePage(nextUrl)" class="pFont btn fs-4 m-2 btn-secondary">New
          Posts</button>

      </div>

      <div class="row border border-warning border-3 elevation-5 bg-dark rounded">
        <div class="  justify-content-center  fb-bold" v-if="profile">
          <div class="border border-warning elevation-5 rounded border-3 m-2">
            <ProfileCard :profile="profile" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="border border-3 border-warning rounded elevation-5 pCard col-8 m-2" v-for=" p in posts" :key="p.id">
          <PostCard :postProp="p" />

        </div>
      </div>
    </div>




  </div>
</template>
  
  
<script lang="ts">
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { profileService } from '../services/ProfileService.js';
import { onMounted, popScopeId } from 'vue';
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { postService } from '../services/PostService.js';
import { Account } from '../models/Account.js';


export default {
  setup() {
    const route = useRoute()
    async function getProfileById() {
      try {
        await profileService.getProfileById(route.params.id)
      } catch (error) {
        Pop.error({ error })
      }

    }

    async function getPostByProfile() {
      try {
        await postService.getPostByProfile(route.params.id)

      } catch (error) {
        Pop.error
      }
    }

    onMounted(() => {
      getProfileById()
      getPostByProfile()
    })

    return {
      async changePage(url) {
        try {
          await postService.changePage(url)
        } catch (error) {
          Pop.error(error)
        }

      },


      profile: computed(() => AppState.activeProfile),
      posts: computed(() => AppState.posts),
      previousUrl: computed(() => AppState.previousPageUrl),
      nextUrl: computed(() => AppState.nextPageUrl),




    }
  }
}
</script>
  
  
<style >
.mainStyle {
  background-color: #1c292bc4;
}

.hero-img {

  background-image: url('https://images.unsplash.com/photo-1548031061-76f86064a5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80');

  background-repeat: none;
  object-fit: cover;

}
</style>
<template>
  <div class="hero-img">
    <div class="d-flex justify-content-between" v-if="user.isAuthenticated">
      <button type="button" class="btn btn-warning border border-3 border-dark m-2 fw-bold" data-bs-toggle="modal"
        data-bs-target="#exampleModal">
        Create Post 🔥
      </button>

      <form @submit.prevent="searchPosts()">

        <div class="d-flex m-2">

          <input class="w-100 text-danger fw-bold elevation-5 fs-4" type="text" v-model="search"
            placeholder="Search Posts             🔍" />


        </div>
      </form>

      <router-link :to="{ name: 'Account' }">

        <button class="btn btn-warning border border-3 border-dark m-2 fw-bold text-end offset-1">edit
          account 👤</button>

      </router-link>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content bg-primary">

          <button type="button" class="btn-close bg-danger m-1" data-bs-dismiss="modal" aria-label="Close"></button>
          <div class="modal-body bg-New">


            <PostForm />


          </div>

        </div>
      </div>
    </div>

    <div class="p-4 justify-content-between d-flex ">
      <button :disabled="!nextUrl" @click="changePage(nextUrl)"
        class="pFont btn fw-bold fs-4 m-2 btn-warning border border-3 border-dark">New Posts
        ➕</button>


      <button :disabled="!previousUrl" @click="changePage(previousUrl)"
        class="pFont fw-bold btn fs-4 m-2 btn-warning border border-3 border-dark">Old
        Posts ➖</button>
    </div>
    <section class="row d-flex justify-content-center p-3">
      <div class="col-8 border border-3 border-warning elevation-5 rounded pCard m-3" v-for="p in posts" :key="p.id">
        <PostCard :postProp="p" />

      </div>


    </section>
  </div>
</template>

<script>
import { ref } from 'vue';
import Pop from '../utils/Pop.js'
import { postService } from '../services/PostService.js'
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState.js'
import PostCard from '../components/PostCard.vue'
import { Account } from '../models/Account.js'
import { logger } from '../utils/Logger.js'
logger


export default {
  components: { PostCard },
  setup() {
    const search = ref('')
    onMounted(() => {

      getPosts();
    });
    async function getPosts() {
      try {
        await postService.getPosts()
      } catch (error) {
        Pop.error
      }

    }



    return {
      search,
      async changePage(url) {
        try {
          await postService.changePage(url)
        } catch (error) {
          Pop.error(error)
        }

      },

      async searchPosts() {
        try {
          const searchTerm = search.value
          logger.log('searching Posts', searchTerm)
          await postService.searchPosts(searchTerm)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },

      account: computed(() => AppState.account),
      posts: computed(() => AppState.posts),
      previousUrl: computed(() => AppState.previousPageUrl),
      nextUrl: computed(() => AppState.nextPageUrl),
      user: computed(() => AppState.user)
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;


}

.hero-img {

  background-image: url('https://images.unsplash.com/photo-1548031061-76f86064a5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80');

  background-repeat: repeat;
  object-fit: cover;

}

.bg-New {
  background-color: #6ff3cbdb;
}

.bgPink {
  background-color: #f803d3;
}

.imgPic {

  height: 50vh;
  width: 50vh;

  object-fit: cover;
  object-position: center;


}
</style>

<template>
  <div class="card bg-newPink ">
    <div class="card-body">
      <div class="profile-card mb-2 text-center">
        <p class="text-center mb-0">
          <img :src="profile.picture" alt="profile.name"
            class=" border border-3 border-warning rounded-circle profile-picture img-fluid">
          <img :src="profile.coverImg" alt="profile.name"
            class="border border-3 border-warning cImage img-fluid rounded-circle">
        </p>
      </div>
      <h1 class="border border-bottom border-warning bg-dark text-warning fw-bold border-3 rounded-pill">{{ profile.name
      }}</h1>
      <p class="border border-bottom border-warning bg-dark text-light border-3 rounded">
        <span class="fs-5 text-bold text-danger ">Bio:</span>
      <h4> {{ profile.bio }} </h4>
      </p>
      <p class="border border-bottom border-warning bg-dark text-light border-3 rounded">
        <span class="fs-5 text-bold text-danger">Linkedin:</span> <u> {{ profile.linkedin }}</u>
      </p>
      <p class="border border-bottom border-warning bg-dark text-light border-3 rounded">
        <span class="fs-5 text-bold text-danger">Email:</span> <u> {{ profile.email }}</u>
      </p>
      <p class="border border-bottom border-warning bg-dark text-light border-3 rounded">
        <span class="fs-5 text-bold text-danger">Class:</span> <u> {{ profile.class }}</u>
      </p>
      <p class="border border-bottom border-warning bg-dark text-light border-3 rounded">
        <span class="fs-5 text-bold text-danger">Graduated:</span> <u> {{ profile.graduated }}</u>
      </p>
      <!-- <li>
       
    <span class="fs-5 text-bold">Alumni:</span>    <u>  {{ profile.alumni }} </u>
       </li> -->
    </div>
  </div>
</template>
  
  
<script lang="ts">
import { AppState } from '../AppState.js';
import { Account } from '../models/Account.js';
import { Profile } from '../models/Profile.js';
import { computed, onMounted } from 'vue'
export default {

  props: {
    profile: { type: [Profile, Account], required: true }
  },


  setup() {

    return {
      profiles: computed(() => AppState.Profile),
      Account: computed(() => AppState.account)
    }
  }
}
</script>
  
  
<style lang="scss" scoped>
.creator-picture {
  height: 100px;
  width: 100px;
  object-fit: cover
}

.cImage {
  height: 50px;
  width: 50px;
  object-fit: cover
}

.bg-newPink {
  background-color: pink;
}
</style>
<template>
  <div class="about text-center account-page hero-img">
    <div class="container-fluid my-2">
      <div class="row">
        <div class="col-md-3">

          <ProfileCard :profile="account" />

        </div>
        <div class="col-md-6 m-auto">

          <AccountForm />


        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped lang="scss">
.hero-img {

  background-image: url('https://images.unsplash.com/photo-1548031061-76f86064a5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80');

  background-repeat: none;
  object-fit: cover;

}
</style>
<template>
  <header>
    <Navbar />
  </header>
  <main>


    <Ads :ads="ads" />



    <router-view />


  </main>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from './AppState';
import Navbar from './components/Navbar.vue';
import { adService } from './services/AdService.js';
import Pop from './utils/Pop.js';
import Ads from './components/Ads.vue';

export default {
  setup() {
    onMounted(() => {
      getAds();
    });
    async function getAds() {
      try {
        await adService.getAds();
      } catch (error) {
        Pop.error(error);
      }
    }

    return {
      ads: computed(() => AppState.ads),
      appState: computed(() => AppState)
    };
  },
  components: { Navbar, Ads } // Register the Ads component
};
</script>

<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}

// imgAds {
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// }




footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>

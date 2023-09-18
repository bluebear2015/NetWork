<template>
  <div class="d-flex ">
    <div class="adCol col-6 border border-dark border-2 " v-for="ad in ads" :key="ad.title">
      <a :href="ad.linkURL">
        <img class="adImage img-fluid elevation-5 border border-dark border-5" v-if="ad.banner" :src="ad.banner"
          alt="Banner Ad" />

      </a>
    </div>
  </div>
</template>
  
<script>
export default {
  props: {
    ads: Array
  }
};
</script>
  
<style scoped>
.adCol {
  height: 30%;

}

.adImage {
  width: 100%;
  height: 30%;



  background-size: cover;


}

.bgPink {
  background-color: #f803d3;
}
</style>
  
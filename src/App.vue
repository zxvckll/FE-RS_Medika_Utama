<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import NavBarVue from "./components/NavBar.vue";
import Hero from "./components/Hero.vue";
export default {
  components: {
    NavBarVue,
    Hero,
  },
  data() {
    return {
      
    };
  },
  methods: {

  },

};
</script>

<template>
  <div class="app w-full mx-auto ">
    <NavBarVue  />
    <router-view class="view two"></router-view>
  </div>

  <div
    class="hero1 w-full mx-auto min-h-screen"
    v-if="this.$route.fullPath == '/'"
  >
    <hero></hero>
  </div>
</template>

<style scoped>
.app {
  background-image: url("https://img.freepik.com/premium-photo/long-hospital-corridor-with-empty-seats_117023-1679.jpg?w=2000");
}
.hero1 {
  background-image: url("https://img.freepik.com/premium-photo/long-hospital-corridor-with-empty-seats_117023-1679.jpg?w=2000");
}
</style>

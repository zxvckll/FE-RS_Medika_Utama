<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import CardProfileDokter from "@/components/CardProfileDokter.vue";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  props: [],
  components: {
    CardProfileDokter,
  },
  computed: {
    ...mapGetters("auth", {
      getUserRole: "getUserRole",
      getAccessToken: "getAccessToken",
    }),
  },
  methods: {
    async getListDoctorByClinic() {
      var url = `${this.$url}/doctor/clinic/${this.$route.params.id}`;
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };
      try {
        const response = await axios.get(url, config);
        this.doctorByClinic = await response.data;
        console.log(this.doctorByClinic);
      } catch (error) {
        console.error(error);
      }
    },
  },






  created(){
    this.getListDoctorByClinic()
    this.$watch(
      () => this.$route.params.id,
      (toParams, previousParams) => {
        // react to route changes...
        this.getListDoctorByClinic()
      }
    )
  },
  data() {
    return {
      doctorByClinic : null,
      schedule : null,
   
      
    };
  },
};
</script>

<template>
  <div class="w-full mx-auto min-h-screen background">
    <CardProfileDokter
    v-for="(data, index) in this.doctorByClinic"
    :userRole="getUserRole"
    :data="data"
    v-bind:key="index"
  ></CardProfileDokter>
  </div>

</template>

<style >
.background {
  background-image: url("https://img.freepik.com/premium-photo/long-hospital-corridor-with-empty-seats_117023-1679.jpg?w=2000");
}
</style>

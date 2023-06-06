<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import DataAntrianPasien from "@/components/Appointm/DataAntrianPasien.vue";
import DataAntrianDokter from "@/components/Appointm/DataAntrianDokter.vue";
import DataAntrianAdmin from "@/components/Appointm/DataAntrianAdmin.vue";


import { mapGetters } from "vuex";
export default {
  components: {
    DataAntrianPasien,
    DataAntrianDokter,
    DataAntrianAdmin,
  },
  computed: {
    ...mapGetters("auth", {
      getUserRole: "getUserRole",
      getUserId: "getUserId",
    }),
  },
  data() {
    return {
      isUser: "Dokter",
      appointment :'',
    };
  },
  methods : {
    async getListAppointment() {
      var url = `${this.$url}/appointment/`
      try {
        const response = await axios.get(url);
        const data = await response;
        this.appointment = await data.data;
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
  }
};
</script>

<template>
  <div v-if="getUserRole == 'Patient'">
    <DataAntrianPasien></DataAntrianPasien>
  </div>
  <div v-else-if="getUserRole == 'Doctor'">
    <DataAntrianDokter></DataAntrianDokter>
  </div>
  <div v-else-if="getUserRole == 'Admin'">
    <DataAntrianAdmin></DataAntrianAdmin>
  </div>
</template>

<style scoped></style>

<script>
// This starter template is using VgetUserRoleDue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import TableClinic from "@/components/Clinic/Table.vue";
import axios from "axios";
import { mapGetters} from "vuex";

export default {
  props: [],
  components: {  TableClinic },
  data() {
    return {
      clinic: null,
    };
  },
  computed: {
    ...mapGetters("auth", {
      getAccessToken: "getAccessToken",
    }),
  },
  methods: {
    async getListClinic() {
      var url = `${this.$url}/clinic/`
      var config = {
        headers: {
          'Authorization' : `Bearer ${this.getAccessToken}`
        }
      }
      try {
        const response = await axios.get(url,config);
        const data =  response;
        this.clinic =  data.data;
        console.log(this.clinic);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteClinicByID(id) {
      var url = `${this.$url}/clinic/${id}`
      var config = {
        headers: {
          'Authorization' : `Bearer ${this.getAccessToken}`
        }
      }
      try {
        const response = await axios.delete(url,config);
        const data =  response;
        console.log(data);
        this.getListClinic();
      } catch (error) {
        console.error(error);
      }
    },
    async addClinic(newData) {
      delete newData.id
      var url = `${this.$url}/clinic`
      var data = {
        name: newData.name,
        PolyclinicId: newData.PolyclinicId.id,
      }
      var config = {
        headers: {
          'Authorization' : `Bearer ${this.getAccessToken}`
        }
      }
      try {
        console.log(newData);
   
        const response = await axios.post(url,data,config);
        console.log(response);
        this.getListClinic();
        
      } catch (error) {
        console.error(error);
      }
    },
    async editClinic(newData) {
      var url = `${this.$url}/clinic/${newData.id}`
      delete newData.id
      var data = { 
        name: newData.name,
        PolyclinicId: newData.PolyclinicId.id,
      }
      var config = {
        headers: {
          'Authorization' : `Bearer ${this.getAccessToken}`
        }
      }
      try {
        const response = await axios.put(url,data,config);
        console.log(newData);
        console.log(response);
        this.getListClinic();
        
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.getListClinic();
  },
};
</script>

<template>
  <div class="bg-white mx-auto mt-10 w-max h-max text-gray-700 min-h-screen bg-transparent">
    <h2 class="text-5xl text-center text-bold my-3">
      Data Table Clinic
    </h2>
    <div v-show="this.clinic != null">
      <TableClinic
        :data="this.clinic"
        @editclinic="editClinic"
        @addclinic="addClinic"
        @deleteclinic="deleteClinicByID"
      ></TableClinic>
    </div>
  </div>
</template>

<style scoped></style>

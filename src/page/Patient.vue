<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import TablePatient from "@/components/Patient/Table.vue";
import axios from "axios";
import { mapGetters} from "vuex";

export default {
  props: [],
  components: {  TablePatient },
  data() {
    return {
      patient: null,
    };
  },
  computed: {
    ...mapGetters("auth", {
      getAccessToken: "getAccessToken",
    }),
  },
  methods: {
    async getListPatient() {
      var url = `http://localhost:5000/patient/`
      var config = {
        headers: {
          'Authorization' : `Bearer ${this.getAccessToken}`
        }
      }
      try {
        const response = await axios.get(url,config);
        const data =  response;
        this.patient =  data.data;
        console.log(this.patient);
      } catch (error) {
        console.error(error);
      }
    },
    async deletePatientByID(id) {
      var url = `http://localhost:5000/patient/${id}`
      var config = {
        headers: {
          'Authorization' : `Bearer ${this.getAccessToken}`
        }
      }
      try {
        const response = await axios.delete(url,config);
        const data =  response;
        console.log(data);
        this.getListPatient();
      } catch (error) {
        console.error(error);
      }
    },
    async addPatient(newData) {
      delete newData.id
      var url = "http://localhost:5000/patient"
      var data = {
        name: newData.name,
        noRM: newData.noRM,
        imageUrl: newData.imageUrl,
        address: newData.address,
        dateOfBirth: newData.dateOfBirth,
        citizenship: newData.citizenship,
        UserId: newData.UserId.id,
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
        this.getListPatient();
        
      } catch (error) {
        console.error(error);
      }
    },
    async editPatient(newData) {
      var url = `http://localhost:5000/patient/${newData.id}`
      delete newData.id
      var data = {
        
        name: newData.name,
        noRM: newData.noRM,
        imageUrl: newData.imageUrl,
        address: newData.address,
        dateOfBirth: newData.dateOfBirth,
        citizenship: newData.citizenship,
        UserId: newData.UserId.id,
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
        this.getListPatient();
        
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.getListPatient();
  },
};
</script>

<template>
  <div class="bg-white mx-auto mt-10 w-max h-max text-gray-700 min-h-screen bg-transparent">
    <h2 class="text-5xl text-center text-bold my-3">
      Data Table Patient
    </h2>
    <div v-show="this.patient != null">
      <TablePatient
        :data="this.patient"
        @editpatient="editPatient"
        @addpatient="addPatient"
        @deletepatient="deletePatientByID"
      ></TablePatient>
    </div>
  </div>
</template>

<style scoped></style>

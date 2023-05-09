<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import TableDoctor from "@/components/Doctor/Table.vue";
import axios from "axios";
import { mapGetters} from "vuex";

export default {
  props: [],
  components: {  TableDoctor },
  data() {
    return {
      doctor: null,
    };
  },
  computed: {
    ...mapGetters("auth", {
      getAccessToken: "getAccessToken",
    }),
  },
  methods: {
    async getListDoctor() {
      var url = `http://localhost:5000/doctor/`
      var config = {
        headers: {
          'Authorization' : `Bearer ${this.getAccessToken}`
        }
      }
      try {
        const response = await axios.get(url,config);
        const data =  response;
        this.doctor =  data.data;
        console.log(this.doctor);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteDoctorByID(id) {
      var url = `http://localhost:5000/doctor/${id}`
      var config = {
        headers: {
          'Authorization' : `Bearer ${this.getAccessToken}`
        }
      }
      try {
        const response = await axios.delete(url,config);
        const data =  response;
        console.log(data);
        this.getListDoctor();
      } catch (error) {
        console.error(error);
      }
    },
    async addDoctor(newData) {
      delete newData.id
      var url = "http://localhost:5000/doctor"
      var data = {
        name: newData.name,
        imageUrl: newData.imageUrl,
        education: newData.education,
        course: newData.course,
        experience: newData.experience,
        organization: newData.organization,
        ClinicId: newData.ClinicId.id,
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
        this.getListDoctor();
        
      } catch (error) {
        console.error(error);
      }
    },
    async editDoctor(newData) {
      var url = `http://localhost:5000/doctor/${newData.id}`
      delete newData.id
      var data = {
        
        name: newData.name,
        imageUrl: newData.imageUrl,
        education: newData.education,
        course: newData.course,
        experience: newData.experience,
        organization: newData.organization,
        ClinicId: newData.ClinicId.id,
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
        this.getListDoctor();
        
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.getListDoctor();
  },
};
</script>

<template>
  <div class="bg-white mx-auto mt-10 w-max h-max text-gray-700 min-h-screen bg-transparent">
    <h2 class="text-5xl text-center text-bold my-3">
      Data Table Doctor
    </h2>
    <div v-show="this.doctor != null">
      <TableDoctor
        :data="this.doctor"
        @editdoctor="editDoctor"
        @adddoctor="addDoctor"
        @deletedoctor="deleteDoctorByID"
      ></TableDoctor>
    </div>
  </div>
</template>

<style scoped></style>

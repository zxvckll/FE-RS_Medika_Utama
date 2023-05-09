<script>
// This starter template is using VgetUserRoleDue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import TableStatus from "@/components/Status/Table.vue";
import axios from "axios";
import { mapGetters} from "vuex";

export default {
  props: [],
  components: {  TableStatus },
  data() {
    return {
      status: null,
    };
  },
  computed: {
    ...mapGetters("auth", {
      getAccessToken: "getAccessToken",
    }),
  },
  methods: {
    async getListStatus() {
      var url = `http://localhost:5000/status/`
      var config = {
        headers: {
          'Authorization' : `Bearer ${this.getAccessToken}`
        }
      }
      try {
        const response = await axios.get(url,config);
        const data =  response;
        this.status =  data.data;
        console.log(this.status);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteStatusByID(id) {
      var url = `http://localhost:5000/status/${id}`
      var config = {
        headers: {
          'Authorization' : `Bearer ${this.getAccessToken}`
        }
      }
      try {
        const response = await axios.delete(url,config);
        const data =  response;
        console.log(data);
        this.getListStatus();
      } catch (error) {
        console.error(error);
      }
    },
    async addStatus(newData) {
      delete newData.id
      var url = "http://localhost:5000/status"
      var data = {
        name: newData.name,
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
        this.getListStatus();
        
      } catch (error) {
        console.error(error);
      }
    },
    async editStatus(newData) {
      var url = `http://localhost:5000/status/${newData.id}`
      delete newData.id
      var data = { 
        name: newData.name,
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
        this.getListStatus();
        
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.getListStatus();
  },
};
</script>

<template>
  <div class="bg-white mx-auto mt-10 w-max h-max text-gray-700 min-h-screen bg-transparent">
    <h2 class="text-5xl text-center text-bold my-3">
      Data Table Status
    </h2>
    <div v-show="this.status != null">
      <TableStatus
        :data="this.status"
        @editstatus="editStatus"
        @addstatus="addStatus"
        @deletestatus="deleteStatusByID"
      ></TableStatus>
    </div>
  </div>
</template>

<style scoped></style>

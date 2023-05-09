<script>
// This starter template is using VgetUserRoleDue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import TableUser from "@/components/User/Table.vue";
import axios from "axios";
import { mapGetters} from "vuex";

export default {
  props: [],
  components: {  TableUser },
  data() {
    return {
      user: null,
    };
  },
  computed: {
    ...mapGetters("auth", {
      getAccessToken: "getAccessToken",
    }),
  },
  methods: {
    async getListUser() {
      var url = `http://localhost:5000/user/`
      var config = {
        headers: {
          'Authorization' : `Bearer ${this.getAccessToken}`
        }
      }
      try {
        const response = await axios.get(url,config);
        const data =  response;
        this.user =  data.data;
        console.log(this.user);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteUserByID(id) {
      var url = `http://localhost:5000/user/${id}`
      var config = {
        headers: {
          'Authorization' : `Bearer ${this.getAccessToken}`
        }
      }
      try {
        const response = await axios.delete(url,config);
        const data =  response;
        console.log(data);
        this.getListUser();
      } catch (error) {
        console.error(error);
      }
    },
    async addUser(newData) {
      delete newData.id
      var url = "http://localhost:5000/user"
      var data = {
        email: newData.email,
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
        this.getListUser();
        
      } catch (error) {
        console.error(error);
      }
    },
    async editUser(newData) {
      var url = `http://localhost:5000/user/${newData.id}`
      delete newData.id
      var data = { 
        email: newData.email,
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
        this.getListUser();
        
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.getListUser();
  },
};
</script>

<template>
  <div class="bg-white mx-auto mt-10 w-max h-max text-gray-700 min-h-screen bg-transparent">
    <h2 class="text-5xl text-center text-bold my-3">
      Data Table User
    </h2>
    <div v-show="this.user != null">
      <TableUser
        :data="this.user"
        @edituser="editUser"
        @adduser="addUser"
        @deleteuser="deleteUserByID"
      ></TableUser>
    </div>
  </div>
</template>

<style scoped></style>

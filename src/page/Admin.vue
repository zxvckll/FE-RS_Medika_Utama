<script>
// This starter template is using VgetUserRoleDue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import TableAdmin from "@/components/Admin/Table.vue";
import axios from "axios";
import { mapGetters} from "vuex";

export default {
  props: [],
  components: {  TableAdmin },
  data() {
    return {
      admin: null,
    };
  },
  computed: {
    ...mapGetters("auth", {
      getAccessToken: "getAccessToken",
    }),
  },
  methods: {
    async getListAdmin() {
      var url = `http://localhost:5000/admin/`
      var config = {
        headers: {
          'Authorization' : `Bearer ${this.getAccessToken}`
        }
      }
      try {
        const response = await axios.get(url,config);
        const data =  response;
        this.admin =  data.data;
        console.log(this.admin);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteAdminByID(id) {
      var url = `http://localhost:5000/admin/${id}`
      var config = {
        headers: {
          'Authorization' : `Bearer ${this.getAccessToken}`
        }
      }
      try {
        const response = await axios.delete(url,config);
        const data =  response;
        console.log(data);
        this.getListAdmin();
      } catch (error) {
        console.error(error);
      }
    },
    async addAdmin(newData) {
      delete newData.id
      var url = "http://localhost:5000/admin"
      var data = {
        name: newData.name,
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
        this.getListAdmin();
        
      } catch (error) {
        console.error(error);
      }
    },
    async editAdmin(newData) {
      var url = `http://localhost:5000/admin/${newData.id}`
      delete newData.id
      var data = {
        
        name: newData.name,
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
        this.getListAdmin();
        
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.getListAdmin();
  },
};
</script>

<template>
  <div class="bg-white mx-auto mt-10 w-max h-max text-gray-700 min-h-screen bg-transparent">
    <h2 class="text-5xl text-center text-bold my-3">
      Data Table Admin
    </h2>
    <div v-show="this.admin != null">
      <TableAdmin
        :data="this.admin"
        @editadmin="editAdmin"
        @addadmin="addAdmin"
        @deleteadmin="deleteAdminByID"
      ></TableAdmin>
    </div>
  </div>
</template>

<style scoped></style>

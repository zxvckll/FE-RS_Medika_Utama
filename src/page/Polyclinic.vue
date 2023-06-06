<script>
// This starter template is using VgetUserRoleDue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import TablePolyclinic from "@/components/Polyclinic/Table.vue";
import axios from "axios";
import { mapGetters} from "vuex";

export default {
  props: [],
  components: {  TablePolyclinic },
  data() {
    return {
      polyclinic: null,
    };
  },
  computed: {
    ...mapGetters("auth", {
      getAccessToken: "getAccessToken",
    }),
  },
  methods: {
    async getListPolyclinic() {
      var url = `${this.$url}/polyclinic/`
      var config = {
        headers: {
          'Authorization' : `Bearer ${this.getAccessToken}`
        }
      }
      try {
        const response = await axios.get(url,config);
        const data =  response;
        this.polyclinic =  data.data;
        console.log(this.polyclinic);
      } catch (error) {
        console.error(error);
      }
    },
    async deletePolyclinicByID(id) {
      var url = `${this.$url}/polyclinic/${id}`
      var config = {
        headers: {
          'Authorization' : `Bearer ${this.getAccessToken}`
        }
      }
      try {
        const response = await axios.delete(url,config);
        const data =  response;
        console.log(data);
        this.getListPolyclinic();
      } catch (error) {
        console.error(error);
      }
    },
    async addPolyclinic(newData) {
      delete newData.id
      var url = `${this.$url}/polyclinic`
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
        this.getListPolyclinic();
        
      } catch (error) {
        console.error(error);
      }
    },
    async editPolyclinic(newData) {
      var url = `${this.$url}/polyclinic/${newData.id}`
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
        this.getListPolyclinic();
        
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.getListPolyclinic();
  },
};
</script>

<template>
  <div class="bg-white mx-auto mt-10 w-max h-max text-gray-700 min-h-screen bg-transparent">
    <h2 class="text-5xl text-center text-bold my-3">
      Data Table Polyclinic
    </h2>
    <div v-show="this.polyclinic != null">
      <TablePolyclinic
        :data="this.polyclinic"
        @editpolyclinic="editPolyclinic"
        @addpolyclinic="addPolyclinic"
        @deletepolyclinic="deletePolyclinicByID"
      ></TablePolyclinic>
    </div>
  </div>
</template>

<style scoped></style>

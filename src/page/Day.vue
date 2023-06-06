<script>
// This starter template is using VgetUserRoleDue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import TableDay from "@/components/Day/Table.vue";
import axios from "axios";
import { mapGetters} from "vuex";

export default {
  props: [],
  components: {  TableDay },
  data() {
    return {
      day: null,
    };
  },
  computed: {
    ...mapGetters("auth", {
      getAccessToken: "getAccessToken",
    }),
  },
  methods: {
    async getListDay() {
      var url = `${this.$url}/day/`
      var config = {
        headers: {
          'Authorization' : `Bearer ${this.getAccessToken}`
        }
      }
      try {
        const response = await axios.get(url,config);
        const data =  response;
        this.day =  data.data;
        console.log(this.day);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteDayByID(id) {
      var url = `${this.$url}/day/${id}`
      var config = {
        headers: {
          'Authorization' : `Bearer ${this.getAccessToken}`
        }
      }
      try {
        const response = await axios.delete(url,config);
        const data =  response;
        console.log(data);
        this.getListDay();
      } catch (error) {
        console.error(error);
      }
    },
    async addDay(newData) {
      delete newData.id
      var url = `${this.$url}/day`
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
        this.getListDay();
        
      } catch (error) {
        console.error(error);
      }
    },
    async editDay(newData) {
      var url = `${this.$url}/day/${newData.id}`
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
        this.getListDay();
        
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.getListDay();
  },
};
</script>

<template>
  <div class="bg-white mx-auto mt-10 w-max h-max text-gray-700 min-h-screen bg-transparent">
    <h2 class="text-5xl text-center text-bold my-3">
      Data Table Day
    </h2>
    <div v-show="this.day != null">
      <TableDay
        :data="this.day"
        @editday="editDay"
        @addday="addDay"
        @deleteday="deleteDayByID"
      ></TableDay>
    </div>
  </div>
</template>

<style scoped></style>

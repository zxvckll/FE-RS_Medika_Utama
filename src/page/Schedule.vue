<script>
// This starter template is using VgetUserRoleDue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import TableSchedule from "@/components/Schedule/Table.vue";
import axios from "axios";
import { mapGetters} from "vuex";

export default {
  props: [],
  components: {  TableSchedule },
  data() {
    return {
      schedule: null,
    };
  },
  computed: {
    ...mapGetters("auth", {
      getAccessToken: "getAccessToken",
    }),
  },
  methods: {
    async getListSchedule() {
      var url = `${this.$url}/schedule/`
      var config = {
        headers: {
          'Authorization' : `Bearer ${this.getAccessToken}`
        }
      }
      try {
        const response = await axios.get(url,config);
        const data =  response;
        this.schedule =  data.data;
        console.log(this.schedule);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteScheduleByID(id) {
      var url = `${this.$url}/schedule/${id}`
      var config = {
        headers: {
          'Authorization' : `Bearer ${this.getAccessToken}`
        }
      }
      try {
        const response = await axios.delete(url,config);
        const data =  response;
        console.log(data);
        this.getListSchedule();
      } catch (error) {
        console.error(error);
      }
    },
    async addSchedule(newData) {
      delete newData.id
      var url = `${this.$url}/schedule`
      var data = {
        time: newData.time,
        DoctorId: newData.DoctorId.id,
        DayId: newData.DayId.id,

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
        this.getListSchedule();
        
      } catch (error) {
        console.error(error);
      }
    },
    async editSchedule(newData) {
      var url = `${this.$url}/schedule/${newData.id}`
      delete newData.id
      var data = { 
        time: newData.time,
        DoctorId: newData.DoctorId.id,
        DayId: newData.DayId.id,
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
        this.getListSchedule();
        
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.getListSchedule();
  },
};
</script>

<template>
  <div class="bg-white mx-auto mt-10 w-max h-max text-gray-700 min-h-screen bg-transparent">
    <h2 class="text-5xl text-center text-bold my-3">
      Data Table Schedule
    </h2>
    <div v-show="this.schedule != null">
      <TableSchedule
        :data="this.schedule"
        @editschedule="editSchedule"
        @addschedule="addSchedule"
        @deleteschedule="deleteScheduleByID"
      ></TableSchedule>
    </div>
  </div>
</template>

<style scoped></style>

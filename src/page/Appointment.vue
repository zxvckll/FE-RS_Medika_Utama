<script>
// This starter template is using VgetUserRoleDue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import TableAppointment from "@/components/Appointment/Table.vue";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  props: [],
  components: { TableAppointment },
  data() {
    return {

      appointment: [],
      Patient_: [],
      Doctor_: [],
      Clinic_: [],
      Polyclinic_: [],
      Schedule_: [],
    };
  },
  computed: {
    ...mapGetters("auth", {
      getAccessToken: "getAccessToken",
      getUserId: "getUserId",
      getUserRole: "getUserRole",
    }),
  },
  "this.$route.path": function (newPath, oldPath) {
      // Check if the route parameter is equal to "/signin"
      if (newPath.includes('/Appointment')) {
        // Do something when the route parameter equals "/signin"
        console.log(this.Patient_);
        console.log("ahahhaha");
      }
    },

  methods: {
    async getListPolyclinic() {
      var url = `${this.$url}/polyclinic`;
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };
      try {
        const response = await axios.get(url, config);
        this.Polyclinic_ = await response.data;
      } catch (error) {
        console.error(error);
      }
    },
    
    async getListSchedule() {
      var url = `${this.$url}/schedule`;
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };
      try {
        const response = await axios.get(url, config);
        this.Schedule_ = await response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getListDoctor() {
      var url = `${this.$url}/doctor/`;
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };
      try {
        const response = await axios.get(url, config);
        this.Doctor_ = await response.data;
      } catch (error) {
        console.error(error);
      }
    },


    async getListClinic() {
      var url = `${this.$url}/clinic/`;
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };
      try {
        const response = await axios.get(url, config);
        this.Clinic_ = await response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getListStatus() {
      var url = `${this.$url}/status/`;
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };
      try {
        const response = await axios.get(url, config);
        this.Status_ = await response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getListPatient() {
      var url = `${this.$url}/patient/`;
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };
      try {
        const response = await axios.get(url, config);
        this.Patient_ = await response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getListAppointment() {
      var url = `${this.$url}/appointment/`;
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };
      try {
        const response = await axios.get(url, config);
        const data = response;
        this.appointment = data.data;
      } catch (error) {
        console.error(error);
      }
    },

    async getListAppointmentByDoctor(getUserId) {
      var url = `${this.$url}/appointment/doctor/${getUserId}`;
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };
      try {
        console.log("User ID = " + getUserId )
        const response = await axios.get(url, config);
        const data = response;
        this.appointment = data.data;
      } catch (error) {
        console.error(error);
      }
    },

    async getListAppointmentByPatient(getUserId) {
      var url = `${this.$url}/appointment/patient/${getUserId}`;
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };
      try {
        const response = await axios.get(url, config);
        const data = response;
        this.appointment = data.data;
        console.log(this.appointment);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteAppointmentByID(id) {
      var url = `${this.$url}/appointment/${id}`;
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };
      try {
        const response = await axios.delete(url, config);
        const data = response;
        console.log(data);
        this.getListAppointment();
      } catch (error) {
        console.error(error);
      }
    },
    async addAppointment(newData) {
      delete newData.id;
      var url = `${this.$url}/appointment`;
      var data = {
        date: newData.date,
        waitingEstimation: newData.waitingEstimation,
        ScheduleId: newData.ScheduleId.id,
        DoctorId: newData.DoctorId.id,
        PatientId: newData.PatientId.id,
        ClinicId: newData.ClinicId.id,
        StatusId: newData.StatusId.id,

      };
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };
      try {
        console.log(newData);

        const response = await axios.post(url, data, config);
        console.log(response);
        this.getListAppointment();
      } catch (error) {
        console.error(error);
      }
    },
    async editAppointment(newData) {
      console.log(newData);
      var url = `${this.$url}/appointment/${newData.id}`;
      delete newData.id;
      var data = {
        date: newData.date,
        waitingEstimation: newData.waitingEstimation,
        ScheduleId: newData.ScheduleId.id,
        DoctorId: newData.DoctorId.id,
        PatientId: newData.PatientId.id,
        ClinicId: newData.ClinicId.id,
        StatusId: newData.StatusId.id,
      };
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };
      try {
        const response = await axios.put(url, data, config);
        console.log(newData);
        
        this.getListAppointment();
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    console.log(this.getUserRole);
    if(this.getUserRole == "Admin") {
      this.getListAppointment()

    }
    else if(this.getUserRole == "Doctor"){
      this.getListAppointmentByDoctor(this.getUserId);

    }
    else if(this.getUserRole == "Patient"){
      this.getListAppointmentByPatient(this.getUserId);

    }
    
    this.getListPatient();
    this.getListStatus();
    this.getListClinic();
    this.getListDoctor();
    this.getListPolyclinic();
    this.getListSchedule();
  },
};
</script>

<template>
  <div
    class="bg-white mx-auto mt-10 w-max h-max text-gray-700 min-h-screen bg-transparent"
  >
    <h2 class="text-5xl text-center text-bold my-3">Data Table Appointment</h2>
    <div v-show="this.appointment != null">
      <TableAppointment
        :data="this.appointment"
        :Patient_="Patient_"  
        :Doctor_="Doctor_"  
        :Clinic_="Clinic_"  
        :Status_="Status_"  
        :Polyclinic_="Polyclinic_"
        :Schedule_="Schedule_"
        @editappointment="editAppointment"
        @addappointment="addAppointment"
        @deleteappointment="deleteAppointmentByID"
      ></TableAppointment>
    </div>
  </div>
</template>

<style scoped></style>

<script>
// This starter template is using Vue 3 <script setup> SFCs
import ProfilePasien from "@/components/ProfilePasien.vue";
import ProfileDokter from "@/components/ProfileDokter.vue";
import ProfileAdmin from "@/components/ProfileAdmin.vue";
import axios from "axios";
import { mapGetters } from "vuex";
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
export default {
  props: [],
  computed: {
    ...mapGetters("auth", {
      getAccessToken: "getAccessToken",
      getUserId: "getUserId",
      getUserRole: "getUserRole",
    }),
  },
  components: {
    ProfilePasien,
    ProfileDokter,
    ProfileAdmin,
  },
  data() {
    return {
      data: "",
    };
  },
  methods: {
    success() {
      alert("edit sucess");
      this.$router.push('/');
    },

    async editAdmin(newData) {
      var url = `http://localhost:5000/admin/${newData.id}`
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
        this.success()

        
      } catch (error) {
        console.error(error);
      }
    },
    async editDoctor(newData) {
      var url = `http://localhost:5000/doctor/${newData.id}`
      delete newData.id
      var data = {
        
        name: newData.name,
        education: newData.education,
        imageUrl: newData.imageUrl,
        course: newData.course,
        experience: newData.experience,
        organization: newData.organization,
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
        this.success()
        
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
        this.success()
        
      } catch (error) {
        console.error(error);
      }
    },

    async getInit() {
      if (this.getUserRole == "Patient") {
       this.data = await this.getListPatientByUserId(this.getUserId);
       console.log(this.data)
   
      } else if (this.getUserRole == "Doctor") {
        this.data = await this.getListDoctorByUserId(this.getUserId);
        console.log(this.data)
      } else if (this.getUserRole == "Admin") {
        this.data = await this.getListAdminByUserId(this.getUserId);
        console.log(this.data)
      }
    },
    async getListPatientByUserId(getUserId) {
      var url = `http://localhost:5000/patient/user/${getUserId}`;
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };
      try {
        const response = await axios.get(url, config);
        const data = response;
        return data.data;
      } catch (error) {
        console.error(error);
      }
    },

    async getListAdminByUserId(getUserId) {
      var url = `http://localhost:5000/admin/user/${getUserId}`;
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };
      try {
        const response = await axios.get(url, config);
        const data = response;
        return data.data;
      } catch (error) {
        console.error(error);
      }
    },

    async getListDoctorByUserId(getUserId) {
      var url = `http://localhost:5000/doctor/user/${getUserId}`;
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };
      try {
        const response = await axios.get(url, config);
        const data = response;
        return data.data;
      } catch (error) {
        console.error(error);
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  async mounted() {
    this.getInit();
  },
};
</script>

<template>
  <div v-if="getUserRole == 'Patient'">
    <ProfilePasien @editData="editPatient" :data="this.data"></ProfilePasien>
  </div>
  <div v-if="getUserRole == 'Doctor'">
    <ProfileDokter @editData="editDoctor"  :data="this.data"></ProfileDokter>
  </div>
  <div v-if="getUserRole == 'Admin'">
    <ProfileAdmin @editData="editAdmin" :data="this.data"></ProfileAdmin>
  </div>
</template>

<style scoped></style>

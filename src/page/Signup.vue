<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import FormSignup from "@/components/FormSignup.vue";
import axios from "axios";
export default {
  props: [],
  components: {
    FormSignup,
  },
  data() {
    return {
      user: "Dokter",
      userId: null,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async signup(newData) {
      this.userId = await this.Signup(newData);
      console.log(this.userId);
      this.addPatient(newData);
    },
    async Signup(newData) {
      delete newData.id;
      var url = "http://localhost:5000/user";
      var data = {
        email: newData.email,
        password: newData.password,
      };
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };
      try {
        console.log(data);
        const response = await axios.post(url, data, config);
        console.log(response.data.body.UserId);
        return response.data.body.UserId;
        
      } catch (error) {
        console.error(error);
        alert("failed to login");
      }
    },
    async addPatient(newData) {
      delete newData.id;
      var url = "http://localhost:5000/patient";
      
      var data = {
        UserId: this.userId,
        name: newData.name,
        imageUrl: newData.imageUrl,
        address: newData.address,
        dateOfBirth: newData.dateOfBirth,
        citizenship: newData.citizenship,
        noRM: newData.noRM,
     
      };
      console.log(data);
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };
      try {
        console.log(newData);

        const response = await axios.post(url, data, config);
        console.log(response);
        alert("sign up sucess");
        this.goBack();
      } catch (error) {
        console.error(error);
        alert("failed to login");
      }
    },
  },

};
</script>

<template>
  <div class="py-10 ">
    <FormSignup  @signup="signup"></FormSignup>
  </div>
</template>

<style scoped></style>

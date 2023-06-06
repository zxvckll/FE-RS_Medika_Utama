<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import FormLogin from "@/components/FormLogin.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  props: [],
  components: {
    FormLogin,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("auth", {
      getAccessToken: "getAccessToken",
      getUserRole: "getUserRole",
    }),
  },
  methods: {
    ...mapActions("auth", {
      actionLogin: "login",
    }),
    async login(data) {
      const url = this.$url;
      console.log(url);
      var config = {
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      };

      await this.actionLogin({
        url: url,
        payload: {
          role: data.UserRole,
          email: data.Email,
          password: data.Password,
        },
        config: config,
      });
      if (this.getUserRole) {
        alert("login sucess");
        this.goHome();
      } else {
        alert("failed to login");
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>

<template>
  <FormLogin @login="login"></FormLogin>
</template>

<style scoped></style>

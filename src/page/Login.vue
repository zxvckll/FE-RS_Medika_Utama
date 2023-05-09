<script >
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import FormLogin from '@/components/FormLogin.vue'
import { mapGetters, mapActions } from "vuex";

export default {
    props: [],
    components: {
        FormLogin,
  },
  data() {
    return {

    };
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
    goBack() {
      this.$router.go(-1);
    },
    goHome() {
      this.$router.push('/');
    },
    async login(data) {
      var config = {
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      };

      await this.actionLogin(
        {
          role: data.UserRole,
          email: data.Email,
          password: data.Password,
        },
        config
      );
      if (this.getUserRole) {
        alert("login sucess");
        this.goHome()
      } else {
        alert("failed to login");
      }
    },
  }
};
</script>

<template>
<FormLogin @login="login"></FormLogin>
</template>

<style scoped>

</style>

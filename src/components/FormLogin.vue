<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
export default {
  props: [],
  components: {},
  data() {
    return {
      UserRole: "",
      Email: "",
      Password: "",
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    submitForm() {
      var newData = {
        UserRole: this.UserRole,
        Email: this.Email,
        Password: this.Password
      };
      this.$emit("login", newData);
    },
  },
};
</script>

<template>
  <div
    class="bg-white mx-auto mt-10 w-max h-max text-gray-700 min-h-screen bg-transparent"
  >
    <div
      class="bg-gray-50 border border-gray-200 p-10 rounded max-w-lg mx-auto mt-24 mb-24"
    >
      <header class="text-center">
        <h2 class="text-2xl font-bold mb-1">Log in</h2>
        <img
          src="https://www.rspkt.com/sites/rspkt.com/files/rsmup-landscape.png"
          alt=""
          class="h-10 mx-auto mb-10 mt-5"
        />
      </header>
      <!-- <form method="POST" action="/products" enctype="multipart/form-data"> -->
      <div class="mb-6">
        <label for="Role" class="inline-block text-lg mb-2">Role</label>
        <select
          name="UserRole"
          id="Role"
          class="border border-gray-200 rounded p-2 w-full"
          v-model="UserRole"
        >
          <option disabled value="">Pilih Tipe User</option>
          <option value="Admin">Admin</option>
          <option value="Doctor">Dokter</option>
          <option value="Patient">Pasien</option>
        </select>
      </div>

      <div class="mb-6">
        <label for="Email" class="inline-block text-lg mb-2">Email</label>
        <input
          type="text"
          class="border border-gray-200 rounded p-2 w-full"
          name="Email"
          v-model="Email"
        />
      </div>

      <div class="mb-6">
        <label for="Password" class="inline-block text-lg mb-2">Password</label>
        <input
          type="password"
          class="border border-gray-200 rounded p-2 w-full"
          name="Password"
          v-model="Password"
        />
      </div>
      <div class="mb-6">
        <button
          class="bg-green-400 text-black rounded py-2 px-4 hover:bg-green-600"
          @click.prevent="submitForm()"
        >
          Log in
        </button>

        <button class="text-black ml-4" @click="goBack()">Back</button>
      </div>
      <!-- </form> -->
    </div>
  </div>
</template>

<style scoped></style>

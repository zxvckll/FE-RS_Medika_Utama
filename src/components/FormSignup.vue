<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
export default {
  props: [],
  components: {},
  data() {
    return {
      name: "",
      imageUrl: "",
      address: "",
      dateOfBirth: "",
      citizenship: "",
      noRM: "",
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    submitForm() {
      var newData = {
        email: this.email,
        password: this.password,
        name: this.name,
        imageUrl: this.imageUrl,
        address: this.address,
        dateOfBirth: this.dateOfBirth,
        citizenship: this.citizenship,
        noRM: this.noRM,
      };
      this.$emit("signup", newData);
    },

    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<template>
  <div
    class="flex items-start text-gray-700 justify-center min-h-screen text-center"
  >
    <div
      class="bg-white rounded-lg text-left overflow-hidden shadow-xl p-8 w-1/2"
    >
      <header class="text-center">
        <h2 class="text-2xl font-bold mb-1">Sign up Patient</h2>
        <img
          src="https://www.rspkt.com/sites/rspkt.com/files/rsmup-landscape.png"
          alt=""
          class="h-10 mx-auto mb-10 mt-5"
        />
      </header>
      <!-- <form method="POST" action="/products" enctype="multipart/form-data"> -->

      <div class="mb-6">
        <label for="Email" class="inline-block text-lg mb-2">Email</label>
        <input
          type="text"
          class="border border-gray-200 rounded p-2 w-full"
          name="Email"
          v-model="this.email"
        />
      </div>
      
      <div class="mb-6">
        <label for="Password" class="inline-block text-lg mb-2">Password</label>
        <input
          type="password"
          class="border border-gray-200 rounded p-2 w-full"
          name="Password"
          v-model="this.password"
        />
      </div>

      <div class="mb-6">
        <label for="name" class="inline-block text-lg mb-2">Nama</label>
        <input
          type="text"
          class="border border-gray-200 rounded p-2 w-full"
          name="name"
          v-model="this.name"
        />
      </div>

      <div class="mb-6">
        <label for="noRM" class="inline-block text-lg mb-2">no RM</label>
        <input
          type="text"
          class="border border-gray-200 rounded p-2 w-full"
          name="name"
          v-model="this.noRM"
        />
      </div>

      <div class="mb-6">
        <label for="imageUrl" class="inline-block text-lg mb-2"
          >Url Gambar</label
        >
        <input
          type="text"
          class="border border-gray-200 rounded p-2 w-full"
          name="imageUrl"
          v-model="this.imageUrl"
        />
      </div>

      <div class="mb-6">
        <label for="address" class="inline-block text-lg mb-2">Alamat</label>
        <input
          type="text"
          class="border border-gray-200 rounded p-2 w-full"
          name="address"
          v-model="this.address"
        />
      </div>

      <div class="mb-6">
        <label for="dateOfBirth" class="inline-block text-lg mb-2"
          >Tanggal lahir</label
        >
        <input
          type="text"
          class="border border-gray-200 rounded p-2 w-full"
          name="dateOfBirth"
          v-model="this.dateOfBirth"
        />
      </div>

      <div class="mb-6">
        <label for="citizenship" class="inline-block text-lg mb-2"
          >Kewarganegaraan</label
        >
        <input
          type="text"
          class="border border-gray-200 rounded p-2 w-full"
          name="citizenship"
          v-model="this.citizenship"
        />
      </div>

      <div class="mb-6">
        <button
          class="bg-green-400 text-black rounded py-2 px-4 hover:bg-green-600"
          @click.prevent="submitForm()"
        >
          Sign in
        </button>

        <button class="text-black ml-4" @click="goBack()">Back</button>
      </div>
      <!-- </form> -->
    </div>
  </div>
</template>

<style scoped></style>

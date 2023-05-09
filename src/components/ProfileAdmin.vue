<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import axios from "axios";
export default {
  props: {
    data: {
      required: true,
    },
  },

  components: {},
  data() {
    return {
      name: "",
      // email: "",
      id:"",
      dataCopy: null,
    };
  },  
  watch: {
    data: {
      immediate: true,
      handler(val) {
        this.dataCopy = val;
        this.name = this.dataCopy.name
        this.id = this.dataCopy.id
        // this.email = this.dataCopy.User.email
      },
    },
  },

  methods: {
    submitForm() {
      var newData = {
        id: this.id,
        name: this.name,
      };
      this.$emit("editData", newData);
    },


    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<template>
  <div
    class="flex items-start mt-10 text-gray-700 justify-center min-h-screen text-center"
  >
    <div
      class="bg-white rounded-lg text-left overflow-hidden shadow-xl p-8 w-1/2"
    >
      <header class="text-center">
        <h2 class="text-2xl font-bold mb-1">Profile Admin</h2>
        <img
          src="https://www.rspkt.com/sites/rspkt.com/files/rsmup-landscape.png"
          alt=""
          class="h-10 mx-auto mb-10 mt-5"
        />
      </header>
      <!-- <form method="POST" action="/products" enctype="multipart/form-data"> -->
      <!-- <div class="mb-6">
        <label for="Email" class="inline-block text-lg mb-2">Email</label>
        <input
          type="text"
          class="border border-gray-200 rounded p-2 w-full"
          name="Email"
          v-model="this.email"
        />
      </div> -->
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
        <button
          class="bg-green-400 text-black rounded py-2 px-4 hover:bg-green-600"
          @click.prevent="submitForm()"
        >
          Simpan
        </button>

        <button class="text-black ml-4" @click="goBack()">Back</button>
      </div>
      <!-- </form> -->
    </div>
  </div>
</template>

<style scoped></style>

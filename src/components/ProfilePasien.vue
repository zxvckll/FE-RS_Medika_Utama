<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
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
      noRM: "",
      imageUrl: "",
      address: "",
      dateOfBirth: "",
      citizenship: "",
      dataCopy: null,
    };
  },
  watch: {
    data: {
      immediate: true,
      handler(val) {
        this.dataCopy = val;
        this.id = this.dataCopy.id
        this.name = this.dataCopy.name
        this.noRM = this.dataCopy.noRM
        this.imageUrl = this.dataCopy.imageUrl
        this.address = this.dataCopy.address
        this.dateOfBirth = this.dataCopy.dateOfBirth
        this.citizenship = this.dataCopy.citizenship
      },
    },
  },

  methods: {
    submitForm() {
      var newData = {
        id: this.id,
        name: this.name,
        noRM: this.noRM,
        imageUrl: this.imageUrl,
        address: this.address,
        dateOfBirth: this.dateOfBirth,
        citizenship: this.citizenship,
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
    class="py-10 flex items-start text-gray-700 justify-center min-h-screen text-center"
  >
    <div
      class="bg-white rounded-lg text-left overflow-hidden shadow-xl p-8 w-1/2"
    >
      <header class="text-center">
        <h2 class="text-2xl font-bold  mb-1">Profile</h2>
        <img
                src="https://www.rspkt.com/sites/rspkt.com/files/rsmup-landscape.png"
                alt=""
                class="h-10 mx-auto mb-10 mt-5"
              />
      </header>
      <!-- <form method="POST" action="/products" enctype="multipart/form-data"> -->
        <div class="mb-6">
              <label for="Name" class="inline-block text-lg mb-2">Nama</label>
              <input
                type="text"
                class="border border-gray-200 rounded p-2 w-full"
                name="Name"
                v-model="this.name"
              />
            </div>

            <div class="mb-6">
              <label for="noRM" class="inline-block text-lg mb-2">no RM</label>
              <input
                type="text"
                class="border border-gray-200 rounded p-2 w-full"
                name="noRM"
                v-model="this.noRM"
              />
            </div>

            <div class="mb-6">
              <label for="imageUrl" class="inline-block text-lg mb-2"
                >Image Url</label
              >
              <input
                type="text"
                class="border border-gray-200 rounded p-2 w-full"
                name="imageUrl"
                v-model="this.imageUrl"
              />
            </div>

            <div class="mb-6">
              <label for="address" class="inline-block text-lg mb-2"
                >address</label
              >
              <input
                type="text"
                class="border border-gray-200 rounded p-2 w-full"
                name="address"
                v-model="this.address"
              />
            </div>

            <div class="mb-6">
              <label for="dateOfBirth" class="inline-block text-lg mb-2"
                >dateOfBirth</label
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
                >citizenship</label
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
            Simpan
          </button>
          
    
            <button class="text-black ml-4" @click="goBack()">Back</button>
            

        </div>
      <!-- </form> -->
    </div>
  </div>
</template>

<style scoped>

</style>

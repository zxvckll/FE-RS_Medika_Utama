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
      email: "",
      id: "",
      education: "",
      imageUrl: "",
      course: "",
      experience: "",
      organization: "",
      dataCopy: null,
    };
  },
  watch: {
    data: {
      immediate: true,
      handler(val) {
        this.dataCopy = val;
        this.id = this.dataCopy.id;
        this.name = this.dataCopy.name;
        this.education = this.dataCopy.education;
        this.imageUrl = this.dataCopy.imageUrl;
        this.course = this.dataCopy.course;
        this.experience = this.dataCopy.experience;
        this.organization = this.dataCopy.organization;
      },
    },
  },

  methods: {
    submitForm() {
      var newData = {
        id: this.id,
        name: this.name,
        education: this.education,
        imageUrl: this.imageUrl,
        course: this.course,
        experience: this.experience,
        organization: this.organization,
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
        <h2 class="text-2xl font-bold mb-1">Profile</h2>
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
        <label for="education" class="inline-block text-lg mb-2"
          >Education</label
        >
        <input
          type="text"
          class="border border-gray-200 rounded p-2 w-full"
          name="education"
          v-model="this.education"
        />
      </div>

      <div class="mb-6">
        <label for="course" class="inline-block text-lg mb-2">Course</label>
        <input
          type="text"
          class="border border-gray-200 rounded p-2 w-full"
          name="course"
          v-model="this.course"
        />
      </div>
      <div class="mb-6">
        <label for="experience" class="inline-block text-lg mb-2"
          >Experience</label
        >
        <input
          type="text"
          class="border border-gray-200 rounded p-2 w-full"
          name="experience"
          v-model="this.experience"
        />
      </div>
      <div class="mb-6">
        <label for="organization" class="inline-block text-lg mb-2"
          >Organization</label
        >
        <input
          type="text"
          class="border border-gray-200 rounded p-2 w-full"
          name="organization"
          v-model="this.organization"
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

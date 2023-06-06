<script>
import eye from "../eye.vue";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  props: ["show", "data"],
  components: { eye },
  computed: {
    ...mapGetters("auth", {
      getUserRole: "getUserRole",
      getUserId: "getUserId",
      getAccessToken: "getAccessToken",
    }),
  },
  data() {
    return {
      name: "",
      imageUrl: "",
      education: "",
      course: "",
      experience: "",
      organization: "",
      Polyclinic: "",
      Clinic: "",
      Polyclinic_: "",
      Clinic_: "",
      tempClinic: "",
      User_: "",
      User: "",

    };
  },

  methods: {
    SelectPolyclinic(value) {
      this.tempClinic = this.Clinic_.filter(
        (data) => data.PolyclinicId === value.id
      );
      this.Clinic = "";
    },

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
        console.log(this.Polyclinic_);
      } catch (error) {
        console.error(error);
      }
    },

    async getListUser() {
      var url = `${this.$url}/user`;
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };
      try {
        const response = await axios.get(url, config);
        this.User_ = await response.data;
        console.log(this.User_);
      } catch (error) {
        console.error(error);
      }
    },

    async getListClinic() {
      var url = `${this.$url}/Clinic`;
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };
      try {
        const response = await axios.get(url, config);
        this.Clinic_ = await response.data;
        console.log(this.Clinic_);
      } catch (error) {
        console.error(error);
      }
    },

    async getListClinic() {
      var url = `${this.$url}/Clinic`;
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };
      try {
        const response = await axios.get(url, config);
        this.Clinic_ = await response.data;
        console.log(this.Clinic_);
      } catch (error) {
        console.error(error);
      }
    },

    submitForm() {
      if (this.data[0]) {
        var Id = this.data[0].id;
      } else {
        var Id = "";
      }
      var newData = {
        id: Id,

        name: this.name,
        imageUrl: this.imageUrl,
        education: this.education,
        course: this.course,
        experience: this.experience,
        organization: this.organization,
        ClinicId: this.Clinic,
        PolyclinicId: this.Polyclinic,
        UserId: this.User,
      };

      if (!this.data[0]) {
        console.log(newData);

        this.$emit("adddoctor", newData);
      } else {
        console.log(newData);
        this.$emit("editdoctor", newData);
      }
    },
  },
  created() {
    this.getListPolyclinic();
    this.getListClinic();
    this.getListUser();
  },
  watch: {
    show(newValue, oldValue) {
      if (newValue == true) {
        if (this.data[0]) {
          this.name = this.data[0]?.name ? this.data[0]?.name : "";
          this.imageUrl = this.data[0]?.imageUrl ? this.data[0]?.imageUrl : "";
          this.education = this.data[0]?.education
            ? this.data[0]?.education
            : "";
          this.course = this.data[0]?.course ? this.data[0]?.course : "";
          this.experience = this.data[0]?.experience
            ? this.data[0]?.experience
            : "";
          this.organization = this.data[0]?.organization
            ? this.data[0]?.organization
            : "";

          this.Polyclinic = this.data[0]?.Clinic?.PolyclinicId
            ? this.Polyclinic_.find(
                (data) => data.id === this.data[0]?.Clinic?.PolyclinicId
              )
            : "";

          this.tempClinic = this.data[0]?.PolyclinicId
            ? this.Clinic_.filter(
                (data) =>
                  data.PolyclinicId === this.data[0]?.Clinic?.PolyclinicId
              )
            : "";

          this.Clinic = this.data[0]?.ClinicId
            ? this.Clinic_.find((data) => data.id === this.data[0]?.ClinicId)
            : "";

          this.User = this.data[0]?.UserId
            ? this.User_.find((data) => data.id === this.data[0]?.UserId)
            : "";

          console.log(this.User_);
          console.log(this.User);
        }
      }
      if (newValue == false) {
        this.name = "";
        this.imageUrl= "";
        this.education= "";
        this.course= "";
        this. experience= "";
        this.organization= "";
        this. Polyclinic= "";
        this.Clinic= "";
        this. tempClinic= "";
        this. User= "";
      }
    },
  },
};
</script>

<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="mask fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50 text-gray-700"
    >
      <div
        class="flex items-start justify-center min-h-screen pt-24 text-center"
      >
        <div
          class="bg-white rounded-lg text-left overflow-hidden shadow-xl p-8 w-1/2"
        >
          <div class="">
            <header class="text-center">
              <h2 class="text-2xl font-bold mb-1">
                {{ !this.data[0] ? "Add Data " : "Edit Data " }}
              </h2>
              <img
                src="https://penyelamatdata.com/wp-content/uploads/2017/08/logogerak1.gif"
                alt=""
                class="h-10 mx-auto mb-10 mt-5"
              />
            </header>
            <!-- <form method="POST" action="/products" enctype="multipart/form-data"> -->
            <div class="mb-6">
              <label for="User" class="inline-block text-lg mb-2"
                >User Email
              </label>
              <div class="flex">
                <multiselect
                  v-model="User"
                  deselect-label="Please enter to deselect"
                  track-by="id"
                  label="email"
                  placeholder="Select one"
                  :options="this.User_"
                >
                </multiselect>
                <eye :url="'/Patient'"> </eye>
              </div>
            </div>

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
              <label for="course" class="inline-block text-lg mb-2"
                >Course</label
              >
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
              <label for="Patient" class="inline-block text-lg mb-2"
                >Polyclinic
              </label>
              <div class="flex">
                <multiselect
                  v-model="Polyclinic"
                  deselect-label="Please enter to deselect"
                  track-by="id"
                  label="name"
                  placeholder="Select one"
                  :options="this.Polyclinic_"
                  @select="SelectPolyclinic"
                >
                </multiselect>
                <eye :url="'/Clinic'"> </eye>
              </div>
            </div>

            <div class="mb-6">
              <label for="Patient" class="inline-block text-lg mb-2"
                >Clinic
              </label>
              <div class="flex">
                <multiselect
                  v-model="Clinic"
                  deselect-label="Please enter to deselect"
                  track-by="id"
                  label="name"
                  placeholder="Select one"
                  :options="this.tempClinic"
                >
                </multiselect>
                <eye :url="'/Clinic'"> </eye>
              </div>
            </div>

            <div class="mb-6">
              <button
                class="bg-blue-400 text-black rounded py-2 px-4 hover:bg-blue-600"
                @click.prevent="submitForm()"
              >
                {{ this.data[0] ? "Edit" : "Tambah" }}
              </button>
              <button class="text-black ml-4" @click="$emit('close')">
                Back
              </button>
            </div>
            <!-- </form> -->
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
@import "vue-select/dist/vue-select.css";
@import "vue-multiselect/dist/vue-multiselect.css";
.mask {
  transition: opacity 0.3s ease;
}
.modal-container {
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

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
      Doctor: "",
      Doctor_: "",
      Day: "",
      Day_: "",
      time: "",
    };
  },

  methods: {
    async getListDoctor() {
      var url = `http://localhost:5000/doctor`;
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };
      try {
        const response = await axios.get(url, config);
        this.Doctor_ = await response.data;
        console.log(this.Doctor_);
      } catch (error) {
        console.error(error);
      }
    },

    async getListDay() {
      var url = `http://localhost:5000/day`;
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };
      try {
        const response = await axios.get(url, config);
        this.Day_ = await response.data;
        console.log(this.Day_);
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
        DoctorId: this.Doctor,
        DayId: this.Day,
        time: this.time,

      };

      if (!this.data[0]) {
        console.log(newData);

        this.$emit("addschedule", newData);
      } else {
        console.log(newData);
        this.$emit("editschedule", newData);
      }
    },
  },
  created() {
    this.getListDoctor();
    this.getListDay();
  },
  watch: {
    show(newValue, oldValue) {
      if (newValue == true) {
        if (this.data[0]) {
          this.time = this.data[0]?.time ? this.data[0]?.time : "";

          this.Doctor = this.data[0]?.DoctorId
            ? this.Doctor_.find((data) => data.id === this.data[0]?.DoctorId)
            : "";

          this.Day = this.data[0]?.DayId
            ? this.Day_.find((data) => data.id === this.data[0]?.DayId)
            : "";
        }
      }
      if (newValue == false) {
        this.Doctor = "";
        this.Day = "";
        this.time = "";
        this.name = "";

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
              <label for="Doctor" class="inline-block text-lg mb-2"
                >Doctor Name
              </label>
              <div class="flex">
                <multiselect
                  v-model="Doctor"
                  deselect-label="Please enter to deselect"
                  track-by="id"
                  label="name"
                  placeholder="Select one"
                  :options="this.Doctor_"
                >
                </multiselect>
                <eye :url="'/Patient'"> </eye>
              </div>
            </div>


            <div class="mb-6">
              <label for="Day" class="inline-block text-lg mb-2"
                >Day
              </label>
              <div class="flex">
                <multiselect
                  v-model="Day"
                  deselect-label="Please enter to deselect"
                  track-by="id"
                  label="name"
                  placeholder="Select one"
                  :options="this.Day_"
                >
                </multiselect>
                <eye :url="'/Patient'"> </eye>
              </div>
            </div>



            <div class="mb-6">
              <label for="Time" class="inline-block text-lg mb-2">Waktu</label>
              <input
                type="text"
                class="border border-gray-200 rounded p-2 w-full"
                name="Time"
                v-model="this.time"
              />
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

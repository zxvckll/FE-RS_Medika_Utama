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
      noRM: "",
      imageUrl: "",
      address: "",
      dateOfBirth: "",
      citizenship: "",
      User: "",
      User_: "",
    };
  },

  methods: {


    async getListUser() {
      var url = `http://localhost:5000/user`;
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




    submitForm() {
      if (this.data[0]) {
        var Id = this.data[0].id;
      } else {
        var Id = "";
      }
      var newData = {
        id: Id,
        name: this.name,
        noRM: this.noRM,
        imageUrl: this.imageUrl,
        address: this.address,
        dateOfBirth: this.dateOfBirth,
        citizenship: this.citizenship,
        UserId: this.User,
      };

      if (!this.data[0]) {
        console.log(newData);

        this.$emit("addpatient", newData);
      } else {
        console.log(newData);
        this.$emit("editpatient", newData);
      }
    },
  },
  created() {
    this.getListUser();
  },
  watch: {
    show(newValue, oldValue) {
      if (newValue == true) {
        if (this.data[0]) {
          this.name = this.data[0]?.name ? this.data[0]?.name : "";
          this.noRM = this.data[0]?.noRM ? this.data[0]?.noRM : "";
          this.imageUrl = this.data[0]?.imageUrl ? this.data[0]?.imageUrl : "";
          this.address = this.data[0]?.address ? this.data[0]?.address : "";
          this.dateOfBirth = this.data[0]?.dateOfBirth ? this.data[0]?.dateOfBirth : "";
          this.citizenship = this.data[0]?.citizenship ? this.data[0]?.citizenship : "";
         
          this.User = this.data[0]?.UserId
            ? this.User_.find((data) => data.id === this.data[0]?.UserId)
            : "";

          console.log(this.User_);
          console.log(this.User);
        }
      }
      if (newValue == false) {
        this.name = "";
        this.noRM = "";
        this.imageUrl = "";
        this.address = "";
        this.dateOfBirth = "";
        this.citizenship = "";
        this.User = "";

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

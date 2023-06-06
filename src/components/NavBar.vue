<script>
import Menus from "./Menus.vue";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import Modal from "@/page/PendaftaranPasien.vue"

export default {
  components: {
    Menus,Modal
  },
  computed: {
    ...mapGetters("auth", {
      getUserRole: "getUserRole",
      getUserId: "getUserId",
    }),
  },
  data() {
    return {
      //edit Data
      isSideActive: false,
      polyclinics: [],
      isUser: true,
      isActive: false,
      isMenuActive: false,
      isProfile: false,
      showModal: false,
    };
  },
  methods: {
    openAddModal() {
      this.selectedData = {};
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },

    goHome() {
      this.$router.push("/");
    },
    ...mapActions("auth", {
      actionLogout: "logout",
    }),
    toggle() {
      this.isActive = !this.isActive;
    },
    logout() {
      this.actionLogout();
      this.goHome();
      alert("logout sucess");
    },
    async getListPolyclinic() {
      var url = `${this.$url}/polyclinic/`;
      try {
        const response = await axios.get(url);
        this.polyclinics = await response.data;
        console.log(this.polyclinics);
      } catch (error) {
        console.error(error);
      }
    },
  },

  created() {
    this.getListPolyclinic();
  },
};
</script>
<template>
  <!-- navbar disini -->
  <nav class="bg-white border-b-2">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between">
        <!-- LEFT SIDE -->
        <div class="flex space-x-1">
          <!-- logo -->

          <div>
            <router-link to="/" class="flex items-center mr-3 py-5 px-3">
              <img
                src="https://www.rspkt.com/sites/rspkt.com/files/rsmup-landscape.png"
                alt=""
                class="h-8"
              />
            </router-link>
          </div>
          <!-- primary nav -->
          <div class="hidden md:flex items-center space-x-1">
            <!-- <div class="py-5 px-4 text-gray-700 hover:text-gray-900">
              <router-link to="/Admin">Admin</router-link>
            </div> -->
            <div class="dropdown">
              <h1 class="text-gray-700"></h1>
              <button
                to="/"
                class="text-gray-700 text-sm dropbtn py-2 px-2 hover:text-gray-900"
                v-if="getUserRole =='Admin'"
              >
                List Page
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="inline w-3 h-3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
              <div class="dropdown-content">
                <router-link class="px-1 py-1 text-xs" to="/Admin"
                  >admin</router-link
                >
                <router-link class="px-1 py-1 text-xs" to="/Appointment"
                  >appointment</router-link
                >
                <router-link class="px-1 py-1 text-xs" to="/Clinic"
                  >clinic</router-link
                >
                <router-link class="px-1 py-1 text-xs" to="/Day"
                  >day</router-link
                >
                <router-link class="px-1 py-1 text-xs" to="/Doctor"
                  >doctor</router-link
                >
                <router-link class="px-1 py-1 text-xs" to="/Patient"
                  >patient</router-link
                >
                <router-link class="px-1 py-1 text-xs" to="/Polyclinic"
                  >polyclinic</router-link
                >
                <router-link class="px-1 py-1 text-xs" to="/Schedule"
                  >schedule</router-link
                >
                <router-link class="px-1 py-1 text-xs" to="/Status"
                  >status</router-link
                >
                <router-link class="px-1 py-1 text-xs" to="/User"
                  >user</router-link
                >
              </div>
            </div>
            <div class="relative">
              <button
                @click="isMenuActive = !isMenuActive"
                class="py-5 px-4 text-gray-700 hover:text-gray-900"
              >
                Jadwal Praktek
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="inline w-3 h-3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
              <ul
                class="left-0 w-max justify-center grid-cols-1 absolute bg-gray-100 text-gray-700"
              >
                <div v-if="isMenuActive">
                  <Menus
                    v-for="(sam, index) in this.polyclinics"
                    v-bind:key="index"
                    :menu="sam"
                  />
                </div>
              </ul>
            </div>
            <div v-if="getUserRole">
              <button
                @click="openAddModal()"
                :id="lol"
                class="py-5 px-4 text-gray-700 hover:text-gray-900"
              >
                Pendaftaran Pasien
              </button>
              <Teleport to="#Modal">
                <!-- use the modal component, pass in the prop -->
                <Modal
                  :show="showModal"
                  @close="closeModal()"
                  @addappointment="addAppointment"
                >
                </Modal>
              </Teleport>
            </div>
            <!-- if log in  -->
            <router-link
              to="/Appointment"
              class="py-5 px-4 text-gray-700 hover:text-gray-900"
              v-if="getUserRole"
            >
              Data antrian
            </router-link>
          </div>
        </div>
        <!-- RIGHT SIDE -->

        <!-- secondary nav -->
        <div
          v-if="!getUserRole"
          class="hidden md:flex items-center justify-between space-x-1"
        >
          <router-link
            to="/Login"
            class="py-5 px-4 text-gray-700 hover:text-gray-900"
          >
            Log in
          </router-link>
          <router-link
            to="/Signup"
            class="py-2 px-4 bg-green-400 rounded text-gray-700 hover:bg-green-600 hover:text-gray-900 transition duration-300"
          >
            Sign up
          </router-link>
        </div>
        <div
          v-else
          class="hidden md:flex items-center justify-between space-x-1 relative"
        >
          <button class="text-gray-700" @click="isProfile = !isProfile">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-10 h-10 bg-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>

          <div
            class="left-0 top-full w-max justify-center grid-cols-1 absolute bg-gray-100 text-gray-700"
          >
            <ul v-if="isProfile">
              <li>
                <router-link
                  to="/Profile"
                  class="py-2 px-4 border hover:text-gray-900 block"
                  >Edit Profile</router-link
                >
              </li>
              <li>
                <button
                  class="py-2 px-4 border hover:text-gray-900 block"
                  @click="logout()"
                >
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </div>
        <!-- Mobile Button 
        <div class="md:hidden flex items-center text-gray-700">
          <button class="mobile-menu-button" @click="toggle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div> -->
      </div>
    </div>
    <!-- mobile nav
    <div
      class="mobile-menu text-gray-700 md:hidden block text-center"
      :class="[isActive ? 'hidden' : '']"
    >
      <div class="relative">
        <a class="block py-2 px-4 text-sm hover:bg-gray-200">
          Jadwal Praktek
        </a>
      </div>
      <router-link
        to="/PendaftaranPasien"
        class="block py-2 px-4 text-sm hover:bg-gray-200"
        >Pendaftaran Pasien</router-link
      >
      <div v-if="getUserRole">
        <router-link
          to="/DataAntrian"
          class="block py-2 px-4 text-sm hover:bg-gray-200"
          >Data antrian</router-link
        >
        <router-link
          to="/Profile"
          class="block py-2 px-4 text-sm hover:bg-gray-200"
          >Edit Profile</router-link
        >
      </div>

      <div v-if="!getUserRole">
        <router-link
          to="/Login"
          class="block py-2 px-4 text-sm hover:bg-gray-200"
          >Login</router-link
        >
        <router-link
          to="/Signin"
          class="block py-2 px-4 text-sm bg-green-400 hover:bg-green-600 hover:text-gray-900 transition duration-300"
          >Signin</router-link
        >
      </div>
    </div> -->
  </nav>

  <!-- content goes here -->
  <!-- <div class="py-32 text-center"> -->
  <!-- <h2 class="fontt-extrabold text-4xl">Navbar in Tailwind!</h2> -->
</template>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.submenu a {
  min-width: 100px;
  background-color: #f1f1f1;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.dropdown-content a {
  color: black;
  text-decoration: none;
  display: block;
  padding-top: 5px;
  padding-bottom: 5px;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}
.menu:hover .submenu {
  display: block;
}
</style>

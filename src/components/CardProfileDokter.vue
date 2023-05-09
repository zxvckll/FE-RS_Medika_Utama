<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import ModalJadwalPraktek from "./ModalJadwalPraktek.vue";
import DeleteModal from "./DeleteModal.vue";
import axios from "axios";
export default {
  props: ["data","userRole","schedule"],
  components: {
    ModalJadwalPraktek,
    DeleteModal,
  },
  data() {
    return {
      
      userRole : 'Dokter',
      DokterID : 123,
      //Dokter ID : [123,124,125]
      showModal: false,
      showDeleteModal: false,
      selectedJamPraktek: {},
      scheduleByDoctor: null,
    };
  },
  methods: {
    async getListScheduleByDoctor(id) {
      var url = `http://localhost:5000/schedule/doctor/${this.data.id}`;
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };
      try {
        const response = await axios.get(url, config);
        this.scheduleByDoctor = await response.data;
        this.time_ = this.scheduleByDoctor;
        this.day_ = this.scheduleByDoctor;
        this.time = this.data[0]?.Schedule?.id
          ? this.scheduleByDoctor.find(
              (data) => data.id === this.data[0]?.Schedule?.id
            )
          : "";
        this.day = this.time;
      } catch (error) {
        console.error(error);
      }
    },

    goBack() {
      this.$router.go(-1);
    },

    openModal() {
      let id = event.srcElement.id;
      console.log(id);
      if (id == 0) {
        this.selectedJamPraktek = {};
        this.showModal = true;
      } else {
        this.selectedJamPraktek = this.data.Waktu.filter((d) => d.id == id);
        this.showModal = true;
      }
    },
    openDeleteModal() {
      let id = event.srcElement.id;
      console.log(id);
      this.selectedJamPraktek = this.data.Waktu.filter((d) => d.id == id);
      this.showDeleteModal = true;
    },
    deleteData() {
      console.log("delete data successfully");
    },
  },
  mounted() {
this.getListScheduleByDoctor();
  }
};
</script>

<template>
  <div class="min-h-screen">
    <!-- <div class="h-28 bg-blue-200 text-gray-700"></div> -->
    <div class="h-4/5 mt-20 w-4/5 mx-auto grid grid-cols-3 bg-white text-gray-700 rounded-md ">
      <!-- card img goes here -->
      <div class="w-full">
        <img
          class="mx-auto w-72 pb-10 mt-5 rounded-md"
          :src="this.data.imageUrl"
          alt=""
        />
        <div>
          <h2 class="text-center pb-5 text-lg ">Jadwal Praktek </h2>
          <table
            class="mx-auto mb-5 border-collapse table-auto overflow-hidden shadow-md w-9/12"
          >
            <thead class=" text-left font-bold">
              <tr>
                <th>Hari</th>
                <th>Waktu</th>
                <th v-if="(userRole != 'Pasien')&&(DokterID == data.id)||(userRole == 'Admin')">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(jadwalPraktek, index) in scheduleByDoctor"
                v-bind:key="index"
                class="border-b"
              >
                <td class="pr-10">{{ jadwalPraktek.Day.name }}</td>
                <td>{{ jadwalPraktek.time.slice(0,5) }}</td>
                <td class="flex items-center justify-center" v-if="(userRole != 'Pasien')&&(DokterID == data.id)||(userRole == 'Admin')">
                  <button
                    class="bg-green-400 text-black rounded py-2 px-2 hover:bg-green-600"
                    :id="jadwalPraktek.id"
                    @click="openModal()"
                  >
                    Edit
                  </button>

                  <Teleport to="body">
                    <!-- use the modal component, pass in the prop -->
                    <ModalJadwalPraktek
                      :data="selectedJamPraktek"
                      :show="showModal"
                      @close="showModal = false"
                    >
                    </ModalJadwalPraktek>
                  </Teleport>

                  <button
                    :id="jadwalPraktek.id"
                    @click="openDeleteModal()"
                    class="bg-red-400 text-black rounded py-2 px-2 hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <Teleport to="body">
                    <!-- use the modal component, pass in the prop -->
                    <DeleteModal
                      :data="selectedJamPraktek"
                      :show="showDeleteModal"
                      @close="showDeleteModal = false"
                      @delete="deleteData()"
                    >
                    </DeleteModal>
                  </Teleport>
                </td>
              </tr>
            </tbody>
          </table>
          <div class=" mx-5 my-5" v-if="(userRole != 'Pasien')&&(DokterID == data.id)||(userRole == 'Admin') ">
            <button
              :id="0"
              class="mt-10 py-3 px-5 bg-blue-400 text-black rounded hover:bg-blue-600"
              @click="openModal()"
            >
              Tambah Data antrian
            </button>
          </div>
        </div>
      </div>
      <!-- data goes here -->
      <div class="col-span-2">
        <div class="">
          <h1 class="mt-5 py-5 text-xl text-black">Dokter Spesialis {{ data.Clinic.Polyclinic.name }} {{ data.Clinic.name }}</h1>
          <h2 class=" py-5 text-xl text-black">{{ data.name  }}</h2>
          <h3 class="pb-5 text-sm">{{ data.education }}</h3>
          <h3 class="py-1 text-black">Course / Training:</h3>
          <p class="pb-5  text-sm">{{ data.course }}</p>
          <h3 class="py-1 text-black">Pengalaman bekerja:</h3>
          <p class="pb-5  text-sm">{{ data.experience }}</p>
          <h3 class="py-1 text-black">Organisasi:</h3>
          <p class="pb-5  text-sm">{{ data.organization }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style >
img {
  width: 300px;
  height: 300px;
  object-fit: cover;
}
</style>

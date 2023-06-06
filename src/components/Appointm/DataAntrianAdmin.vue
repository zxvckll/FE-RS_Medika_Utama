<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import ModalDataAntrian from "@/components/Appointment/ModalDataAntrian.vue";
// import DeleteModal from "../DeleteModal.vue";
// import axios from "axios";

import { mapGetters } from "vuex";

export default {
  components: {
    ModalDataAntrian,
    DeleteModal,
  },
  computed: {
    ...mapGetters("auth", {
      getUserRole: "getUserRole",
      getUserId: "getUserId",
      getAccessToken: "getAccessToken",
    }),
  },
  data() {
    return {
      showModal: false,
      deleteModal: false,
      showDeleteModal: false,
      selectedData: {},
      dataAntrian: [],
      dataDoctor: [],
      dataPatient: [],
      dataClinic: [],
      dataStatus: [],
    };
  },

  methods: {
    async getListDoctor() {
      var url = `${this.$url}/doctor/`;
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };
      try {
        const response = await axios.get(url, config);
        this.dataDoctor = await response.data;
        console.log(this.dataDoctor);
      } catch (error) {
        console.error(error);
      }
    },

    async getListPatient() {
      var url = `${this.$url}/patient/`;
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };
      try {
        const response = await axios.get(url, config);
        this.dataPatient = await response.data;
        console.log(this.dataPatient);
      } catch (error) {
        console.error(error);
      }
    },
    async getListAppointment() {
      var url = `${this.$url}/appointment/`;
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };
      try {
        const response = await axios.get(url, config);
        this.dataAntrian = await response.data;
        console.log(this.dataAntrian);
      } catch (error) {
        console.error(error);
      }
    },
    async getListClinic() {
      var url = `${this.$url}/clinic/`;
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };
      try {
        const response = await axios.get(url, config);
        this.dataClinic = await response.data;
        console.log(this.dataClinic);
      } catch (error) {
        console.error(error);
      }
    },
    async getListStatus() {
      var url = `${this.$url}/status/`;
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };
      try {
        const response = await axios.get(url, config);
        this.dataStatus = await response.data;
        console.log(this.dataStatus);
      } catch (error) {
        console.error(error);
      }
    },
    openEditModal() {
      let id = event.srcElement.id;

      this.selectedData = this.dataAntrian.filter((data) => data.id == id);
      this.showModal = true;
    },
    openAddModal() {
      this.selectedData = {};
      this.showModal = true;
    },
    openDeleteModal() {
      let id = event.srcElement.id;
      console.log(id);
      this.selectedData = this.dataAntrian.filter((data) => data.id == id);
      this.showDeleteModal = true;
    },
    deleteData() {
      console.log("delete data successfully");
    },
    async addData(Data) {
      var url = `${this.$url}/appointment/`;
      delete Data.id;
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };

      try {
        const response = await axios.post(url, Data, config);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async editData(Data) {
      var url = `${this.$url}/appointment/${Data.id}`;
      delete Data.id;
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };
      try {
        const response = await axios.post(url, Data, config);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
  },

  created() {
    this.getListAppointment();
    this.getListClinic();
    this.getListStatus();
    this.getListPatient();
    this.getListDoctor();
  },
};
</script>

<template>
  <div
    class="bg-white mx-auto mt-10 w-max h-max text-gray-700 min-h-screen bg-transparent"
  >
    <table
      class="border-collapse min-w-400 table-auto overflow-hidden shadow-md bg-white"
    >
      <thead>
        <tr class="bg-green-500 text-center font-bold">
          <th class="pt-2 pr-10">No RM</th>
          <th class="pt-2 pr-10">Nama Pasien</th>
          <th class="pt-2 pr-10">Nama Dokter</th>
          <!-- <th class="pt-2 pr-10">Poliklinik</th> -->
          <th class="pt-2 pr-10">Spesialis</th>
          <th class="pt-2 pr-10">Hari</th>
          <th class="pt-2 pr-10">Waktu</th>
          <th class="pt-2 pr-10">Tanggal</th>
          <th class="pt-2 pr-10">Estimasi Menunggu</th>
          <th class="pt-2 pr-10">Status</th>
          <th class="pt-2 pr-10">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(data, index) in this.dataAntrian"
          v-bind:key="index"
          class="border"
        >
          <td>{{ data.Patient?.noRM }}</td>
          <td>{{ data.Patient?.name }}</td>
          <td>{{ data.Doctor?.name }}</td>
          <td>{{ data.Clinic?.name }}</td>
          <td>{{ data.Schedule?.Day?.name }}</td>
          <td>{{ data.Schedule?.time.slice(0,5) }}</td>
          <!-- <td>{{ data.Spesialis }}</td> -->
          <td>{{ data.date }}</td>
          <td>{{ data.waitingEstimation }}</td>
          <td>{{ data.Status?.name }}</td>
          <td class="flex items-center justify-center">
            <button
              class="bg-green-400 text-black rounded py-2 px-4 hover:bg-green-600"
              :id="data.id"
              @click="openEditModal()"
            >
              Edit
            </button>

            <Teleport to="body">
              <!-- use the modal component, pass in the prop -->
              <ModalDataAntrian
                :clinic_="dataClinic"
                :status_="dataStatus"
                :doctor_="dataDoctor"
                :patient_="dataPatient"
                @addData="addData"
                @editData="editData"
                :data="selectedData"
                :show="showModal"
                @close="showModal = false"
              >
              </ModalDataAntrian>
            </Teleport>

            <button
              :id="data.NoRM"
              @click="openDeleteModal()"
              class="bg-red-400 text-black rounded py-2 px-4 hover:bg-red-600"
            >
              Delete
            </button>
            <Teleport to="body">
              <!-- use the modal component, pass in the prop -->
              <DeleteModal
                :data="selectedData"
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
    <div class="text-gray-700 w-full flex justify-center">
      <button
        :id="1"
        class="mt-10 py-3 px-5 bg-blue-400 text-black rounded hover:bg-blue-600"
        @click="openAddModal()"
      >
        Tambah Data antrian
      </button>
    </div>
  </div>
</template>

<style>
@import "vue-select/dist/vue-select.css";
</style>

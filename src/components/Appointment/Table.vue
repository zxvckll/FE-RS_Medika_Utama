<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import Modal from "./Modal.vue";
import DeleteModal from "../DeleteModal.vue";
import { mapGetters } from "vuex";

export default {
  props: ["data", "Patient_", "Polyclinic_", "Status_", "Clinic_", "Doctor_","Schedule_"],
  components: { Modal, DeleteModal },
  data() {
    return {
      showModal: false,
      deleteModal: false,
      showDeleteModal: false,
      lol: "lol",
      selectedData: {},
    };
  },
  computed: {
    ...mapGetters("auth", {
      getUserRole: "getUserRole",
      getUserId: "getUserId",
    }),
  },
  methods: {
    openEditModal() {
      let id = event.srcElement.id;

      this.selectedData = this.data.filter((data) => data.id == id);

      this.showModal = true;
    },
    openAddModal() {
      this.selectedData = {};
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    openDeleteModal() {
      let id = event.srcElement.id;
      console.log(id);
      this.selectedData = this.data.filter((data) => data.id == id);
      this.showDeleteModal = true;
    },
    deleteAppointment(id) {
      this.$emit("deleteappointment", id);
      this.showDeleteModal = false;
    },
    editAppointment(newData) {
      console.log(newData);
      this.$emit("editappointment", newData);
      this.closeModal();
    },
    addAppointment(newData) {
      console.log(newData);
      this.$emit("addappointment", newData);
      this.closeModal();
    },
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
          <th class="pt-2 pr-10">Poliklinik</th>
          <th class="pt-2 pr-10">Spesialis</th>
          <th class="pt-2 pr-10">Hari</th>
          <th class="pt-2 pr-10">Waktu</th>
          <th class="pt-2 pr-20">Tanggal</th>
          <th class="pt-2 pr-10">Estimasi</th>
          <th class="pt-2 pr-10">Status</th>
          <th class="pt-2 pr-10" v-if="getUserRole != 'Patient'">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(datta, index) in this.data"
          v-bind:key="index"
          class="border"
        >
          <td>{{ datta.Patient?.noRM }}</td>
          <td>{{ datta.Patient?.name }}</td>
          <td>{{ datta.Doctor?.name.slice(0, 10)+ "..." }}</td>
          <td>{{ datta.Clinic?.Polyclinic.name }}</td>
          <td>{{ datta.Clinic?.name }}</td>
          <td>{{ datta.Schedule?.Day?.name }}</td>
          <td>{{ datta.Schedule?.time.slice(0, 5) }}</td>
          <!-- <td>{{ data.Spesialis }}</td> -->
          <td>{{ datta.date }}</td>
          <td>{{ datta.waitingEstimation }}</td>
          <td>{{ datta.Status?.name }}</td>

          <td  class="flex items-center justify-center" v-if="getUserRole != 'Patient'" >
            <button
              class="bg-green-400 text-black rounded py-2 px-4 hover:bg-green-600"
              :id="datta.id"
              @click="openEditModal()"
            >
              Edit
            </button>
            <Teleport to="#Modal">
              <!-- use the modal component, pass in the prop -->
              <Modal
                :data="!this.selectedData ? 'null' : this.selectedData"
                :show="showModal"
                :Patient_="Patient_"
                :Status_="Status_"
                :Clinic_="Clinic_"
                :Doctor_="Doctor_"
                :Polyclinic_="Polyclinic_"
                :Schedule_="Schedule_"
                @close="closeModal()"
                @editappointment="editAppointment"
                @addappointment="addAppointment"
              >
              </Modal>
            </Teleport>

            <button
              class="bg-red-400 text-black rounded py-2 px-4 hover:bg-red-600"
              :id="datta.id"
              @click="openDeleteModal()"
            >
              Delete
            </button>
            <Teleport to="#Modal">
              <!-- use the modal component, pass in the prop -->
              <DeleteModal
                :data="selectedData"
                :show="showDeleteModal"
                @close="showDeleteModal = false"
                @deletedata="deleteAppointment"
              >
              </DeleteModal>
            </Teleport>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-center my-10" v-if="getUserRole != 'Patient'" >
      <button
        @click="openAddModal()"
        :id="lol"
        class="bg-blue-400 text-black rounded py-2 px-4 hover:bg-blue-700 hover:text-white"
      >
        Add New Data
      </button>
      <Teleport to="#Modal">
        <!-- use the modal component, pass in the prop -->
        <Modal
          :data="!this.selectedData ? 'null' : this.selectedData"
          :show="showAddModal"
          @close="closeModal()"
          @editappointment="editAppointment"
          @addappointment="addAppointment"
        >
        </Modal>
      </Teleport>
    </div>
  </div>
</template>

<style scoped></style>

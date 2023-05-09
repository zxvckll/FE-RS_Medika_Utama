<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import Modal from "./Modal.vue";
import DeleteModal from "../DeleteModal.vue";

export default {
  props: ["data"],
  components: { Modal, DeleteModal  },
  data() {
    return {
      showModal: false,
      deleteModal: false,
      showDeleteModal: false,
      lol: "lol",
      selectedData: {},
    };
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
    deleteSchedule(id) {
      this.$emit("deleteschedule", id);
      this.showDeleteModal = false;
    },
    editSchedule(newData) {
      console.log(newData);
      this.$emit("editschedule", newData);
      this.closeModal();
    },
    addSchedule(newData) {
      console.log(newData);
      this.$emit("addschedule", newData);
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
          <th class="pt-2 pr-10">Doctor Name</th>
          <th class="pt-2 pr-10">Hari</th>
          <th class="pt-2 pr-10">Waktu</th>
          <th class="pt-2 pr-10">action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(datta, index) in this.data"
          v-bind:key="index"
          class="border"
        >
          <td>{{ datta.Doctor?.name ? datta.Doctor.name : "" }}</td>
          <td>{{ datta.Day?.name ? datta.Day.name : "" }}</td>
          <td>{{ datta.time ? datta.time.slice(0,5) : "" }}</td>


          <td class="flex items-center justify-center">
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
                @close="closeModal()"
                @editschedule="editSchedule"
                @addschedule="addSchedule"
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
                @deletedata="deleteSchedule"
              >
              </DeleteModal>
            </Teleport>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-center my-10">
      <button
        @click="openAddModal()"
        :id="lol"
        class="bg-blue-400 text-black rounded py-2 px-4 hover:bg-blue-700 hover:text-white"
      >
        Add New Data
      </button>
      <Teleport to="#Modal">
        <!-- use the modal component, pass in the prop -->
        <AddModal
          :data="!this.selectedData ? 'null' : this.selectedData"
          :show="showAddModal"
          @close="closeModal()"
          @editschedule="editSchedule"
          @addschedule="addSchedule"
        >
        </AddModal>
      </Teleport>
    </div>
  </div>
</template>

<style scoped></style>

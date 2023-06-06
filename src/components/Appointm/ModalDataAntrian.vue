<script>
import eye from "../eye.vue";

import axios from "axios";
import { mapGetters } from "vuex";

export default {
  components: { eye },
  props: ["show", "data", "clinic_", "status_", "doctor_", "patient_"],
  methods: {},
  computed: {
    ...mapGetters("auth", {
      getUserRole: "getUserRole",
      getUserId: "getUserId",
      getAccessToken: "getAccessToken",
    }),
  },
  data() {
    return {
      noRM: null,
      doctor: null,
      patient: null,
      status: null,
      clinic: null,
      schedule: null,
      scheduleByDoctor: null,
      date: null,
      day_: null,
      day: null,
      time_: null,
      time: null,
      waitingEstimation: null,
      status: null,
    };
  },
  methods: {
    filterWaktu(option) {
      this.time_ = this.scheduleByDoctor.filter(
        (data) => data.Day.id === option.Day.id
      );
      this.time = null;
      // console.log(id);
      // console.log(this.time_);
    },
    async getListScheduleByDoctor(id) {
      var url = `${this.$url}/schedule/doctor/${id}`;
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

    submitForm() {
      var Id = 0;
      if (this.data[0]) {
        Id = this.data[0].id;
      }

      const Data = {
        id: Id,
        noRM: this.noRM,
        DoctorId: this.doctor,
        PatientId: this.patient,
        ClinicId: this.clinic,
        date: this.date,
        time: this.time,
        waitingEstimation: this.waitingEstimation,
        StatusId: this.status,
      };
      if (this.data[0]) {
        this.$emit("editData", Data);
      } else {
        this.$emit("addData", Data);
      }
    },
  },

  watch: {
    show(newValue, oldValue) {
      if (newValue == true) {
        if (this.data[0]) {
          this.getListScheduleByDoctor(this.data[0]?.Doctor?.id);

          this.noRM = this.data[0]?.Patient?.noRM
            ? this.data[0]?.Patient?.noRM
            : "";

          this.doctor = this.data[0]?.Doctor
            ? this.doctor_.find((data) => data.id === this.data[0]?.Doctor?.id)
            : "";

          this.patient = this.data[0]?.Patient?.id
            ? this.patient_.find(
                (data) => data.id === this.data[0]?.Patient?.id
              )
            : "";

          this.clinic = this.data[0]?.Clinic?.id
            ? this.clinic_.find((data) => data.id === this.data[0]?.Clinic?.id)
            : "";

          this.date = this.data[0]?.date ? this.data[0]?.date : "";
          this.time = this.data[0]?.time ? this.data[0]?.time : "";
          this.waitingEstimation = this.data[0]?.waitingEstimation
            ? this.data[0]?.waitingEstimation
            : "";
          this.status = this.data[0]?.Status?.name
            ? this.status_.find((data) => data.id === this.data[0]?.Status?.id)
            : "";
        }
      }
      if (newValue == false) {
        this.doctor = "";
        this.patient = "";
        this.clinic = "";
        this.date = "";
        this.time = "";
        this.waitingEstimation = "";
        this.status = "";
      }
    },
  },
  mounted() {},
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
                {{ !this.data[0] ? "Tambah Data " : "Edit Data " }}
                <!-- {{ this.data[0] }} -->
              </h2>
              <img
                src="https://www.rspkt.com/sites/rspkt.com/files/rsmup-landscape.png"
                alt=""
                class="h-10 mx-auto mb-10 mt-5"
              />
            </header>
            <!-- <form method="POST" action="/products" enctype="multipart/form-data"> -->
            <div class="mb-6">
              <label for="NoRM" class="inline-block text-lg mb-2">No RM</label>
              <input
                type="text"
                class="border border-gray-200 rounded p-2 w-full"
                name="NoRM"
                v-model="this.noRM"
              />
            </div>

            <!-- <div class="mb-6">
              <label for="PasienID" class="inline-block text-lg mb-2"
                >Pasien ID</label
              >
              <input
                type="text"
                class="border border-gray-200 rounded p-2 w-full"
                name="PasienID"
                v-model="this.patient"
              />
            </div> -->

            <!-- <div class="mb-6">
              <label for="Patient" class="inline-block text-lg mb-2"
                >Pasien
              </label>
              <div class="flex">
                <v-select
                  class="border border-gray-200 rounded p-2 w-full"
                  :reduce="(patient) => patient.id"
                  v-model="patient"
                  label="name"
                  :options="this.patient_"
                />
                <eye :url="'/Patient'"> </eye>
              </div>
            </div> -->

            <div class="mb-6">
              <label for="Patient" class="inline-block text-lg mb-2"
                >Pasien
              </label>
              <div class="flex">
                <multiselect
                  v-model="patient"
                  deselect-label="Please enter to deselect"
                  track-by="id"
                  label="name"
                  placeholder="Select one"
                  :options="this.patient_"
                >
                </multiselect>
                <eye :url="'/Patient'"> </eye>
              </div>
            </div>

            <div class="mb-6">
              <label for="Status" class="inline-block text-lg mb-2"
                >Spesialis
              </label>
              <div class="flex">
                <multiselect
                  v-model="clinic"
                  deselect-label="Please enter to deselect"
                  track-by="id"
                  label="name"
                  placeholder="Select one"
                  :options="this.clinic_"
                >
                </multiselect>
                <eye :url="'/Status'"> </eye>
              </div>
            </div>

            <div class="mb-6">
              <label for="Doctor" class="inline-block text-lg mb-2"
                >Dokter
              </label>
              <div class="flex">
                <multiselect
                  v-model="doctor"
                  deselect-label="Please enter to deselect"
                  track-by="id"
                  label="name"
                  placeholder="Select one"
                  :options="this.doctor_"
                >
                </multiselect>
                <eye :url="'/Doctor'"> </eye>
              </div>
            </div>

            <!-- <div class="mb-6">
              <label for="Spesialis" class="inline-block text-lg mb-2"
                >Spesialis</label
              >
              <input
                type="text"
                class="border border-gray-200 rounded p-2 w-full"
                name="Spesialis"
                v-model="this.clinic"
              />
            </div> -->
            <!-- <div>
              <select
                name="Status"
                class="border border-gray-200 rounded p-2 w-full"
                v-model="clinic"
              >
                <option value="">~ Select One ~</option>
                <option
                  v-for="(clinic, index) in this.clinic_"
                  v-bind:key="index"
                  :value="clinic.id"
                >
                  {{ clinic.name }}
                </option>
              </select>
            </div> -->

            <div class="mb-6">
              <label for="TanggalAntrian" class="inline-block text-lg mb-2"
                >Tanggal Antrian</label
              >
              <input
                type="text"
                class="border border-gray-200 rounded p-2 w-full"
                name="TanggalAntrian"
                v-model="this.date"
              />
            </div>
            <div class="mb-6">
              <label for="Day" class="inline-block text-lg mb-2">Hari </label>1
              <div class="flex" v-if="scheduleByDoctor != null">
                <multiselect
                  :disabled="!scheduleByDoctor ? true : false"
                  v-model="day"
                  @select="filterWaktu"
                  deselect-label="Please enter to deselect"
                  track-by="id"
                  :custom-label="
                    (day_) => {
                      return day_.Day.name;
                    }
                  "
                  placeholder="Select one"
                  :options="day_"
                >
                </multiselect>
                <eye :url="'/Time'"> </eye>
              </div>
            </div>

            <div class="mb-6">
              <label for="Time" class="inline-block text-lg mb-2">Waktu </label>
              <div class="flex" v-if="scheduleByDoctor != null">
                <multiselect
                  :disabled="!scheduleByDoctor ? true : false"
                  v-model="time"
                  deselect-label="Please enter to deselect"
                  track-by="id"
                  label="time"
                  placeholder="Select one"
                  :options="time_"
                >
                </multiselect>
                <eye :url="'/Time'"> </eye>
              </div>
            </div>

            <div class="mb-6">
              <label for="TanggalAntrian" class="inline-block text-lg mb-2"
                >Estimasi Menunggu</label
              >
              <input
                type="text"
                class="border border-gray-200 rounded p-2 w-full"
                name="TanggalAntrian"
                v-model="this.waitingEstimation"
              />
            </div>

            <div class="mb-6">
              <label for="Status" class="inline-block text-lg mb-2"
                >Status
              </label>
              <div class="flex">
                <multiselect
                  v-model="status"
                  deselect-label="Please enter to deselect"
                  track-by="id"
                  label="name"
                  placeholder="Select one"
                  :options="this.status_"
                >
                </multiselect>
                <eye :url="'/Status'"> </eye>
              </div>
            </div>

            <div class="mb-6">
              <button
                class="bg-blue-400 text-black rounded py-2 px-4 hover:bg-blue-600"
                @click.prevent="submitForm()"
              >
                {{ !this.data[0] ? "Tambah Data " : "Edit Data " }}
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

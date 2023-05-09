<script>
import eye from "../components/eye.vue";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  props: ["show"],
  components: { eye },
  computed: {
    ...mapGetters("auth", {
      getAccessToken: "getAccessToken",
      getUserId: "getUserId",
    }),
  },
  data() {
    return {
      date: "",
      waitingEstimation: "",
      Patient: "",
      Clinic: "",
      Polyclinic: "",
      ClinicOption: "",
      DoctorOption: "",
      Doctor: "",
      Status: "",
      Schedule: "",
      ScheduleOption: "",
      time: "",
      day: "",
      dayAppointment: "",
      Patient_: "",
      Doctor_: "",
      Clinic_: "",
      Status_: "",
      Polyclinic_: "",
      Schedule_: "",
      data: "",
      dayOfTheWeek: [1, 2, 3, 4, 5, 6, 7],
    };
  },

  methods: {
    async getListPolyclinic() {
      var url = `http://localhost:5000/polyclinic`;
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

    async getListSchedule() {
      var url = `http://localhost:5000/schedule`;
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };
      try {
        const response = await axios.get(url, config);
        this.Schedule_ = await response.data;
        console.log(this.Schedule_);
      } catch (error) {
        console.error(error);
      }
    },
    async getListDoctor() {
      var url = `http://localhost:5000/doctor/`;
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

    async getListClinic() {
      var url = `http://localhost:5000/clinic/`;
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
    async getListStatus() {
      var url = `http://localhost:5000/status/`;
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };
      try {
        const response = await axios.get(url, config);
        this.Status_ = await response.data;
        console.log(this.Status_);
      } catch (error) {
        console.error(error);
      }
    },
    async getListPatient() {
      var url = `http://localhost:5000/patient/`;
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };
      try {
        const response = await axios.get(url, config);
        this.Patient_ = await response.data;
        console.log(this.Patient_);
      } catch (error) {
        console.error(error);
      }
    },

    selectDate(value) {
      const dayValue = value.getDay();
      this.dayAppointment = dayValue;

      this.ScheduleOption = this.Schedule_.filter(
        (data) => data.DoctorId === this.Doctor.id
      );

      this.ScheduleOption = this.ScheduleOption.filter((data) => {
        let day = data.DayId;
        if (day == 7) {
          day = 0;
        }
        return day === dayValue;
      });
      this.time = "";
    },
    selectPolyclinic(value) {
      this.ClinicOption = this.Clinic_.filter(
        (data) => data.PolyclinicId === value.id
      );
      this.Clinic = "";
      this.Doctor = "";
    },
    selectClinic(value) {
      this.DoctorOption = this.Doctor_.filter(
        (data) => data.ClinicId === value.id
      );
      this.Doctor = "";
    },
    selectDoctor(value) {
      this.ScheduleOption = this.Schedule_.filter(
        (data) => data.DoctorId === value.id
      );
      this.Schedule = "";
      this.day = this.ScheduleOption.map((obj) => obj.Day.id);
      this.day = [...new Set(this.day)];
      this.day = this.dayOfTheWeek.filter(
        (element) => !this.day.includes(element)
      );
      this.day = this.day.map((obj) => {
        if (obj == 7) {
          obj = 0;
        }
        return obj;
      });
    },
    async addAppointment(newData) {
      delete newData.id;
      var url = "http://localhost:5000/appointment";
      var data = {
        date: newData.date,
        waitingEstimation: newData.waitingEstimation,
        ScheduleId: newData.ScheduleId.id,
        DoctorId: newData.DoctorId.id,
        PatientId: newData.PatientId.id,
        ClinicId: newData.ClinicId.id,
        StatusId: newData.StatusId.id,
      };
      var config = {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`,
        },
      };
      try {
        console.log(newData);

        const response = await axios.post(url, data, config);
        console.log(response);

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
      if (this.dayAppointment == 0) {
        this.dayAppointment = 7;
      }
      var newData = {
        id: Id,
        date: this.date,
        waitingEstimation: this.waitingEstimation,
        ScheduleId:
          !!this.dayAppointment && !!this.time
            ? this.Schedule_.find((data) => {
                return (
                  data.DayId == this.dayAppointment &&
                  data.time == this.time.time
                );
              })
            : "",
        DoctorId: this.Doctor,
        PatientId: this.Patient,
        ClinicId: this.Clinic,
        StatusId: 5,
      };
      this.addAppointment(newData);
      this.$emit("close");
    },
  },
  mounted() {
    this.getListPatient();
    this.getListStatus();
    this.getListClinic();
    this.getListDoctor();
    this.getListPolyclinic();
    this.getListSchedule();
  },
  watch: {
    show(newValue, oldValue) {
      if (newValue == true) {
        
        this.Patient = this.getUserId
          ? this.Patient_.find((data) => data.UserId === this.getUserId)
          : "";
      }
      if (newValue == false) {
        this.date = "";
        this.waitingEstimation = "";
        this.Schedule = "";
        this.Doctor = "";
        this.Patient = "";
        this.Clinic = "";
        this.Status = "";
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
                src="https://www.rspkt.com/sites/rspkt.com/files/rsmup-landscape.png"
                alt=""
                class="h-10 mx-auto mb-10 mt-5"
              />
            </header>
            <!-- <form method="POST" action="/products" enctype="multipart/form-data"> -->
            <div class="mb-6">
              <label for="Patient" class="inline-block text-lg mb-2"
                >Patient
              </label>
              <div class="flex">
                <multiselect
                  v-model="Patient"
                  deselect-label="Please enter to deselect"
                  track-by="id"
                  label="name"
                  placeholder="Select one"
                  :options="this.Patient_"
                  disabled
                >
                </multiselect>
                <eye :url="'/Patient'"> </eye>
              </div>
            </div>

            <div v-if="this.Patient">
              <div class="mb-2 mx-1">
                <label for="date" class="inline-block text-sm mb-1"
                  >No RM</label
                >
                <input
                  readonly
                  type="text"
                  class="border border-gray-200 text-sm rounded p-1 w-full"
                  v-model="this.Patient.noRM"
                />
              </div>

              <div class="mb-2 mx-1">
                <label for="date" class="inline-block text-sm mb-1"
                  >Nama Pasien</label
                >
                <input
                  readonly
                  type="text"
                  class="border border-gray-200 text-sm rounded p-1 w-full"
                  v-model="this.Patient.name"
                />
              </div>
            </div>
            <div class="mb-6">
              <label for="Polyclinic" class="inline-block text-lg mb-2"
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
                  @select="selectPolyclinic"
                >
                </multiselect>
                <eye :url="'/Polyclinic'"> </eye>
              </div>
            </div>
            <div class="mb-6">
              <label for="Clinic" class="inline-block text-lg mb-2"
                >Clinic
              </label>
              <div class="flex">
                <multiselect
                  v-model="Clinic"
                  deselect-label="Please enter to deselect"
                  track-by="id"
                  label="name"
                  placeholder="Select one"
                  :options="this.ClinicOption"
                  @select="selectClinic"
                >
                </multiselect>
                <eye :url="'/Clinic'"> </eye>
              </div>
            </div>

            <div class="mb-6">
              <label for="Doctor" class="inline-block text-lg mb-2"
                >Doctor
              </label>
              <div class="flex">
                <multiselect
                  v-model="Doctor"
                  deselect-label="Please enter to deselect"
                  track-by="id"
                  label="name"
                  placeholder="Select one"
                  :options="this.DoctorOption"
                  @select="selectDoctor"
                >
                </multiselect>
                <eye :url="'/Doctor'"> </eye>
              </div>
            </div>

            <div class="mb-6">
              <label for="date" class="inline-block text-lg mb-2">Date</label>
              <VueDatePicker
                v-model="this.date"
                :disabled-week-days="this.day"
                :enable-time-picker="false"
                @update:model-value="selectDate"
              />
            </div>

            <div class="mb-6">
              <label for="Time" class="inline-block text-lg mb-2">Time </label>
              <div class="flex">
                <multiselect
                  v-model="time"
                  deselect-label="Please enter to deselect"
                  track-by="id"
                  label="time"
                  placeholder="Select one"
                  :options="this.ScheduleOption"
                >
                </multiselect>
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

<script>
import eye from "../eye.vue";
import { mapGetters } from "vuex";

export default {
  props: [
    "show",
    "data",
    "Patient_",
    "Doctor_",
    "Clinic_",
    "Status_",
    "Polyclinic_",
    "Schedule_",
  ],
  components: { eye },
  computed: {
    ...mapGetters("auth", {
      getAccessToken: "getAccessToken",
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
      dayOfTheWeek: [1, 2, 3, 4, 5, 6, 7],
    };
  },

  methods: {
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
        StatusId: this.Status,
      };

      if (!this.data[0]) {
        console.log(newData);

        this.$emit("addappointment", newData);
      } else {
        console.log(this.dayAppointment);
        console.log(this.time.time.slice(0, 5));
        console.log(newData);
        this.$emit("editappointment", newData);
      }
    },
  },
  created() {},
  watch: {
    show(newValue, oldValue) {
      if (newValue == true) {
        if (this.data[0]) {
          this.date = this.data[0]?.date ? this.data[0]?.date : "";
          this.waitingEstimation = this.data[0]?.waitingEstimation
            ? this.data[0]?.waitingEstimation
            : "";

          this.Patient = this.data[0]?.PatientId
            ? this.Patient_.find((data) => data.id === this.data[0]?.PatientId)
            : "";

          this.Status = this.data[0]?.StatusId
            ? this.Status_.find((data) => data.id === this.data[0]?.StatusId)
            : "";

          this.Clinic = this.data[0]?.ClinicId
            ? this.Clinic_.find((data) => data.id === this.data[0]?.ClinicId)
            : "";

          this.Doctor = this.data[0]?.DoctorId
            ? this.Doctor_.find((data) => data.id === this.data[0]?.DoctorId)
            : "";

          this.Polyclinic = this.data[0]?.ClinicId
            ? this.Polyclinic_.find(
                (data) => data.id === this.data[0]?.Clinic?.PolyclinicId
              )
            : "";
          this.ClinicOption = this.Clinic_.filter(
            (data) => data.PolyclinicId === this.data[0]?.Clinic?.PolyclinicId
          );

          this.DoctorOption = this.Doctor_.filter(
            (data) => data.ClinicId === this.data[0]?.ClinicId
          );

          this.ScheduleOption = this.Schedule_.filter(
            (data) => data.DoctorId === this.data[0]?.DoctorId
          );
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

          this.time = this.data[0]?.ScheduleId
            ? this.Schedule_.find(
                (data) => data.id === this.data[0]?.ScheduleId
              )
            : "";

          this.dayAppointment = this.data[0]?.date
            ? new Date(this.data[0]?.date)
            : "";

          this.ScheduleOption = this.ScheduleOption.filter((data) => {
            let day = data.DayId;
            if (day == 7) {
              day = 0;
            }
            return day === this.dayAppointment.getDay();
          });

          this.dayAppointment = this.dayAppointment.getDay();
          console.log(this.dayAppointment);
          console.log(this.ScheduleOption);
        }
      }
      if (newValue == false) {
        this.Clinic = "";
        this.date = "";
        this.waitingEstimation = "";
        this.Patient = "";
        this.Polyclinic = "";
        this.Status = "";
        this.Schedule = "";
        this.Doctor = "";
        this.time = "";
        this.day = "";
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
              <label for="waitingEstimation" class="inline-block text-lg mb-2"
                >Estimation</label
              >
              <input
                type="text"
                class="border border-gray-200 rounded p-2 w-full"
                name="waitingEstimation"
                v-model="this.waitingEstimation"
              />
            </div>

            <div class="mb-6">
              <label for="Time" class="inline-block text-lg mb-2">Status </label>
              <div class="flex">
                <multiselect
                  v-model="Status"
                  deselect-label="Please enter to deselect"
                  track-by="id"
                  label="name"
                  placeholder="Select one"
                  :options="this.Status_"
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

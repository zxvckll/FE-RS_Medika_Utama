import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/index.js";

const Doctor = () => import("@/page/Doctor.vue");
const Admin = () => import("@/page/Admin.vue");
const Polyclinic = () => import("@/page/Polyclinic.vue");
const Schedule = () => import("@/page/Schedule.vue");
const Day = () => import("@/page/Day.vue");
const Status = () => import("@/page/Status.vue");
const User = () => import("@/page/User.vue");
const Clinic = () => import("@/page/Clinic.vue");
const Patient = () => import("@/page/Patient.vue");
const DataAntrian = () => import("@/page/DataAntrian.vue");
const Login = () => import("@/page/Login.vue");
const Signup = () => import("@/page/Signup.vue");
// const PendaftaranPasien = () => import("@/page/PendaftaranPasien.vue");
const Profile = () => import("@/page/Profile.vue");
const JadwalPraktek = () => import("@/page/JadwalPraktek.vue");
const Appointment = () => import("@/page/Appointment.vue");

// const CardProfileDokter = () => import("@/page/CardProfileDokter.vue");
// const Doctor = () => import("@/page/Doctor.vue");

// const Sidebar = () => import('@/page/Sidebar.vue');

// import Login from "@/page/Login.vue";
// import Signin from "@/page/Signin.vue";
// import PendaftaranPasien from "@/page/PendaftaranPasien.vue";
// import Profile from "@/page/Profile.vue";
// import JadwalPraktek from "@/page/JadwalPraktek.vue";

const routes = [
  { path: "/DataAntrian", name: "DataAntrian", component: DataAntrian },
  { path: "/Login", name: "Login", component: Login },
  { path: "/Signup", name: "Signup", component: Signup },
  { path: "/Profile", name: "Profile", component: Profile },
  { path: "/Doctor", name: "Doctor", component: Doctor },
  { path: "/Admin", name: "Admin", component: Admin },
  { path: "/Patient", name: "Patient", component: Patient },
  { path: "/Polyclinic", name: "Polyclinic", component: Polyclinic },
  { path: "/User", name: "User", component: User },
  { path: "/Clinic", name: "Clinic", component: Clinic },
  { path: "/Status", name: "Status", component: Status },
  { path: "/Day", name: "Day", component: Day },
  { path: "/Schedule", name: "Schedule", component: Schedule },
  { path: "/Appointment", name: "Appointment", component: Appointment },

  { path: "/Poliklinik/:id", name: "JadwalPraktek", component: JadwalPraktek },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (store.state.auth.userRole != null && to.meta.needsAuth) {
    next("/login");
  } else {
    next();
  }
});

export default router;

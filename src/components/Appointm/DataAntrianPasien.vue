<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
export default {
    
  data() {
    return {
        DataAntrian: [
        {
          NamaDokter: "Dr.Anita",
          Poliklinik: "Gigi",
          Spesialis: "Gigi",
          Tanggal: "10/11/2022",
          Waktu: "08.00",
          EstimasiMenunggu: "10 menit",
          Status: "Pending",
        },
        {
          NamaDokter: "Dr.Nico",
          Poliklinik: "Mulut",
          Spesialis: "Bedah",
          Tanggal: "10/12/2022",
          Waktu: "15.00",
          EstimasiMenunggu: "5 menit",
          Status: "Diteima",
        },
        {
          NamaDokter: "Dr.Anita",
          Poliklinik: "THT",
          Spesialis: "THT",
          Tanggal: "10/11/2022",
          Waktu: "18.00",
          EstimasiMenunggu: "10 menit",
          Status: "Diteima",
        },
      ],
    };
  },
};
</script>

<template>
  <div class="bg-white mx-auto mt-10 w-max h-max text-gray-700 min-h-screen bg-transparent">
    <table
      class="border-collapse min-w-400 table-auto overflow-hidden shadow-md bg-white"
    >
      <thead>
        <tr class="bg-green-500 text-center font-bold">
          <th class="pt-2 pr-10">Nama Dokter</th>
          <th class="pt-2 pr-10">Poliklinik</th>
          <th class="pt-2 pr-10">Spesialis</th>
          <th class="pt-2 pr-10">Tanggal</th>
          <th class="pt-2 pr-10">Waktu</th>
          <th class="pt-2 pr-10">Estimasi Menunggu</th>
          <th class="pt-2 pr-10">Status</th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in this.DataAntrian "
                  v-bind:key="index"
                  class="border-b">
          <td>{{ data.NamaDokter }}</td>
          <td>{{ data.Poliklinik }}</td>
          <td>{{ data.Spesialis }}</td>
          <td>{{ data.Tanggal }}</td>
          <td>{{ data.Waktu }}</td>
          <td>{{ data.EstimasiMenunggu }}</td>
          <td>{{ data.Status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>

import axios from "axios";
const state = () => ({
  userRole: "",
  userId: "",
  accessToken: "",
});

const getters = {
  getUserRole(state) {
    return state.userRole;
  },
  getUserId(state) {
    return state.userId;
  },
  getAccessToken(state) {
    return state.accessToken;
  },
};

const actions = {
  async login({ commit }, payload) {
    const response = await axios
      .post("http://localhost:5000/login", payload)
      .catch((err) => {
        console.log(err);
      });

    if (response && response.data) {
      commit("setAccessToken", response.data.accessToken);
      commit("setUserRole", response.data.userRole);
      commit("setUserId", response.data.userId);
    } else {
        commit("setAccessToken", "");
        commit("setUserRole", "");
        commit("setUserId", "");
    }
  },
  logout({ commit }) {
    commit("setUserRole", '');
    commit("setUserId", '');
    commit("setAccessToken", '');
  },
};

const mutations = {
  setAccessToken(state, value) {
    state.accessToken = value
  },
  setUserRole(state, value) {
    state.userRole = value;
  },
  setUserId(state, value) {
    state.userId = value;
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

import axios from "axios";

const state = {
  car: [],
};
const getters = {
  addCar: (state) => {
    return state.user;
  },
};
const mutations = {
  ADD_CAR(state, user) {
    state.user = user;
  },
};
const actions = {
  addCar({ commit }, data) {
    let carData = {
      name: data.carName,
      details: data.carDetails,
      image: data.carImgURL,
      price: data.carPrice,
    };
    return axios
      .post("https://testapi.io/api/dartya/resource/cardata", carData)
      .then((res) => {
        if (res && res.data) {
          {
            commit("ADD_CAR", carData);
            return "success";
          }
        } else {
          return "Oops, car data is not added please try again";
        }
      })
      .catch(() => {
        return "Oops, car data is not added please try again";
      });
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

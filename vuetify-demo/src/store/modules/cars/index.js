import axios from "axios";

const state = {
  cars: [],
  carData: {},
  selectedCardData: {
    carId: "",
    carTitle: "",
    cardetails: "",
    carPrice: "",
    carImage: "",
  },
};

const getters = {
  getCars: (state) => {
    return state.cars;
  },
  updateCar: (state) => {
    return state.car;
  },
  getSelectedCarData(state) {
    return state.selectedCardData;
  },
};

const mutations = {
  SET_CARS(state, cars) {
    state.cars = cars;
  },
  UPDATE_CAR(state, car) {
    state.car = car;
  },
  SET_CAR(state, car) {
    state.carData = car;
  },
  setSelectedCarData(state, data) {
    state.selectedCardData = data;
  },
};

const actions = {
  // first param is context object
  getCarsData({ commit }) {
    return axios
      .get(`https://testapi.io/api/dartya/resource/cardata`)
      .then((res) => {
        if (res && res.data && res.data.data) {
          commit("SET_CARS", res.data.data);
          return "success";
        } else {
          return "Oops, data not found";
        }
      })
      .catch(() => {
        return "Oops, data not found";
      });
  },
  updateCar({ commit }, data) {
    let cData = {
      name: data.carName,
      details: data.carDetails,
      image: data.carImgURL,
      price: data.carPrice,
    };
    return axios
      .put(
        `https://testapi.io/api/dartya/resource/cardata/${data.carId}`,
        cData
      )
      .then((res) => {
        if (res && res.data) {
          {
            commit("UPDATE_CAR", cData);
            return "sucess";
          }
        } else {
          return "No data found!";
        }
      })
      .catch(() => {
        return "Oops, data not found";
      });
  },
  getCarData({ commit }, id) {
    return axios
      .get(`https://testapi.io/api/dartya/resource/cardata/${id}`)
      .then((res) => {
        if (res && res.data) {
          commit("SET_CAR", res.data);
          return "success";
        } else {
          return "Oops, data not found";
        }
      })
      .catch(() => {
        return "Oops, data not found";
      });
  },

  deleteCarData(_, id) {
    return axios
      .delete(`https://testapi.io/api/dartya/resource/cardata/${id}`)
      .then((res) => {
        if (res) {
          return "success";
        } else {
          return "Oops, data deletation unsuccessful";
        }
      })
      .catch(() => {
        return "Oops, data deletation unsuccessful";
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

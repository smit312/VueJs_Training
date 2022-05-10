import axios from "axios";

const state = {
  cars: [],
  carData: "",
};

const getters = {
  getCars: (state) => {
    return state.cars;
  },
  updateCar: (state) => {
    return state.cars;
  },
};

const mutations = {
  SET_CARS(state, cars) {
    state.cars = cars;
  },

  SET_CAR(state, cars) {
    state.carData = cars;
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
            commit("SET_CARS", carData);
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
            commit("SET_CARS", cData);
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

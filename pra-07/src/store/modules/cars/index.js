import axios from "axios";
// import users from "../users";

// local state
const state = {
  cars: [],
  carData: "",
};

const getters = {
  getCars: (state) => {
    return state.cars;
  },
  updateCar: (state) => {
    return state.car;
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
          return "Oops,Something went wrong!";
        }
      })
      .catch(() => {
        return "Oops,Something went wrong!";
      });
  },
  updateCar({ commit }, data) {
    let cData = {
      name: data.carName,
      details: data.carDetails,
      image: data.carImgURL,
      price: data.carPrice,
    };
    console.log("Update car data called via action");
    return axios
      .put(
        `https://testapi.io/api/dartya/resource/cardata/${data.carId}`,
        cData
      )
      .then((res) => {
        console.log(res);
        console.log(data);
        if (res && res.data) {
          {
            commit("UPDATE_CAR", cData);
            return "success";
          }
        } else {
          return "Oops,Something went wrong!";
        }
      })
      .catch(() => {
        return "Oops,Something went wrong!";
      });
  },
  getCarData({ commit }, id) {
    console.log("get car data api called form the action");
    console.log("action id is :", id);
    return axios
      .get(`https://testapi.io/api/dartya/resource/cardata/${id}`)
      .then((res) => {
        if (res && res.data) {
          commit("SET_CAR", res.data);
          return "success";
        } else {
          return "Oops,Something went wrong!";
        }
      })
      .catch(() => {
        return "Oops,Something went wrong!";
      });
  },
  deleteCarData(_, id) {
    console.log("delete car data api called form the action");
    console.log("action id is :", id);
    return axios
      .delete(`https://testapi.io/api/dartya/resource/cardata/${id}`)
      .then((res) => {
        console.log(res);
        if (res) {
          return "success";
        } else {
          return "Oops,Something went wrong!";
        }
      })
      .catch(() => {
        return "Oops,Something went wrong!";
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

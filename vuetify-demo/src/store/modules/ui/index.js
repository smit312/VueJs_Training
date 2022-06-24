const state = {
  FormDialog: {
    type: "add",
    isDialogOpen: false,
  },
};

const getters = {
  getisDialogOpen(state) {
    return state.FormDialog.isDialogOpen;
  },
  getDialogType(state) {
    return state.FormDialog.type;
  },
};

const mutations = {
  openDialog(state, payload) {
    state.FormDialog.type = payload.type;
    state.FormDialog.isDialogOpen = true;
  },
  closeDialog(state) {
    state.FormDialog.isDialogOpen = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};

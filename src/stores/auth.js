const authStore = {
  namespaced: true,
  state: {
    email: null,
    onepw: null
  },
  getters: {
    email: state => state.email,
    onepw: state => state.onepw,
    isValid: state => !!state.email && !!state.onepw
  },
  mutations: {
    setState(state, params) {
      state.email = params.email;
      state.onepw = params.onepw;
    },
    rmState(state) {
      state.email = null;
      state.onepw = null;
    }
  },
  actions: {
    
  }
}

export default authStore;  
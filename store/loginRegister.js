export const state = () => ({
  showLogin: true,
})

export const mutations = {
  toggleShowLogin(state) {
    state.showLogin = !state.showLogin
  },
}

export const getters = {
  getShowLoginState(state) {
    return state.showLogin
  },
}

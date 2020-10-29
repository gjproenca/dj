export const state = () => ({
  showSignIn: true,
})

export const mutations = {
  toggleShowSignIn(state) {
    state.showSignIn = !state.showSignIn
  },
}

export const getters = {
  getShowSignInState(state) {
    return state.showSignIn
  },
}

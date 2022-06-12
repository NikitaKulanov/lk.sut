import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
  },
  getters: {
    getUser(state) {
      if(state.user === null){
        let user = JSON.parse(localStorage.getItem('user'))
        if(user){
          state.user = user
          return user
        } else {
          return null
        }
      } else {
        return state.user
      }
    },
  },
  mutations: {
    setUser(state, user) {
      if(user){
        user.avatar = process.env.VUE_APP_API_SERVER_NEW + '/storage/img/avatar/' + user.avatar
        localStorage.setItem('user', JSON.stringify(user))
      } else {
        localStorage.removeItem('user')
      }
      state.user = user
    }
  },
  actions: {
  },
  modules: {
  }
})
// mounted() {
//  console.log(this.$store.getters.getPath)
//  this.$store.commit('setUser', response.data)
// },

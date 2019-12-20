import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // <name>: <type>,
  },

  getters: {
    // <name>: state => {
    //   return some value
    // }
  },

  mutations: {
    // async <NAME>(state, <otherParams>) {
    //   do stuff
    //   state.<name>.push(<value>)
    // }
  },
  actions: {
    // name(context, <otherParams>) {
    //   context.commit('<MUTATION>', <params>)
    // }
  }
});

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  methods: {
    //pass
  },
  beforeMount() {
    // try { Api.headers['Authorization'] = '';}
    // catch { };
    // Get inital.
  },
  created() {
    // Prevent blank screen in Electron builds
    this.$router.push("/");
  },
  render: h => h(App)
}).$mount("#app");

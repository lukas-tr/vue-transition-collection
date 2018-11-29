import Vue, {CreateElement} from "vue";
import App from "./App.vue";
import router from "./router";
import VueHighlightJS from "vue-highlightjs";
import "highlight.js/styles/vs2015.css";
import "animate.css/animate.min.css";

import VueTransitionCollection from "../../.";

Vue.config.productionTip = false;

Vue.use(VueTransitionCollection);
Vue.use(VueHighlightJS);

new Vue({
  router,
  render: (h : CreateElement) => h(App)
}).$mount("#app");

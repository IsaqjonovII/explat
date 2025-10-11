import "./assets/styles/main.css";
import { createApp, h } from "vue";
import definePlugins from "@/plugins";

import App from "./App.vue";

export const app = createApp({
  render: () => h(App),
});

definePlugins(app);

app.mount("#app");

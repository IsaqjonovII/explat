import "./assets/styles/main.css";
import { createApp, h } from "vue";
import * as Sentry from "@sentry/vue";
import definePlugins from "@/plugins";

import App from "./App.vue";
import router from "@/router";

export const app = createApp({
  render: () => h(App),
});

if (import.meta.env.VITE_APP_MODE === "production") {
  (async () => {
    Sentry.init({
      app,
      // TODO: UPDATE THIS, PLZ
      dsn: "https://b74af7be1026225b3277accc766ed9b1@o4508598185820160.ingest.de.sentry.io/4508598187393104",
      integrations: [
        Sentry.browserTracingIntegration({ router }),
        Sentry.replayIntegration(),
      ],
      // Tracing
      tracesSampleRate: 1.0,
      tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
      // Session Replay
      replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
      replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    });
  })();
}

definePlugins(app);

app.mount("#app");

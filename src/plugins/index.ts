import type { App } from "vue";
import router from "@/router";
import i18n from "@/plugins/i18n";
import { createPinia } from "pinia";

import { VueQueryPlugin } from "@tanstack/vue-query";
import Maska from "maska";
import * as Sentry from "@sentry/vue";
import QueryClientService from "@/services/query-client";

export default function definePlugins(app: App) {
  if (import.meta.env["VITE_APP_MODE"] === "production") {
    const sentryDNS = import.meta.env["VITE_APP_SENTRY_DNS"];

    Sentry.init({
      app,
      dsn: sentryDNS,
      integrations: [Sentry.browserTracingIntegration({ router })],
      tracesSampleRate: 1.0, // Capture 100% of the transactions
      tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
    });
  }

  const queryClient = QueryClientService.getInstance().getQueryClient();

  app.use(createPinia());
  app.use(i18n);
  app.use(VueQueryPlugin, { queryClient });
  app.use(Maska);
  app.use(router);
}

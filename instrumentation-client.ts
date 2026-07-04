import { getWebInstrumentations, initializeFaro } from "@grafana/faro-web-sdk";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";

const faroUrl = process.env.NEXT_PUBLIC_GRAFANA_FARO_URL;
const appName = process.env.NEXT_PUBLIC_GRAFANA_APP_NAME ?? "FinOpia UI";
const appVersion = process.env.NEXT_PUBLIC_GRAFANA_APP_VERSION ?? "1.0.0";
const environment = process.env.NEXT_PUBLIC_GRAFANA_ENVIRONMENT ?? process.env.NODE_ENV ?? "production";
const sessionSamplingRate = Number(process.env.NEXT_PUBLIC_GRAFANA_SESSION_SAMPLING_RATE ?? "1");
const enabled = process.env.NEXT_PUBLIC_GRAFANA_FARO_ENABLED !== "false";

if (enabled && faroUrl) {
  initializeFaro({
    url: faroUrl,
    app: {
      name: appName,
      version: appVersion,
      environment,
    },
    sessionTracking: {
      samplingRate: Number.isFinite(sessionSamplingRate) ? sessionSamplingRate : 1,
      persistent: true,
    },
    instrumentations: [
      ...getWebInstrumentations(),
      new TracingInstrumentation(),
    ],
  });
}

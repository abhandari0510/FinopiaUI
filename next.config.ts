import type { NextConfig } from "next";
import FaroSourceMapUploaderPlugin from "@grafana/faro-webpack-plugin";

const grafanaAppName = process.env.NEXT_PUBLIC_GRAFANA_APP_NAME ?? "FinOpia UI";
const grafanaSourceMapApiKey = process.env.GRAFANA_FARO_SOURCE_MAP_API_KEY;
const grafanaSourceMapsEnabled = process.env.GRAFANA_FARO_SOURCE_MAP_UPLOAD_ENABLED !== "false";
const hasGrafanaSourceMapApiKey = Boolean(
  grafanaSourceMapApiKey && !grafanaSourceMapApiKey.startsWith("replace-with")
);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: true,
  experimental: { optimizePackageImports: ["lucide-react", "framer-motion"] },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer && grafanaSourceMapsEnabled && hasGrafanaSourceMapApiKey) {
      config.plugins.push(
        new FaroSourceMapUploaderPlugin({
          appName: grafanaAppName,
          endpoint: process.env.GRAFANA_FARO_SOURCE_MAP_ENDPOINT ?? "https://faro-api-prod-ap-south-1.grafana.net/faro/api/v1",
          appId: process.env.GRAFANA_FARO_APP_ID ?? "1906",
          stackId: process.env.GRAFANA_FARO_STACK_ID ?? "1706338",
          apiKey: grafanaSourceMapApiKey!,
          verbose: process.env.GRAFANA_FARO_SOURCE_MAP_VERBOSE !== "false",
          gzipContents: true,
          nextjs: true,
        })
      );
    }

    return config;
  },
};

export default nextConfig;

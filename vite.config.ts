/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(
  defineConfigbuilder({
    plugins: [react()],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/tests/setup.ts"],
      css: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@/modules": path.resolve(__dirname, "./src/modules"),
        "@/assets": path.resolve(__dirname, "./src/assets"),
      },
    },
  }),
);
import type { ConfigEnv, UserConfig as ViteUserConfig } from "vite";

export interface UserConfig extends ViteUserConfig {
  test?: ViteUserConfig.test;
}

// will import vitest declare test in module 'vite'

export type { ConfigEnv };
export type UserConfigFn = (env: ConfigEnv) => UserConfig | Promise<UserConfig>;
export type UserConfigExport = UserConfig | Promise<UserConfig> | UserConfigFn;

export function defineConfigbuilder(config: UserConfigExport) {
  return config;
}

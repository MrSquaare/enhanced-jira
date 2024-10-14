import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: "Enhanced Jira",
    permissions: ["storage"],
  },
  autoIcons: {
    baseIconPath: "public/icon.svg",
  },
  modules: ["@wxt-dev/module-react", "@wxt-dev/auto-icons"],
  srcDir: "src",
  vite: () => {
    return {
      define: {
        "process.env": {},
      },
    };
  },
});

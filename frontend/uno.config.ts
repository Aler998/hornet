import { defineConfig, presetMini, presetWind3 } from "unocss";

export default defineConfig({
  presets: [presetMini, presetWind3],
  theme: {
    colors: {
      honda: "#ea3323",
    },
    spacing: {
      navbar: "64px",
    },
  },
});

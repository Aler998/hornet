import { defineConfig, presetMini, presetWind3 } from "unocss";

export default defineConfig({
  presets: [presetMini, presetWind3],
  theme: {
    spacing: {
      navbar: "64px",
    },
  },
});

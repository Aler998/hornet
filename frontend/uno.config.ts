import { defineConfig, presetMini, presetWebFonts, presetWind3 } from 'unocss'

export default defineConfig({
    presets: [
        presetMini,
        presetWind3,
        presetWebFonts({
            provider: 'google',
            fonts: {
                sans: 'Roboto',
                mono: ['Fira Code', 'Fira Mono:400,700'],
                oswald: [{
                    name: 'Oswald',
                    weights: ['200', '700'],
                },],
            },
        })
    ],
    theme: {
        colors: {
            "honda": "#ea3323",
        },
        spacing: {
            navbar: '64px',
        },
    },
})
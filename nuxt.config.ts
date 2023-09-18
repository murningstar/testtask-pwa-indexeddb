// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // devtools: { enabled: true }
    ssr: false,
    app: {
        baseURL: "/testtask-pwa-indexeddb/",
        buildAssetsDir: "assets",
    },
    css: ["/assets/scss/main.scss"],

    modules: ["@vite-pwa/nuxt"],

    pwa: {
        base: "/testtask-pwa-indexeddb/",
        manifest: {
            name: "Noviy Disk",
            short_name: "Noviy Disk",
            start_url: "/",
            theme_color: "#f7f583",
            background_color: "#89bbde",
            
            icons: [
                {
                    src: "/icons/pwa-64x64.png",
                    sizes: "64x64",
                    type: "image/png",
                },
                {
                    src: "/icons/apple-touch-icon-180x180.png",
                    sizes: "180x180",
                    type: "image/png",
                },
                {
                    src: "/icons/pwa-192x192.png",
                    sizes: "192x192",
                    type: "image/png",
                },
                {
                    src: "/icons/pwa-512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                },
                {
                    src: "/icons/maskable-icon-512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                    purpose: "maskable",
                },
            ],
        },
        /* mode: "development",
        registerType: "autoUpdate", */

        strategies: "generateSW",
        // srcDir: "src",
        // filename: "sw.js",
        workbox: {
            cleanupOutdatedCaches: true,
            globPatterns: ["**/*.{js,css,html,ico,png}"],

            /* runtimeCaching:[     // Используется с generatesw-стратегией для кэша динамических штук. Для статики используется globPatterns
                {
                    handler: "StaleWhileRevalidate",
                    urlPattern:  
                }
            ], */
        },
        includeAssets: ["index.html"],
        // devOptions: { enabled: true, type: "module" },
    },

    devtools: {
        // enabled: false,
    },

    /* build: {
        transpile:
            process.env.NODE_ENV === "production"
                ? [
                      "naive-ui",
                      "vueuc",
                      "@css-render/vue3-ssr",
                      "@juggle/resize-observer",
                    //   "dexie",
                  ]
                : ["@juggle/resize-observer"],
    }, */
    vite: {
        base: "/testtask-pwa-indexeddb/",

        build: {
            rollupOptions: {
                output: {
                    sanitizeFileName: false,
                },
            },
            assetsInlineLimit:0
        },
        /* optimizeDeps: {
            include:
                process.env.NODE_ENV === "development"
                    ? ["naive-ui", "vueuc", "date-fns-tz/esm/formatInTimeZone"]
                    : [],
        }, */
    },
});

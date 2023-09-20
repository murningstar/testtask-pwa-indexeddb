import sanitizer from "sanitize-filename";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    $production: {
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
                start_url: "/testtask-pwa-indexeddb/",
                scope: "/testtask-pwa-indexeddb/",
                theme_color: "#f7f583",
                background_color: "#89bbde",
                icons: [
                    {
                        src: "/testtask-pwa-indexeddb/icons/pwa-64x64.png",
                        sizes: "64x64",
                        type: "image/png",
                    },
                    {
                        src: "/testtask-pwa-indexeddb/icons/apple-touch-icon-180x180.png",
                        sizes: "180x180",
                        type: "image/png",
                    },
                    {
                        src: "/testtask-pwa-indexeddb/icons/pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "/testtask-pwa-indexeddb/icons/pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                    {
                        src: "/testtask-pwa-indexeddb/icons/maskable-icon-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable",
                    },
                ],
            },
            strategies: "generateSW",
            workbox: {
                cleanupOutdatedCaches: true,
                globPatterns: ["**/*.{js,css,html,ico,png}"],
            },
            includeAssets: ["index.html"],
        },
        /* build: { // doesn't affect the problem with commas/semicolons 
            transpile:
                process.env.NODE_ENV === "production"
                    ? [
                          "naive-ui",
                          "vueuc",
                          "@css-render/vue3-ssr",
                          "@juggle/resize-observer",
                      ]
                    : ["@juggle/resize-observer"],
        }, */
        vite: {
            base: "/testtask-pwa-indexeddb/",
            
            build: {
                minify:false,    
                rollupOptions: {
                    output: {
                        sanitizeFileName: (string) => {
                            //gh pages can't use files staring with "_"
                            let sanitized = sanitizer(string);
                            if (sanitized[0] === "_") {
                                sanitized = sanitized.slice(
                                    1,
                                    sanitized.length
                                );
                            } else if (sanitized[1] === "_") {
                                sanitized = sanitized.slice(
                                    1,
                                    sanitized.length
                                );
                            }
                            return sanitized;
                        },
                    },
                },
                assetsInlineLimit: 0,
            },
        },
    },
    $development: {
        devtools: { enabled: true },
        css: ["/assets/scss/main.scss"],
        modules: ["@vite-pwa/nuxt"],
        pwa: {
            manifest: {
                name: "Noviy Disk",
                short_name: "Noviy Disk",
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
            // mode: "development",
            // registerType: "autoUpdate",

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
            // includeAssets: ["index.html"],
            // devOptions: { enabled: true, type: "module" },
        },
        vite: {
            /* optimizeDeps: {
            include:
                process.env.NODE_ENV === "development"
                    ? ["naive-ui", "vueuc", "date-fns-tz/esm/formatInTimeZone"]
                    : [],
        }, */
        },
    },
});

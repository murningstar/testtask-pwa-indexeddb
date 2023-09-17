import {
    defineConfig,
    minimalPreset as preset,
} from "@vite-pwa/assets-generator/config";

export default defineConfig({
    // пока что useless т.к. pwa-assets-generator не работает как должен
    // и ассеты я создавал через скрипт, который есть в package.json
    preset,
    images: ["public/icons/icon.png"],
});

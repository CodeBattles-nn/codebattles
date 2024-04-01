import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {chunkSplitPlugin} from "vite-plugin-chunk-split";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        chunkSplitPlugin({
            strategy: 'default',
        })
    ],
    build: { //add this property
        sourcemap: true,
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    let extType = assetInfo.name.split('.').at(1);
                    if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                        extType = 'img';
                    }
                    return `frv2/assets/${extType}/[name]-[hash][extname]`;
                },

                chunkFileNames: 'frv2/assets/js/[name]-[hash].js',

                entryFileNames: 'frv2/assets/js/[name]-[hash].js',
            },
        },
    }
})


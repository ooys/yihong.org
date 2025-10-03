// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
    // Performance optimizations
    build: {
        inlineStylesheets: "auto", // Inline critical CSS
        assets: "_assets", // Optimized asset directory
    },

    // Integrations for performance
    integrations: [sitemap()],

    // Vite optimizations
    vite: {
        build: {
            // Enable minification
            minify: "terser",
            terserOptions: {
                compress: {
                    drop_console: true, // Remove console.log in production
                    drop_debugger: true,
                },
            },
            // Optimize chunk splitting
            rollupOptions: {
                output: {
                    manualChunks: undefined, // Single chunk for maximum caching
                },
            },
        },
        // CSS optimization
        css: {
            devSourcemap: false,
        },
    },

    // Image optimization
    image: {
        // Enable all image optimizations
        domains: [],
        remotePatterns: [],
    },

    // Output configuration - Astro 5+ unified static mode with adapter
    // Individual routes can opt-out of prerendering with `export const prerender = false`
    output: "static",
    adapter: node({
        mode: "standalone",
    }),

    // Site configuration for SEO
    site: "https://yihong.org",
});

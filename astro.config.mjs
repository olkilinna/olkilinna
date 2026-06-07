// @ts-check
import { defineConfig } from 'astro/config'

import react from '@astrojs/react'
import markdoc from '@astrojs/markdoc'
import keystatic from '@keystatic/astro'
import tailwindcss from '@tailwindcss/vite'

const isDev = process.env.NODE_ENV === 'development'

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    markdoc(),
    isDev ? keystatic() : null,
  ].filter(Boolean),
  vite: {
    // @ts-expect-error vite version mismatch between @tailwindcss/vite and astro's vendored vite
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@keystar/ui/core',
        '@keystatic/core',
        '@keystatic/core/ui',
      ],
    },
  },
})

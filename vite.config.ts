import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
/* The head builder and the route table, bundled for Node by esbuild — the same
   pair `scripts/prerender.mjs` uses for the build. Imported here so the dev
   server and the built site tell a crawler the same story; see the plugin. */
import { loadSeo } from './scripts/lib/seo-bundle.mjs'
import { assertSingleHead, htmlFor, NOT_FOUND, prepareShell } from './scripts/lib/html.mjs'

/**
 * Per-route head on the dev server.
 *
 * Without this, `npm run dev` serves one `index.html` for every URL, which is
 * fine for a browser — React rewrites the tags on mount — and useless for the
 * thing you actually want to test: paste a link into WhatsApp and the scraper
 * reads the shell, not the app. So the head is swapped here, per request, from
 * the same route table the build and `useSEO` read.
 *
 * `order: 'pre'` puts this ahead of Vite's own HTML injection, so what arrives
 * is the file as written and what goes back is the finished document, which
 * Vite then decorates with its client and refresh scripts as usual.
 *
 * `apply: 'serve'` keeps it out of `vite build` entirely. Production does not
 * go through this path at all: `scripts/prerender.mjs` writes a real file per
 * route into `dist/`, and the host serves those. This is a development
 * convenience, and the shipped site is the same document either way because
 * both call `scripts/lib/html.mjs`.
 *
 * Everything is wrapped: if the route table fails to bundle, or the shell has
 * been edited into something unrecognisable, the original HTML is served
 * unchanged and the server carries on. A dev server that will not start is a
 * worse outcome than a preview that says the wrong thing.
 */
function seoHead(): Plugin {
  let seo: Awaited<ReturnType<typeof loadSeo>> | null = null
  let failed = false

  const reason = (err: unknown) => (err instanceof Error ? err.message : String(err))

  async function table() {
    if (seo || failed) return seo
    try {
      seo = await loadSeo()
    } catch (err) {
      failed = true
      console.warn(`\n[seo-head] per-route heads disabled — ${reason(err)}\n`)
    }
    return seo
  }

  return {
    name: 'xelvic-seo-head',
    apply: 'serve',
    transformIndexHtml: {
      order: 'pre',
      async handler(html, ctx) {
        const loaded = await table()
        if (!loaded) return html
        try {
          /* `originalUrl` is the URL that was asked for; `path` is what the SPA
             fallback rewrote it to. On a deep link — the case this exists for —
             they are `/about` and `/index.html`. */
          let path = String(ctx.originalUrl ?? ctx.path ?? '/').split('?')[0]
          if (path === '/index.html' || path.endsWith('/index.html')) path = '/'
          const route = loaded.routeSeo(path) ?? NOT_FOUND
          return assertSingleHead(htmlFor(prepareShell(html), route, loaded), path)
        } catch (err) {
          console.warn(`\n[seo-head] serving the shell head — ${reason(err)}\n`)
          return html
        }
      },
    },
  }
}

export default defineConfig({
  plugins: [react(), seoHead()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    // three.js is heavy but only pulled in by the lazy HeroScene chunk,
    // so bump the warning limit rather than chasing a false positive.
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split long-lived vendor code so app updates don't bust its cache.
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
})

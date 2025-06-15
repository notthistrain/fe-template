import type { UserConfig } from 'vite'
import path from 'node:path'
import { cwd } from 'node:process'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import AutoImport from 'unplugin-auto-import/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  // 加载环境变量
  const { VITE_BASE_URL, VITE_PORT } = loadEnv(mode, path.resolve(cwd(), '.config'))

  const config: UserConfig = {
    // 基础路径
    base: VITE_BASE_URL || '/',

    plugins: [
      vue(),
      Components({
        extensions: ['vue'],
        include: [/\.vue$/, /\.vue\?vue/],
        dts: path.resolve(__dirname, 'src', 'auto-resolver', 'components.d.ts'),
        exclude: [
          /[\\/]node_modules[\\/]/,
          /[\\/]\.git[\\/]/,
          /[\\/]\.nuxt[\\/]/,
        ],
        resolvers: [
          AntDesignVueResolver({ importStyle: 'less', resolveIcons: true }),
        ],
      }),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dts: path.resolve(
          __dirname,
          'src',
          'auto-resolver',
          'auto-imports.d.ts',
        ),
        eslintrc: {
          globalsPropValue: true,
          filepath: '.config/.eslintrc-auto-import.mjs',
          enabled: true,
        },
      }),
    ],

    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
        '@/': `${path.resolve(__dirname, 'wailsjs')}/`,
      },
      extensions: ['.mjs', '.js', '.ts', '.json', '.vue'],
    },

    server: {
      host: '0.0.0.0',
      port: Number.parseInt(VITE_PORT),
      cors: {
        origin: '*',
      },
    },

    build: {
      outDir: 'dist',
      assetsDir: 'static',
      sourcemap: mode !== 'production',
      minify: 'esbuild',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor'
            }
            return null
          },
        },
        input: [path.resolve(__dirname, '.config', 'index.html')],
      },
      chunkSizeWarningLimit: 1000,
    },

    css: {
      preprocessorOptions: {
        less: {},
      },
      postcss: {
        plugins: [autoprefixer({ overrideBrowserslist: ['last 2 versions'] })],
      },
    },
  }

  return config
})

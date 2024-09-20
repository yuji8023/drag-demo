import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
          javascriptEnabled: true,  //注意，这一句是在less对象中，写在外边不起作用
          modifyVars: { //在这里进行主题的修改，参考官方配置属性
              '@primary-color': '#0099CC',
              "root-entry-name": 'default'
          },
          alias: {
              '~antd': path.resolve(__dirname, './node_modules/antd')
          }
      }
    }
  },
  resolve: {
    alias: {
        '@': path.resolve(__dirname, './src'),
        '~antd': path.resolve(__dirname, './node_modules/antd')
    },
  },
})

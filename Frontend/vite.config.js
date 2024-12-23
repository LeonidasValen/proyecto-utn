import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({mode})=>{
  const env = loadEnv(mode, process.cwd(), '');
  return{
    plugins: [react()],
    server: {
      proxy: {
        '/auth': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: true,
        },
        '/post': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: true,
        },
        '/user': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: true,
        }
      }
    }
  }
})
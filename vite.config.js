import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react';
import cesium from 'vite-plugin-cesium';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/isstracker/',
  plugins: [reactRefresh(), cesium()]
  
})
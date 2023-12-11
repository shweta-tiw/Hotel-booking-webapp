import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    nodePolyfills({
      include:['path','fs','path','url','http','http2','https','buffer','events','util','stream','net',],
    }),
    react()
      ],
      protocolImports: true,
      
      
    
});

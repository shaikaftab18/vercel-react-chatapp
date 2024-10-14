import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/react-firebase-chat', // Add this line
  plugins: [react()],
});
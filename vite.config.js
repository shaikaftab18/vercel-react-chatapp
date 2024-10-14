import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/repository-name/', // Add this line
  plugins: [react()],
});
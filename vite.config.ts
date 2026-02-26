import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
```typescript
    base: './',
```
    plugins: [react()],
    resolve: {
    alias: {
        '@': path.resolve(__dirname, './src_final'),
    },
},
    server: {
    watch: {
        ignored: [
            '**/src/**',
            '**/src_broken/**',
            '**/src_corrupted_2/**',
            '**/src_corrupted_3/**',
            '**/src_corrupted_4/**',
            '**/src_corrupted_5/**',
  
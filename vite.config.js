import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	build: {
		outDir: 'dist',
		minify: true,
		lib: {
			entry: path.resolve(__dirname, 'main.js'), // Указываем на основной файл
			name: 'bitd-to-obsidian',
			fileName: () => 'main.js',
			formats: ['cjs'], // CommonJS формат
		},
		rollupOptions: {
			external: ['obsidian'], // Объявляем зависимость от Obsidian
			output: {
				exports: 'auto', // Автоматический выбор экспорта
			},
		},
	},
});

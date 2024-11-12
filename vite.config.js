import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	build: {
		outDir: '../test-builded',
		lib: {
			entry: path.resolve(__dirname, 'main.js'), // Указываем на основной файл
			name: 'MyPlugin',
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

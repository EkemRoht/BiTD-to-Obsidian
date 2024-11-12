import { Plugin } from 'obsidian';
import {registerSkillProcessor} from "./src/processors/SkillProcessor";
import {registerSkillGroupProcessor} from "./src/processors/SkillGroupProcessor";
import {registerClockProcessor} from "./src/processors/ClockProcessor";

export default class MyPlugin extends Plugin {
	onload() {
		console.log('Плагин загружен!');
		this.loadStylesFromFile();
		
		registerSkillProcessor(this);
		registerSkillGroupProcessor(this);
		registerClockProcessor(this);
	}

	onunload() {
		console.log('Плагин выгружен!');
	}

	async loadStylesFromFile() {
		const cssPath = `${this.manifest.dir}/styles.css`;
		try {
			const cssContent = await this.app.vault.adapter.read(cssPath);
			const style = document.createElement("style");
			style.textContent = cssContent;
			document.head.appendChild(style);
		} catch (error) {
			console.error("Ошибка при загрузке CSS:", error);
		}
	}

}
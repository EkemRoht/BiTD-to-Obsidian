import { Plugin } from 'obsidian';
import {registerSkillProcessor} from "./src/processors/SkillProcessor";
import {registerSkillGroupProcessor} from "./src/processors/SkillGroupProcessor";
import {registerClockProcessor} from "./src/processors/ClockProcessor";

export default class MyPlugin extends Plugin {
	onload() {
		console.log('Плагин загружен!');
		registerSkillProcessor(this);
		registerSkillGroupProcessor(this);
		registerClockProcessor(this);
		this.loadStyles();
	}

	onunload() {
		console.log('Плагин выгружен!');
	}

	loadStyles() {
		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = this.app.vault.adapter.getResourcePath(`./styles.css`);
		document.head.appendChild(link);
	}
}
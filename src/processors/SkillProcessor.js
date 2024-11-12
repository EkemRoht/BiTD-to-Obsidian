import { renderSkill, createDivWithContent } from '../utils';

export function registerSkillProcessor(plugin) {
	plugin.registerMarkdownCodeBlockProcessor("skill", processSkillBlock);
}

function processSkillBlock(source, el, context) {
	console.log('Обрабатываем блок skill:', source);
	const lines = source.split('\n');
	lines.forEach(line => {
		const skillRegex = /^(\S+)\s(\d+)\/(\d+)$/;
		const match = line.match(skillRegex);
		if (match) {
			const [, skillName, filled, total] = match;
			const renderedSkill = renderSkill(skillName, parseInt(filled), parseInt(total));
			const skillElement = createDivWithContent(renderedSkill);
			el.appendChild(skillElement);
		}
	});
}

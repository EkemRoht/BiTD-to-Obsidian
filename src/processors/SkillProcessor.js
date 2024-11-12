import {renderSkill, createDivWithContent, createCopyButton} from '../utils';

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

			// Добавляем обработчик клика для копирования команды
			skillElement.onclick = () => {
				const diceCommand = filled > 0 ? `${filled}d6 k1` : `2d6 kl1`;
				navigator.clipboard.writeText(`/roll message:${diceCommand} !${skillName}`).then(() => {
					skillElement.classList.add('copied');
					setTimeout(() => skillElement.classList.remove('copied'), 1000);
				});
			};

			el.appendChild(skillElement);
		}
	});
}

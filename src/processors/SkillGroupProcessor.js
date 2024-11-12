import {renderSkill, renderCircles, createDivWithContent, createCopyButton} from '../utils';

export function registerSkillGroupProcessor(plugin) {
	plugin.registerMarkdownCodeBlockProcessor("skillgroup", processSkillGroupBlock);
}

function processSkillGroupBlock(source, el, context) {
	console.log('Обрабатываем блок skillgroup:', source);
	const lines = source.split('\n');
	let count = 0;
	let totalSkills = 0;
	let groupName = "";

	if (lines.length > 0) {
		const firstLine = lines[0].trim();
		if (firstLine) {
			groupName = firstLine;
			lines.shift();
		}
	}

	const skillContainer = document.createElement('div');
	lines.forEach(line => {
		const skillRegex = /^([А-Яа-яA-Za-z]+)\s(\d+)\/(\d+)$/;
		const match = line.match(skillRegex);
		if (match) {
			const [, skillName, filled, total] = match;
			const filledCount = parseInt(filled, 10);
			const totalCount = parseInt(total, 10);
			const renderedSkill = renderSkill(skillName, filledCount, totalCount);
			const skillElement = createDivWithContent(renderedSkill);

			// Обработчик клика для копирования команды
			skillElement.onclick = () => {
				const diceCommand = `${filledCount}d6 k1 !${skillName}`;
				navigator.clipboard.writeText(`/roll message:${diceCommand}`).then(() => {
					skillElement.classList.add('copied');
					setTimeout(() => skillElement.classList.remove('copied'), 1000);
				});
			};

			skillContainer.appendChild(skillElement);

			if (filledCount >= 1) {
				count++;
			}
			totalSkills = totalCount;
		}
	});

	if (groupName) {
		const groupCircles = renderCircles(count, totalSkills);
		const groupElement = createDivWithContent(`<h3 class="skill-text">${groupName} ${groupCircles}</h3>`);
		// Обработчик клика для копирования команды
		groupElement.onclick = () => {
			const diceCommand = `${count}d6 k1 !${groupName}`;
			navigator.clipboard.writeText(`/roll message:${diceCommand}`).then(() => {
				groupElement.classList.add('copied');
				setTimeout(() => groupElement.classList.remove('copied'), 1000);
			});
		};
		el.appendChild(groupElement);
	}

	el.appendChild(skillContainer);
}

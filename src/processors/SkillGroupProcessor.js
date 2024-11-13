import {renderSkill, renderCircles, createDivWithContent, createCopyButton, renderProgressBar} from '../utils';

export function registerSkillGroupProcessor(plugin) {
	plugin.registerMarkdownCodeBlockProcessor("skillgroup", processSkillGroupBlock);
}

function processSkillGroupBlock(source, el, context) {
	console.log('Обрабатываем блок skillgroup:', source);
	const lines = source.split('\n');
	let count = 0;
	let totalSkills = 0;
	let groupName = "";
	let filledExp = 0;

	if (lines.length > 0) {
		const firstLine = lines[0].trim();
		const groupRegex = /^(.+?)\s+exp:(\d+)$/;
		const match = firstLine.match(groupRegex);
		if (match) {
			groupName = match[1]; // Название группы
			filledExp = parseInt(match[2], 10); // Количество закрашенных делений
			lines.shift(); // Удаляем первую строку из lines
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
				const diceCommand = filledCount > 0 ? `${filledCount}d6 k1` : `2d6 kl1`;
				navigator.clipboard.writeText(`/roll message:${diceCommand} !${skillName}`).then(() => {
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
		const groupElement = document.createElement('div');
		groupElement.classList.add('skillgroup');
		const groupTitle = document.createElement('h3');
		groupTitle.innerText = `${groupName} ${groupCircles}`;

		// Обработчик клика для копирования команды группы
		groupTitle.onclick = () => {
			const diceCommand = count > 0 ? `${count}d6 k1` : `2d6 kl1`;
			navigator.clipboard.writeText(`/roll message:${diceCommand} !${groupName}`).then(() => {
				groupTitle.classList.add('copied');
				setTimeout(() => groupTitle.classList.remove('copied'), 1000);
			});
		};
		groupElement.appendChild(groupTitle);

		// Создаем прогресс-бар для группы навыков с заполненным количеством из exp
		const progressBar = renderProgressBar(filledExp, 6);
		groupElement.appendChild(progressBar);
		el.appendChild(groupElement);
	}


	el.appendChild(skillContainer);
}

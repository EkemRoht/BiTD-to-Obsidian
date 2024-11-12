import {renderCirclesForClock, renderProgressBar} from "../utils";

export function registerClockProcessor(plugin) {
	plugin.registerMarkdownCodeBlockProcessor("clock", processClockBlock);
}

function processClockBlock(source, el, context) {
	console.log('Обрабатываем блок clock:', source);

	const lines = source.split('\n');
	if (lines.length < 2) return;

	const headerLine = lines[0].trim();
	const counterName = lines[1]?.trim() || 'Без названия';
	const counterDescription = lines[2]?.trim() || '';

	const clockRegex = /^(\d+)\/(\d+)\s+dices:\s*(\d+)$/;
	const match = headerLine.match(clockRegex);
	if (match) {
		const [, filled, total, diceCount] = match;
		const filledCount = parseInt(filled, 10);
		const totalCount = parseInt(total, 10);
		const diceRollCommand = `/roll message:${diceCount}d6 k1`;

		// Рендерим прогресс-кружки
		const progressBar = renderProgressBar(filledCount, totalCount);

		// Создаём элементы для заголовка и описания
		const titleEl = document.createElement('h3');
		titleEl.innerHTML = `${counterName}`;
		const descriptionEl = document.createElement('p');
		descriptionEl.textContent = counterDescription;

		// Создаём элемент <pre> с <code> и кнопкой копирования
		const codeBlock = document.createElement('pre');
		codeBlock.className = 'language-copy';
		codeBlock.setAttribute('tabindex', '0');

		const codeEl = document.createElement('code');
		codeEl.className = 'is-loaded language-copy';
		codeEl.setAttribute('data-line', '0');
		codeEl.textContent = diceRollCommand;

		// Кнопка копирования
		const copyButton = document.createElement('button');
		copyButton.className = 'copy-code-button';
		copyButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon lucide-copy">
        <rect x="8" y="8" width="14" height="14" rx="2" ry="2"></rect>
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
      </svg>
    `;

		// Обработчик клика для копирования команды
		copyButton.onclick = () => {
			navigator.clipboard.writeText(diceRollCommand).then(() => {
				copyButton.classList.add('copied');
				copyButton.innerHTML = 'Скопировано!';
				setTimeout(() => {
					copyButton.classList.remove('copied');
					copyButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon lucide-copy">
              <rect x="8" y="8" width="14" height="14" rx="2" ry="2"></rect>
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
            </svg>
          `;
				}, 2000);
			});
		};

		// Собираем блок с <pre>, <code> и кнопкой
		codeBlock.appendChild(codeEl);
		codeBlock.appendChild(copyButton);

		// Добавляем элементы в родительский элемент
		el.appendChild(titleEl);
		el.appendChild(progressBar);
		el.appendChild(descriptionEl);
		el.appendChild(codeBlock);
	}
}

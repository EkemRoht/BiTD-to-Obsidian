export function renderSkill(skillName, filled, total) {
	const circles = renderCircles(filled, total);
	return `<span class="skill-text">${circles} ${skillName}</span>`;
}

export function renderCircles(filled, total) {
	let circles = '';
	for (let i = 0; i < total; i++) {
		circles += i < filled ? '●' : '○';
	}
	return `<span class="mono-font">${circles}</span>`;
}

export function renderCirclesForClock(filled, total) {
	const segmentSize = 4;
	let circles = '';
	for (let i = 0; i < total; i++) {
		if (i > 0 && i % segmentSize === 0) circles += '|';
		circles += i < filled ? '●' : '○';
	}
	return `<span class="mono-font">${circles}</span>`;
}

export function renderProgressBar(filled, total) {
	const progressContainer = document.createElement('div');
	progressContainer.className = 'progress-bar';

	for (let i = 0; i < total; i++) {
		const segment = document.createElement('div');
		segment.className = 'progress-segment';
		if (i < filled) {
			segment.classList.add('filled');  // Залитый сегмент
		} else {
			segment.classList.add('empty');   // Пустой сегмент
		}
		progressContainer.appendChild(segment);
	}
	return progressContainer;
}

export function createDivWithContent(content) {
	const div = document.createElement('div');
	div.innerHTML = content;
	return div;
}

export function createCopyButton(diceCommand) {
	const button = document.createElement('button');
	button.className = 'copy-button';
	button.textContent = '🎲';
	button.style.marginLeft = '8px';

	button.onclick = () => {
		navigator.clipboard.writeText(`/roll message:${diceCommand}`).then(() => {
			button.textContent = '✔️';
			setTimeout(() => (button.textContent = '🎲'), 1000);
		});
	};

	return button;
}


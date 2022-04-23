const image: HTMLDivElement = document.querySelector(".image");
const score: HTMLDivElement = document.querySelector('.score');
const ms: number = 1000;

let clicks: number = 0;
let nummod: number = 100;
let clickmod: number = 1;
let currentClickMod: number = 1;

const clickNums = [
	2,
	8,
	64,
	256
]

const clickNames = [
	"+2 Clicks (40)",
	"+8 Clicks (160)",
	"+64 Clicks (1280)",
	"+256 Clicks (5120)"
]

const buttonNums = [
	1,
	5,
	10,
	100
];

const buttonNames = [
	"+1/s (Cost: 100)",
	"+5/s (Cost: 500)",
	"+10/s (Cost: 1000)",
	"+100/s (Cost: 10000)"
];

//Add 1 to clicks, convert clicks to a string as score's text content.
const updateScore = (count: number) => {
	for (let i = 0; i < count; ++i) {
		++clicks;
	}
	score.textContent = clicks.toString();
}

//Marks button
const markButton = (button: HTMLButtonElement, str: string) => {
	button.classList.add(str);
}

//Removes mark
const removeMark = (button: HTMLButtonElement, str: string) => {
	button.classList.remove(str);
}

//Makes a button
const makeButton = (number: number, str: string) => {
	const button: HTMLButtonElement = document.createElement('button');
	button.addEventListener("click", () => {
		if (clicks >= number * nummod) {
			removeMark(button, "no");
			markButton(button, "yes");
			setInterval(updateScore, ms, number);
			clicks -= number * nummod;
			score.textContent = clicks.toString();
		}
		else {
			removeMark(button, "yes");
			markButton(button, "no");
		}
	});
	button.textContent = str;
	return button;
}

//Batches buttons
const addButtons = (button: HTMLButtonElement) => {
	for (let i = 0; i < 1; ++i) {
		for (let t = buttonNums.length - 1; t >= 0; --t) {
			button.appendChild(makeButton(buttonNums[t], buttonNames[t]));
		}
	}
}

//Makes a button for adding clicks when you click.
const makeClickerButton = (number: number, str: string) => {
	const clickerButton: HTMLButtonElement = document.createElement('button');
	clickerButton.addEventListener("click", () => {
		if (clicks >= number * (nummod / 5)) {
			removeMark(clickerButton, "no");
			markButton(clickerButton, "yes");
			currentClickMod += clickmod * number;
			clicks -= number * (nummod / 5);
			score.textContent = clicks.toString();
		}
		else {
			removeMark(clickerButton, "yes");
			markButton(clickerButton, "no");
		}
	});
	clickerButton.textContent = str;
	return clickerButton;
}

//Batches buttons
const addClickerButtons = (clickerButton: HTMLButtonElement) => {
	for (let i = 0; i < 1; ++i) {
		for (let t = clickNums.length - 1; t >= 0; --t) {
			clickerButton.appendChild(makeClickerButton(clickNums[t], clickNames[t]));
		}
	}
}

//Runs buttons
const runButtons = () => {
	addButtons(document.querySelector(".buttons"));
	addClickerButtons(document.querySelector(".clicker-buttons"))
}

//Runs game logic
const runGame = () => {
	runButtons();
	image.addEventListener("click", () => {
		updateScore(currentClickMod);
	});
}

runGame();
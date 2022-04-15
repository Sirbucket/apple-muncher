const image: HTMLDivElement = document.querySelector(".image");
const score: HTMLDivElement = document.querySelector('.score');
const ms: number = 1000;
let clicks: number = 0;
let nummod: number = 100;

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

//Runs buttons
const runButtons = () => {
	addButtons(document.querySelector(".buttons"));
}

//Runs game logic
const runGame = () => {
	runButtons();
	image.addEventListener("click", () => {
		updateScore(1);
	});
}

runGame();
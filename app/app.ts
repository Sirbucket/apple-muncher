const image: HTMLDivElement = document.querySelector(".image");
const score: HTMLDivElement = document.querySelector('.score');
const ms: number = 500;
const numMod: number = 200;
const multMod: number = 1.25;
let clicks: number = 0;
let clickMod: number = 1;
let currentClickMod: number = 1;

const clickNums = [1,2,5,10];
const buttonNums = [1,5,10,25];
const clickNames = ["+1 Clicks","+2 Clicks","+5 Clicks","+10 Clicks"];
const buttonNames = ["+2/s","+10/s","+20/s","+50/s"];

//Add 1 to clicks, convert clicks to a string as score's text content.
const updateScore = (count: number) => {
	for (let i = 0; i < count; ++i) {
		++clicks;
	}
	score.textContent = Math.round(clicks).toString();
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
	let cost: number = Math.round(number * numMod);
	button.addEventListener("click", () => {
		if (clicks >= cost) {
			removeMark(button, "no");
			markButton(button, "yes");
			setInterval(updateScore, ms, number);

			clicks -= Math.round(number * numMod);

			const newCost = Math.round(cost *= multMod);
			button.textContent = `${str} (Cost: ${newCost.toString()})`;
			score.textContent = Math.round(clicks).toString();
		}
		else {
			removeMark(button, "yes");
			markButton(button, "no");
		}
	});
	button.textContent = `${str} (Cost: ${cost.toString()})`;
	return button;
}

//Makes a button for adding clicks when you click.
const makeClickerButton = (number: number, str: string) => {
	const clickerButton: HTMLButtonElement = document.createElement('button');
	let cost = number * (numMod * 3);
	clickerButton.addEventListener("click", () => {
		if (clicks >= cost) {
			removeMark(clickerButton, "no");
			markButton(clickerButton, "yes");
			
			currentClickMod += Math.round(clickMod * number);
			clicks -= cost;
			
			const newCost = Math.round(cost *= multMod);
			clickerButton.textContent = `${str} (Cost: ${newCost.toString()})`;
			score.textContent = Math.round(clicks).toString();
		}
		else {
			removeMark(clickerButton, "yes");
			markButton(clickerButton, "no");
		}
	});
	clickerButton.textContent = `${str} (Cost: ${cost.toString()})`;
	return clickerButton;
}

//Batches buttons
const addButtons = (button: HTMLButtonElement) => {
	for (let i = 0; i < 1; ++i) {
		for (let t = buttonNums.length - 1; t >= 0; --t) {
			button.appendChild(makeButton(buttonNums[t], buttonNames[t]));
		}
	}
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
	addClickerButtons(document.querySelector(".clicker-buttons"));
}

//Runs game logic
const runGame = () => {
	runButtons();
	image.addEventListener("click", () => {
		updateScore(currentClickMod);
	});
}

runGame();
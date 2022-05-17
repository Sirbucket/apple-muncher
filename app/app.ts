const image: HTMLDivElement = document.querySelector(".image");
const score: HTMLDivElement = document.querySelector('.score');
const buttons: HTMLButtonElement = document.querySelector(".buttons");
const clickButtons: HTMLButtonElement = document.querySelector(".clicker-buttons");
const ms: number = 1000;
const numMod: number = 100;
const multMod: number = 0.1;

let clicks: number = 0;
let clickMod: number = 1;
let currentClickMod: number = 1;
let timerMod: number = 0;
let timer = setInterval;

const clickNums = [100, 50, 25, 10, 5, 2, 1];
const buttonNums = [400,200,100,50,20,10,2];
const clickNames = ["+100 Clicks", "+50 Clicks", "+25 Clicks", "+10 Clicks", "+5 Clicks", "+2 Clicks", "+1 Clicks"];
const buttonNames = ["+400/s", "+200/s", "+100/s", "+50/s", "+20/s", "+10/s", "+2/s"];

//Add 1 to clicks, convert clicks to a string as score's text content.

const updateScore = (count: number) => {
	for (let i = count; i>0; --i) {
		++clicks;
	}
	score.textContent = ~~clicks.toString();
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
	let cost: number = ~~(number * numMod);
	let newCost: number = cost;
	button.addEventListener("click", () => {
		if (clicks >= newCost) {
			removeMark(button, "no");
			markButton(button, "yes");
			clearInterval(timer);
			timerMod += number;
			timer = setInterval(updateScore, ms, timerMod);
			
			clicks -= newCost;
			newCost += ~~(cost*multMod);

			button.textContent = `${str} (Cost: ${newCost.toString()})`;
			score.textContent = ~~clicks.toString();
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
	let cost: number = ~~(number * (numMod * 2));
	let newCost: number = cost;
	clickerButton.addEventListener("click", () => {
		if (clicks >= newCost) {
			removeMark(clickerButton, "no");
			markButton(clickerButton, "yes");

			currentClickMod += ~~(clickMod * number);
			clicks -= newCost;
			newCost += ~~(cost*multMod);


			clickerButton.textContent = `${str} (Cost: ${newCost.toString()})`;
			score.textContent = ~~clicks.toString();
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
	const fragment = document.createDocumentFragment();
	for (let t = buttonNums.length; --t;) {
		fragment.appendChild(makeButton(buttonNums[t], buttonNames[t]));
	}
	button.appendChild(fragment);
}

//Batches buttons
const addClickerButtons = (clickerButton: HTMLButtonElement) => {
	const fragment = document.createDocumentFragment();
	for (let t = clickNums.length; --t;) {
		fragment.appendChild(makeClickerButton(clickNums[t], clickNames[t]));
	}
	clickerButton.appendChild(fragment);
}
  
//Runs buttons
const runButtons = () => {
	addButtons(buttons);
	addClickerButtons(clickButtons);
}

//Runs game logic
const runGame = () => {
	runButtons();
	image.addEventListener("click", () => {
		updateScore(currentClickMod);
	});
}

runGame();
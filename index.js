
// Import dependencies
const Discord = require("discord.js");
const Config = require("./config.json");
const Bot = require("./util/Bot.js");
const client = new Discord.Client();


// Login and bind event listener on (ready, disconnect and message)
global.bot = new Bot(client);
client.login(Config.TOKEN);
client.once("ready", global.bot.onReady);
client.once("disconnect", global.bot.onDisconnect);
client.on("message", global.bot.onMessage);
global.client = client;



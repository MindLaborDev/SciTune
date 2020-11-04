
// Import dependencies
const Discord = require("discord.js");
const Config = require("./config.json");
const Bot = require("./util/Bot.js");

global.client = new Discord.Client();
global.bot = new Bot();

// Login and bind event listener on (ready, disconnect and message)
client.login(Config.TOKEN);
client.once("ready", global.bot.onReady);
client.once("disconnect", global.bot.onDisconnect);
client.on("message", global.bot.onMessage);



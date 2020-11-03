
// Import dependencies
const DISCORD = require("discord.js");
const { TOKEN, PREFIX } = require("./config.json");
const Bot = require("./util/Bot.js");


// Login discord client
const client = new DISCORD.Client();
client.login(TOKEN);


// When ready: Bind listeners and handlers
client.once("ready", () => {
	global.bot = new Bot(client);
	
	client.user.setActivity(`${PREFIX}play`, { type : "LISTENING" });
});


// Disconnect from all connections and shutdown bot
client.once("disconnect", () => {});

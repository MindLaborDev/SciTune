

// Import dependencies
const DISCORD = require("discord.js");
const { TOKEN, PREFIX } = require("./config.json");
const Helper = require("./util/Helper.js");
const Songs = require("./util/Songs.js");
const CommandHandler = require("./util/CommandHandler.js");

// Check if prefix is valid
if (!Helper.isValidPrefix(PREFIX))
	throw "The prefix cannot contain any whitespaces like (\\n \\r or ' ')!";

// Login discord client
const client = new DISCORD.Client();
client.login(TOKEN);


// When ready: Bind listeners and handlers
client.once("ready", () => {

	const songs = new Songs();
	const commandHandler = new CommandHandler(client, songs);
	commandHandler.listen();

});


// Disconnect from all connections and shutdown bot
client.once("disconnect", () => {});


const { PREFIX } = require("./../config.json");
const commands = require("../commands/Commands.js");

/**
 * Handles bot commands
 */
class CommandHandler {


	constructor(client, songs) {
		this.client = client;
		this.currentMessage;
		this.songs = songs;
	}


	/**
	 * Listens for messages
	 */
	listen() {

		this.client.on("message", async message => {

			this.currentMessage = message;
			let content = message.content.trim();
			
			// Ignore messages from the bot itself
			if (message.author.bot)
				return;

			// Check if message starts with prefix
			if (!content.startsWith(PREFIX)) 
				return;

			// Handle the command
			this.executeCommand(content);
		});
	}


	/**
	 * Execute the commands
	 * @param {string} commandMsg The user input
	 */
	executeCommand(commandMsg) {

		let command = this.parseCommand(commandMsg);
		let cmd = commands.find(e => e.commands.includes(command["command"]));

		// If there is no such command return
		if (!cmd) {
			this.currentMessage.channel.send("Command not found! Typo?");
			return;
		} 

		cmd.callback(command, this.currentMessage, this.songs);
	}


	/**
	 * Converts the string command into an object
	 * 
	 * @param {string} commandMsg The user input
	 */
	parseCommand(commandMsg) {
		let command = {};

		// If command has arguments
		if (commandMsg.includes(" ")) {
			let firstArgSeparator = commandMsg.indexOf(" ");
			command["command"] = commandMsg.substring(PREFIX.length, firstArgSeparator);
			command["arguments"] = commandMsg.substring(firstArgSeparator + 1).trim().split(" ");
			return command;
		}

		command["command"] = commandMsg.substring(PREFIX.length);
		return command;
	}

}

module.exports = CommandHandler;
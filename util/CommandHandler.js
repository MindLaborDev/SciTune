
const { PREFIX } = require("./../config.json");
const COMMANDS_DATA = require("../commands/Commands.js");

/**
 * Handles bot commands
 */
class CommandHandler {


	constructor(message) {
		this.message = message;
		this.content = message.content.trim();
		this.messageData = this.parseCommand();
		this.voiceChannel = this.message.member.voice.channel;
		this.textChannel = this.message.channel;
		this.botUser = this.message.client.user;
		this.guild = this.message.guild.id;
	}


	/**
	 * Checks if the message was a bot command
	 */
	isValidCommand() {
			
		// Ignore messages from the bot itself and check if message starts with the prefix
		if (this.message.author.bot) return;
		if (!this.content.startsWith(PREFIX)) return;

		return true;
	}


	/**
	 * Checks if the command actually exists
	 */
	doesCommandExist() {
		return Boolean(this.getCommandData());
	}


	/**
	 * Get the command data of the current command specified in Commands.js
	 */
	getCommandData() {
		return COMMANDS_DATA.find(c => c.commands.includes(this.messageData.command));
	}


	/**
	 * Execute the commands
	 */
	executeCommand() {

		// If there is no such command return
		if (!this.doesCommandExist()) {
			this.message.channel.send("Command not found. Typo?");
			return;
		}

		// Execute function in the current command handler scope 
		this.getCommandData().callback.call(this);
	}


	/**
	 * Converts the string command into an object
	 * 
	 * @param {string} commandMsg The user input
	 */
	parseCommand() {
		let message = {};

		// If command has arguments
		if (this.content.includes(" ")) {
			const firstArgSeparator = this.content.indexOf(" ");

			message.command = this.content.substring(PREFIX.length, firstArgSeparator);
			message.arguments = this.content.substring(firstArgSeparator + 1).trim().split(" ");
			return message;
		}

		message.command = this.content.substring(PREFIX.length);
		return message;
	}

}

module.exports = CommandHandler;
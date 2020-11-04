
const { PREFIX } = require("../config.json");
const Commands = require("../commands/Commands.js");


/**
 * This class represents a user message and can parse it and execute the corresponding commands from
 * Commands.js. It also holds helper functions that are related to the message (like getTextChannel() or getArguments()) 
 */
class CommandMessage {

	constructor(message) {
		this.message = message;
		this.parsedMessage = this.parse();
	}


	/**
	 * Get the message as a string
	 */
	toString() {
		return this.message.content.trim();
	}


	/**
	 * Get voice channel of the message author
	 */
	getVoiceChannelOfAuthor() {
		return this.message.member.voice.channel;
	}


	/**
	 * Get text channel of message
	 */
	getTextChannel() {
		return this.message.channel;
	}


	/**
	 * Get guild of message
	 */
	getGuild() {
		return this.message.guild.id;
	}


	/**
	 * Returns all arguments of the message as an array
	 */
	getArguments() {
		return this.parsedMessage.arguments;
	}


	/**
	 * Execute the command
	 */
	execute() {

		// If there is no such command return
		const command = this.getCommand();
		if (!command) {
			this.getTextChannel().send("Command not found. Typo?");
			return;
		}

		// Execute command
		command.execute(this);
	}


	/**
	 * Converts the string command into an object
	 * 
	 * @param {string} commandMsg The user input
	 */
	parse() {
		let message = {};
		let messageString = this.toString();

		// If command has arguments
		if (messageString.includes(" ")) {
			const firstArgSeparator = messageString.indexOf(" ");

			message.command = messageString.substring(PREFIX.length, firstArgSeparator);
			message.arguments = messageString.substring(firstArgSeparator + 1).trim().split(" ");
			return message;
		}

		message.command = messageString.substring(PREFIX.length);
		message.arguments = [];
		return message;
	}


	/**
	 * Returns true if the message was not a bot message and it started with the prefix
	 */
	isValid() {
		return !this.message.author.bot && this.toString().startsWith(PREFIX);
	}


	/**
	 * Get the command data of the current command specified in Commands.js
	 */
	getCommand() {
		return Commands.find(c => c.aliases.includes(this.parsedMessage.command));
	}
}

module.exports = CommandMessage;

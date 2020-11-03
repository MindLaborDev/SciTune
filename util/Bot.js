const YTDL = require("ytdl-core");
const CommandHandler = require("./CommandHandler");
const Player = require("./Player");

class Bot {

	constructor(client) {
		this.client = client;
		this.guildPlayers = new Map();
		this.bindOnMessage();
	}


	/**
	 * Searches for a youtube id or url and returns infos about the video
	 * and returns an object with all infos
	 * 
	 * @param {string} query The search query
	 */
	async searchYT(query) {
		try {
			const infos = await YTDL.getBasicInfo(query);
			return infos.videoDetails;
		} catch (err) {
			console.error(err);
			return;
		}
	}


	/**
	 * Get the player of a guild
	 * 
	 * @returns {Player}
	 */
	getPlayer(guild) {
		const player = this.guildPlayers.get(guild);
		if (!player) this.guildPlayers.set(guild, new Player(guild));
		return this.guildPlayers.get(guild);
	}


	/**
	 * Bind the onmessage event (when the bot receives a message)
	 */
	bindOnMessage() {
		this.client.on("message", (message) => {
			const commandHandler = new CommandHandler(message);

			// Execute the command if it is valid
			if (commandHandler.isValidCommand()) 
				commandHandler.executeCommand();
		});
	}
}

module.exports = Bot;

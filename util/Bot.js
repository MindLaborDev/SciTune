const YTDL = require("ytdl-core");
const CommandMessage = require("./CommandMessage");
const Player = require("./Player");

class Bot {

	constructor(client) {
		this.client = client;
		this.guildPlayers = new Map();
		this.client.on("message", (message) => {
			const commandHandler = new CommandMessage(message);
			if (commandHandler.isValid()) 
				commandHandler.execute();
		});
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
}

module.exports = Bot;

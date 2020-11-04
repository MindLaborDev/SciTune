const YTDL = require("ytdl-core");
const CommandMessage = require("./CommandMessage");
const Player = require("./Player");

class Bot {

	constructor(client) {
		this.guildPlayers = new Map();
		client.on("message", (message) => {
			const commandMessage = new CommandMessage(message);
			if (commandMessage.isValid()) commandMessage.execute();
		});
	}


	/**
	 * Connects to a voice channel
	 */
	async connect(guild, voiceChannel) {

		const player = this.getPlayer(guild);
		if (player.isConnected()) {
			console.error("The player is already connected!");
			return;
		}

		try {
			player.voiceChannel = voiceChannel;
			player.connection = await player.voiceChannel.join();
		} catch (error) {
			console.error(error);
		}
	}


	/**
	 * Disconnect from the voice channel
	 */
	disconnect(guild) {
		const player = this.getPlayer(guild);

		if (!player.isConnected()) {
			console.error("The player is already disconnected!");
			return;
		}

		player.voiceChannel.leave();
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

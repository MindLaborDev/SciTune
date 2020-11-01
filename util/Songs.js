const { TextChannel } = require("discord.js");
const Queue = require("./Queue");
const YTDL = require("ytdl-core");
const Helper = require("./Helper");

class Songs {

	constructor() {
		this.guildQueues = new Map();
		this.songData = new Map();
	}


	/**
	 * Adds a song to the queue of message.guild
	 * @param {object} message The discord message object
	 * @param {string} song The requested song string
	 */
	async add(message, song) {

		// Check if bot is able to play something
		if (!Helper.canBotPlay(message)) 
			return;

		let songInfo;
		try {
			songInfo = await YTDL.getBasicInfo(song);
		} catch (err) {
			console.error(err);
			message.channel.send(err);
			return;
		}
		const songData = songInfo.videoDetails;

		// Get guild (server) queue and 
		let guildQueue = this.getGuildQueue(message.guild.id);
		const voiceChannel = message.member.voice.channel;
		const textChannel = message.channel;

		if (!guildQueue)
			this.setGuildQueue(message.guild.id, new Queue(textChannel, voiceChannel));
		
			
		guildQueue = this.getGuildQueue(message.guild.id);
		guildQueue.songs.push(songData);
		guildQueue.textChannel.send(`${songData.title} has been added to the queue!`);
		guildQueue.play();
	}

	getGuildQueue(guild) {
		return this.guildQueues.get(guild);
	}

	setGuildQueue(guild, queue) {
		return this.guildQueues.set(guild, queue);
	}
}

module.exports = Songs;
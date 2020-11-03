
const Queue = require("./Queue");
const Communication = require("./Communication");
const Helper = require("./Helper");
const YTDL = require("ytdl-core");

class Player {

	constructor(guild) {
		this.guild = guild;
		this.queue = new Queue();
		this.voiceChannel = null;
		this.textChannel = null;
		this.connection = null;
		this.dispatcher = null;
		this.volume = 10;
		this.playing = false;
	}


	/**
	 * Setter for voice channel
	 */
	use(voiceChannel, textChannel) {
		if (this.connection) {
			console.error("The bot is already connected to a voice channel!");
			return;
		}

		this.voiceChannel = voiceChannel;
		this.textChannel = textChannel;
	}


	/**
	 * Connects to a voice channel
	 */
	async connect(bot) {
		if (this.connection) return;
		if (!this.hasPermissions(bot)) return;

		try {
			this.connection = await this.voiceChannel.join();
			return this.connection;
		} catch (err) {
			console.log(err);
		}
	}


	/**
	 * Starts playing the first track in the queue
	 * 
	 * @param {function} onFinish Calls when the playere finished playing the track
	 */
	play(onFinish) {

		// Check if connection is set and the queue is not empty 
		if (!this.connection) return;
		if (this.queue.isEmpty()) {
			onFinish();
			return;
		} 

		// Create & stream the audio stream
		const track = this.queue.first();
		const audioStream = this.createAudioStream(track.video_url);
		const dispatcher = this.connection.play(audioStream);
		this.dispatcher = this.setupDispatcher(dispatcher);
		this.playing = true;

		// Send message about the new track
		new Communication(this.textChannel).newTrackHasStarted({
			title: track.title, 
			url: track.video_url, 
			author: [track.author.name, track.author.avatar, track.author.channel_url], 
			description: track.shortDescription.substring(0, 122) + "...", 
			thumbnail: track.thumbnail.thumbnails[track.thumbnail.thumbnails.length-1]?.url, 
			footer: [Helper.secsToString(track.lengthSeconds), track.author.avatar]
		});
	}


	/**
	 * Stops playing the track
	 */
	stop() {
		this.connection.dispatcher.end();
		this.connection = null;
	}


	/**
	 * Adds a track to the queue
	 */
	add(track) {
		this.queue.tracks.push(track);
	}


	/**
	 * Binds streaming events (like onfinish, onerror...) and sets streaming properties (like volume)
	 */
	setupDispatcher(dispatcher) {
		dispatcher.on("finish", () => {
			this.queue.removeFirst();
			this.play();
			this.playing = false;
		});

		dispatcher.on("error", error => {
			console.error(error);
			this.playing = false;
		});

		dispatcher.setVolumeLogarithmic(this.volume / 10);
		return dispatcher;
	}


	/**
	 * Creates an audio stream
	 * 
	 * @param {string} url The youtube video url
	 */
	createAudioStream(url) {
		return YTDL(url, { quality: "highestaudio" });
	}


	/**
	 * Returns true if player is currently playing
	 */
	isPlaying() {
		return this.playing;
	}


	/**
	 * Checks if the bot is connected to a voice channel
	 */
	isConnected() {
		return Boolean(this.connection);
	}


	/**
	 * Checks if the bot can play tracks in the voice channel
	 */
	hasPermissions(bot) {
		return this.isUserInVoiceChannel() &&
				this.canConnect(bot) &&
				this.canSpeak(bot);
	}


	/**
	 * Checks if the user is in the voice channel.
	 */
	isUserInVoiceChannel() {
		return Boolean(this.voiceChannel);
	}
	

	/**
	 * Check if the bot has permission to join the voice channel
	 * 
	 * @param {ClientUser} bot The client user of the bot. (message.client.user)
	 */
	canConnect(bot) {
		const permissions = this.voiceChannel.permissionsFor(bot);
		return permissions.has("CONNECT");
	}


	/**
	 * Check if the bot has permission to speak in the voice channel
	 * 
	 * @param {ClientUser} bot The client user of the bot. (message.client.user)
	 */
	canSpeak(bot) {
		const permissions = this.voiceChannel.permissionsFor(bot);
		return permissions.has("SPEAK");
	}

}

module.exports = Player;
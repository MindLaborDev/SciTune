
const Communication = require("./Communication");
const Helper = require("./Helper");
const YTDL = require("ytdl-core");


/**
 * This class represents a player that streams audio into a voice channel and manages queues/playlists
 */
class Player {

	constructor(guild) {
		this.guild = guild;
		this.queue = [];
		this.voiceChannel = null;
		this.textChannel = null;
		this.connection = null;
		this.dispatcher = null;
		this.volume = 10;
		this.playing = false;
	}


	/**
	 * Starts playing the first track in the queue
	 * 
	 * @param {function} onFinish Calls when the player finished playing the track
	 */
	play(onFinish) {

		// Check if connection is set and the queue is not empty 
		if (!this.isConnected()) return;
		if (!this.queue.length) {
			onFinish();
			return;
		} 

		// Create & stream the audio stream
		const track = this.queue[0];
		const audioStream = YTDL(track.video_url);
		const dispatcher = this.connection.play(audioStream);
		this.dispatcher = this.setupDispatcher(dispatcher);
		this.playing = true;

		// Send message about the new track
		new Communication(this.textChannel).newTrackHasStarted(track);
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
		this.queue.push(track);
	}


	/**
	 * Binds streaming events (like onfinish, onerror...) and sets streaming properties (like volume)
	 */
	setupDispatcher(dispatcher) {
		dispatcher.on("finish", () => {
			this.queue.shift();
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
}

module.exports = Player;

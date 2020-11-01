const YTDL = require("ytdl-core");
const Helper = require("./../util/Helper.js");


class Queue {

	constructor(textChannel, voiceChannel) {
		this.textChannel = textChannel;
		this.voiceChannel = voiceChannel;
		this.connection = null;
		this.songs = [];
		this.volume = 10;
		this.playing = false;
	}


	/**
	 * Starts playing the queue
	 */
	async play(skip = false) {
		if (!this.connection) await this.join();
		if (this.playing && !skip)
			return;
		
		if (!this.songs.length) {
			this.voiceChannel.leave();
			this.reset();
			return;
		}
			
		// Setup & play dispatcher
		this.playing = true;
		const song = this.songs[0];
		const dispatcher = this.connection.play(YTDL(song.video_url, { quality: "highestaudio" }));
		dispatcher.on("finish", () => {
			this.songs.shift();
			this.playing = false;
			this.play();
		});
		dispatcher.on("error", error => {
			this.playing = false;
			console.error(error);
		});
		dispatcher.setVolumeLogarithmic(this.volume / 10);

		// Send confirmation message
		let embed = Helper.createEmbed({
			title: song.title, 
			url: song.video_url, 
			author: [song.author.name, song.author.avatar, song.author.channel_url], 
			desc: song.shortDescription.substring(0, 122) + "...", 
			thumb: song.thumbnail.thumbnails[song.thumbnail.thumbnails.length-1]?.url, 
			footer: [Helper.secsToString(song.lengthSeconds), song.author.avatar]
		});
		this.textChannel.send(embed);
	}


	/**
	 * Join the voice channel
	 */
	async join() {
		try {
			this.connection = await this.voiceChannel.join();
		} catch (err) {

			// Log error
			console.log(err);
			this.textChannel.send("Couldn't join. Check the console!");
			this.reset();
			return;
		}
	}

	/**
	 * Resets the current Queue (this)
	 */
	reset() {
		constructor(this.textChannel, this.voiceChannel);
	}
}

module.exports = Queue;
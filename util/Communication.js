
const DISCORD = require("discord.js");
const Helper = require("./Helper");


/**
 * This class is used to communicate to the user using <DISCORD.MessageEmbed>. It makes it easier
 * to reuse messages and keep the code much simpler.
 */
class Communication {

	constructor(textChannel) {
		this.textChannel = textChannel;
	}


	/**
	 * Sends an embed that indicates a new track has started playing
	 */
	newTrackHasStarted(track) {

		// Build embed
		let embed = new DISCORD.MessageEmbed().setColor("#6441a5");
		embed.setTitle(track.title);
		embed.setURL(track.video_url);
		embed.setImage(track.thumbnail.thumbnails[track.thumbnail.thumbnails.length-1]?.url);
		embed.setAuthor(track.author.name, track.author.avatar, track.author.channel_url);
		embed.setDescription(track.shortDescription.substring(0, 122) + "...");
		embed.setFooter(Helper.readableSeconds(track.lengthSeconds), track.author.avatar);

		// Send embed
		this.textChannel.send(embed);
	}
}

module.exports = Communication;

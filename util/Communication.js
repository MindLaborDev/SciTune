
const DISCORD = require("discord.js");

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
		if (track.title) embed.setTitle(track.title);
		if (track.url) embed.setURL(track.url);
		if (track.thumbnail) embed.setImage(track.thumbnail);
		if (track.author.length) embed.setAuthor(...track.author);
		if (track.description) embed.setDescription(track.description);
		if (track.timestamp) embed.setTimestamp();
		if (track.footer.length) embed.setFooter(...track.footer);

		// Send embed
		this.textChannel.send(embed);
	}
}

module.exports = Communication;
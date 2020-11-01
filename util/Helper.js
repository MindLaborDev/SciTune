
const DISCORD = require("discord.js");

module.exports = {
	isValidPrefix: function (prefix) {

		// Don't allow any whitespace characters
		return /^[^\s]+$/g.test(prefix);
	},
	canBotPlay: function (message) {

		// Check if user is in voice channel
		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) {
			message.channel.send("You need to be in a voice channel to play music!");
			return;
		}

		// Check if the bot has permission to join the voice channel
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has("CONNECT")) {
			message.channel.send("I need the permissions to join your voice channel!");
			return;
		}
			
		// Check if the bot has permission to speak in the channel
		if (!permissions.has("SPEAK")) {
			message.channel.send("I need the permissions to speak in your voice channel!");
			return;
		}

		return true;
	},
	createEmbed: function ({title, url, author, desc, thumb, footer}) {
		let embed = new DISCORD.MessageEmbed()
			.setColor("#6441a5")
			.setTitle(title)
			.setURL(url)
			.setImage(thumb)
			.setAuthor(...author)
			.setDescription(desc)
			.setTimestamp()
			.setFooter(...footer);
		if (thumb !== "")
			embed.setImage(thumb)
		return embed;
	},
	createQueueEmbeds(songs) {
		let embed = new DISCORD.MessageEmbed()
			.setColor("#6441a5")
			.setTitle("Current Playlist");
	
		let secs = 1, index = 1;
		for (const song of songs) {
			const from = this.secsToString(secs);
			const to = this.secsToString(secs + parseInt(song.lengthSeconds));

			embed.addField(`**${index}.  ${song.title}** ${index===1? "[Current]" : ""}`, `${from} to ${to}`, false);
			secs += parseInt(song.lengthSeconds);
			index++;

			if (index % 10 === 0) 
				break;
		}
	
		return embed;
	}
,	  
	secsToString: function (s) {
		let secs = parseInt(s);
		let mins = Math.floor(secs / 60);
		secs -= mins * 60;
		let hs = Math.floor(mins / 60);
		mins -= hs * 60;
		return (hs > 0 ? (hs + "h ") : "") + (mins > 0 ? (mins + "m ") : "") + (secs > 0 ? (secs + "s") : "");
	}
	  
}

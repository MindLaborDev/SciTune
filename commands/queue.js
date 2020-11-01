
const Helper = require("./../util/Helper.js");

module.exports = function (cmd, message, songs) {
	const songList = songs.getGuildQueue(message.guild.id).songs;
	const embed = Helper.createQueueEmbeds(songList);
	message.channel.send(embed);
}
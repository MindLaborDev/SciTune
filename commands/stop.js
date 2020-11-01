

module.exports = function (cmd, message, songs) {

	// Check if user is in voice channel
	if (!message.member.voice.channel)
		return message.channel.send("You have to be in a voice channel to stop the music!");

	songs.getGuildQueue(message.guild.id).reset();
}
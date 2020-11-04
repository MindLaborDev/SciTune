

module.exports = function (message) {

	// Check if user is in voice channel
	const voiceChannel = message.getVoiceChannelOfAuthor();
	if (!voiceChannel)
		return message.getTextChannel().send("You have to be in a voice channel to stop the music!");

	const guild = message.getGuild();
	const player = global.bot.getPlayer(guild);

	player.queue = [];
	player.stop();
}
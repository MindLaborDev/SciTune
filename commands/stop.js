
const Communication = require("./../util/Communication");

module.exports = function (message) {

	// Check if user is in voice channel
	const voiceChannel = message.getVoiceChannelOfAuthor();
	const sender = new Communication(message.getTextChannel());
	if (!voiceChannel)
		return sender.error("Error", `You have to be in a voice channel to play music!`);

	const guild = message.getGuild();
	const player = global.bot.getPlayer(guild);

	player.queue = [];
	player.stop();
}

const Communication = require("./../util/Communication");

module.exports = async function(message) {

	const guild = message.getGuild();
	const player = global.bot.getPlayer(guild);
	const textChannel = message.getTextChannel();
	const voiceChannel = message.getVoiceChannelOfAuthor();
	const sender = new Communication(textChannel);

	// Make sure the user is in a voice channel
	if (!voiceChannel) 
		return sender.error("Error", `You have to be in a voice channel to play music!`);
	
	// Connect if player is not connected
	if (player.isConnected()) 
		return sender.info("Already connected", `I am already connected to a channel!`);

	await global.bot.connect(guild, voiceChannel, textChannel);
}
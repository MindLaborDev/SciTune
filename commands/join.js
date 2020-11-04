
const Communication = require("./../util/Communication");

module.exports = async function(message) {

	const guild = message.getGuild();
	const player = global.bot.getPlayer(guild);
	const textChannel = message.getTextChannel();
	const voiceChannel = message.getVoiceChannelOfAuthor();
	const sender = new Communication(textChannel);
	
	// Connect if player is not connected
	if (player.isConnected()) 
		return sender.info("Already connected", `I am already connected to your channel!`);

	await global.bot.connect(guild, voiceChannel, textChannel);
}
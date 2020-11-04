
const Communication = require("./../util/Communication");

module.exports = async function(message) {

	const guild = message.getGuild();
	const player = global.bot.getPlayer(guild);
	const textChannel = message.getTextChannel();
	const sender = new Communication(textChannel);
	
	// Connect if player is not connected
	if (!player.isConnected()) 
		return sender.info("Already disconnected", `I am already disconnected from your channel!`);

	await global.bot.disconnect(guild);
}
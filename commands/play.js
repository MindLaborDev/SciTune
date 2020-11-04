const { PREFIX } = require("./../config.json");

module.exports = async function(message) {
	
	const arguments = message.getArguments();
	const textChannel = message.getTextChannel();
	const voiceChannel = message.getVoiceChannelOfAuthor();
	const player = global.bot.getPlayer(message.getGuild());

	// Check if song is requested
	if (!arguments) 
		return textChannel.send(`Usage: ${PREFIX}play [Link or id]`);
	
	// Make sure the user is in a voice channel
	if (!voiceChannel) 
		return textChannel.send(`You need to be in a voice channel to play music!`);

	// Check if bot has permissions to join and speak
	if (!player.hasPermissions(message.message.client.user)) 
		return textChannel.send(`I do not have the permissions to do that!`);
	
	// Get song data from YTDL
	const track = arguments.join(" ");
	const trackInfos = await global.bot.searchYT(track);
	if (!trackInfos) 
		return textChannel.send(`I didn't find that song :/`);

	// Connect if player is not connected
	if (!player.isConnected()) {
		player.use(message.getVoiceChannelOfAuthor(), message.getTextChannel());
		await player.connect();
	}

	// Add track to the queue
	player.add(trackInfos);

	// Play song if the player doesn't play anything at this moment
	if (!player.isPlaying())
		player.play(() => message.getTextChannel().send(`There are no more songs in the queue`));
	
}
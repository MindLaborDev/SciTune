const { PREFIX } = require("./../config.json");

module.exports = async function(message) {
	
	const arguments = message.getArguments();
	const textChannel = message.getTextChannel();
	const voiceChannel = message.getVoiceChannelOfAuthor();
	const guild = message.getGuild();
	const player = global.bot.getPlayer(guild);

	// Check if song is requested
	if (!arguments.length) 
		return textChannel.send(`Usage: ${PREFIX}play [Link or id]`);
	
	// Make sure the user is in a voice channel
	if (!voiceChannel) 
		return textChannel.send(`You need to be in a voice channel to play music!`);

	// Check if bot has permissions to join and speak
	
	const permissions = voiceChannel.permissionsFor(message.message.client.user);
	if (!permissions.has("SPEAK") || !permissions.has("CONNECT")) 
		return textChannel.send(`I do not have the permissions to do that!`);
	
	// Get song data from YTDL
	const track = arguments.join(" ");
	const trackInfos = await global.bot.searchYT(track);
	if (!trackInfos) 
		return textChannel.send(`I didn't find that song :/`);

	// Add track to the queue
	player.add(trackInfos);

	// Connect if player is not connected
	if (!player.isConnected()) 
		await global.bot.connect(guild, voiceChannel, textChannel);

	// Play song if the player doesn't play anything at this moment
	if (!player.isPlaying())
		player.play(() => message.getTextChannel().send(`There are no more songs in the queue`));
	
}
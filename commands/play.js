const { PREFIX } = require("./../config.json");
const Communication = require("./../util/Communication");

module.exports = async function(message) {
	
	const arguments = message.getArguments();
	const textChannel = message.getTextChannel();
	const voiceChannel = message.getVoiceChannelOfAuthor();
	const sender = new Communication(textChannel);
	const guild = message.getGuild();
	const player = global.bot.getPlayer(guild);

	// Check if song is requested
	if (!arguments.length) 
		return sender.error("Invalid Command", `${PREFIX}play [Link or id]`);
	
	// Make sure the user is in a voice channel
	if (!voiceChannel) 
		return sender.error("Error", `You need to be in a voice channel to play music!`);

	// Check if bot has permissions to join and speak
	
	const permissions = voiceChannel.permissionsFor(message.message.client.user);
	if (!permissions.has("SPEAK") || !permissions.has("CONNECT")) 
		return sender.error("Permission Error", `I do not have the permissions to do that!`);
	
	// Get song data from YTDL
	const track = arguments.join(" ");
	const trackInfos = await global.bot.searchYT(track);
	if (!trackInfos) 
		return sender.error("Song not found", `I did not find that song!`);

	// Add track to the queue
	player.add(trackInfos);

	// Connect if player is not connected
	if (!player.isConnected()) 
		await global.bot.connect(guild, voiceChannel, textChannel);

	// Play song if the player doesn't play anything at this moment
	if (!player.isPlaying())
		player.play(() => sender.info("No more songs", `That was the last song. Add a song to the queue with ${PREFIX}play [Link or id]`));
	
}
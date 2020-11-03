const { PREFIX } = require("./../config.json");

module.exports = async function() {
	
	const bot = global.bot;
	if (!this.messageData.arguments) {
		this.textChannel.send(`Usage: ${PREFIX}play [Link or id]`);
		return;
	}
	
	const query = this.messageData.arguments.join(" ");
	const trackInfos = await bot.searchYT(query);
	if (!trackInfos) {
		this.textChannel.send(`I didn't find that song :/`);
		return;
	}

	const player = bot.getPlayer(this.guild);
	const isConnected = player.isConnected();
	if (!isConnected) {
		player.use(this.voiceChannel, this.textChannel);
		await player.connect(this.botUser);
	}

	player.add(trackInfos);
	if (!player.isPlaying()) 
		player.play(() => {
			this.textChannel.send(`There are no more songs in the queue`);
		});

}


module.exports = function () {

	// Check if user is in voice channel
	if (!this.message.member.voice.channel)
		return this.message.channel.send("You have to be in a voice channel to stop the music!");

	const guild = this.message.guild.id;
	const player = global.bot.getPlayer(guild);

	player.stop();
	player.queue.clear();
}
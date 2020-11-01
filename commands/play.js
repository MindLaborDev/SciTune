const { PREFIX } = require("./../config.json");

module.exports = function (cmd, message, songs) {

	// Check if arguments of the command "play" exist
	let args = cmd["arguments"];
	if (!args) {
		message.channel.send(`Try: ${PREFIX}play Your Song`);
		return;
	}
	
	// Add song to the queue
	songs.add(message, args.join(" "));
}
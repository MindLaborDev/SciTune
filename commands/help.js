
const Communication = require("./../util/Communication");

module.exports = async function(message) {
	const textChannel = message.getTextChannel();
	const sender = new Communication(textChannel);
	
	sender.message("SciTune Commands", [{
		title: "play [youtube link or id]", 
		description: "Plays a song or adds it to the queue if it is playing something else. Aliases: p"
	}, {
		title: "stop", 
		description: "Stops playing music."
	}, {
		title: "join", 
		description: "Joins your voice channel."
	}, {
		title: "leave", 
		description: "Leaves your voice channel. Aliases: [disconnect, go]"
	}, {
		title: "help", 
		description: "Shows all commands. Aliases: [h, command, commands]"
	}]);
}
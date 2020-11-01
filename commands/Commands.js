
const play = require('./play');
const stop = require('./stop');
const queue = require('./queue');

module.exports = [
	{
		commands: ["p", "play"],
		callback: play
	},{
		commands: ["stop"],
		callback: stop
	},{
		commands: ["queue"],
		callback: queue
	},
]
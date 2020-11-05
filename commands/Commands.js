
const play = require('./play');
const stop = require('./stop');
const join = require('./join');
const leave = require('./leave');
const help = require('./help');

module.exports = [{
	aliases: ["p", "play"],
	execute: play
},{
	aliases: ["stop"],
	execute: stop
},{
	aliases: ["join"],
	execute: join
},{
	aliases: ["leave", "disconnect", "go"],
	execute: leave
},{
	aliases: ["help", "h", "command", "commands"],
	execute: help
}]
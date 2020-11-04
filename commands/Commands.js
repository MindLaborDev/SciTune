
const play = require('./play');
const stop = require('./stop');
const join = require('./join');
const leave = require('./leave');

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
}]
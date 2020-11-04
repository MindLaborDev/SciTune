
const play = require('./play');
const stop = require('./stop');

module.exports = [{
	aliases: ["p", "play"],
	execute: play
},{
	aliases: ["stop"],
	execute: stop
}]
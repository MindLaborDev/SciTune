
const play = require('./play');
const stop = require('./stop');

module.exports = [{
	commands: ["p", "play"],
	callback: play
},{
	commands: ["stop"],
	callback: stop
}]
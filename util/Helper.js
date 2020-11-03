
class Helper {

	/**
	 * Checks if the prefix is valid
	 * 
	 * @param {string} prefix
	 */
	static isValidPrefix(prefix) {

		// Don't allow any whitespace characters
		return /^[^\s]+$/g.test(prefix);
	}


	/**
	 * Converts seconds into a readable format HH:MM:SS
	 * 
	 * @param {string} s The seconds
	 */
	static readableSeconds(seconds) {
		let secs = parseInt(seconds);
		let mins = Math.floor(secs / 60);
		let hs = Math.floor(mins / 60);

		secs -= mins * 60;
		mins -= hs * 60;

		return (hs > 0 ? (hs + "h ") : "") + (mins > 0 ? (mins + "m ") : "") + (secs > 0 ? (secs + "s") : "");
	}

}

module.exports = Helper;
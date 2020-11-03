
class Queue {

	constructor() {
		this.tracks = [];
	}


	/**
	 * Checks if the queue is empty
	 */
	isEmpty() {
		return this.tracks.length === 0;
	}


	/**
	 * Returns the first track of the queue
	 */
	first() {
		return this.tracks[0];
	}

	/**
	 * Removes the first track from the queue 
	 */
	removeFirst() {
		this.tracks.shift();
	}


	/**
	 * Removes all tracks from the queue
	 */
	clear() {
		this.tracks = [];
	}
}

module.exports = Queue;
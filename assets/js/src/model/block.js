/**
 * block.js
 *
 * An object that represents a single block somewhere on screen. Aggregate four of these
 * together, and you get a Tetronimo.
 */
import { BLOCK_SIZE } from '../const.js';

export class Block {
	constructor(position) {
		this.position = position;
	}

	getPosition() {
		return this.position;
	}

	setPosition(position) {
		this.position = position;
	}
}
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

	getSprite() {
		return this.sprite;
	}

	setSprite(sprite) {
		this.sprite = sprite;
	}

	getPosition() {
		if (this.sprite) {
			return this._getSpritePosition();
		}

		return this.position;
	}

	setPosition(position) {
		if (this.sprite) {
			this._setSpritePosition(position);
		} else {
			this.position = position;
		}
	}

	/*---PRIVATE */

	/** Helper method. Returns the sprite's position for this block. */
	_getSpritePosition() {
		return { x: this.sprite.x, y: this.sprite.y };
	}

	/** Helper method. Sets the sprite's position for this block. */
	_setSpritePosition(position) {
		this.sprite.x = position.x;
		this.sprite.y = position.y;
	}
}
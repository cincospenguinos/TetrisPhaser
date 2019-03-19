/**
 * tetronimoFactory.js
 *
 * A class whose sole purpose is to churn out tetris pieces as requested. Instantiate it
 * with the puzzle scene, and then call any of its methods to get the piece requested.
 */
import { KEYS, SPRITES, TETRONIMO_TYPES, FRAME_NUMBERS, BLOCK_SIZE } from '../const.js';
import { Block } from '../model/block.js';
import { Tetronimo } from '../model/tetronimo.js';

export class TetronimoFactory {
	constructor(scene) {
		this.scene = scene;
	}

	/** Creates a tetronimo piece given the position and type. */
	createTetronimo(position, type) {
		if (type === TETRONIMO_TYPES.RANDOM) {
			type = this._randomType();
		}

		const origin = new Block(position);
		const blocks = this._createOtherBlocksAround(position, type);
		blocks.push(origin);

		return new Tetronimo({ origin: origin, blocks: blocks, type: type });
	}

	/*---PRIVATE */

	/** Helper method. Returns a random tetronimo type other than random. */
	_randomType() {
		const validTypes = Object.keys(TETRONIMO_TYPES).filter(t => t !== TETRONIMO_TYPES.RANDOM);
		const key = Math.floor(Math.random() * (validTypes.length));
		return validTypes[key];
	}

	/** Helper method. Returns the set of blocks associated with the type provided, around the position provided. */
	_createOtherBlocksAround(origin, type) {
		const blocks = [];

		switch(type) {
			case TETRONIMO_TYPES.SQUARE:
				blocks.push(this._blockFor(origin, 'right'));
				blocks.push(this._blockFor(origin, 'up right'));
				blocks.push(this._blockFor(origin, 'up'));
				break;
			case TETRONIMO_TYPES.LETTER_L:
				blocks.push(this._blockFor(origin, 'right'));
				blocks.push(this._blockFor(origin, 'up'));
				blocks.push(this._blockFor(origin, 'double up'));
				break;
			case TETRONIMO_TYPES.REVERSE_LETTER_L:
				blocks.push(this._blockFor(origin, 'double up'));
				blocks.push(this._blockFor(origin, 'up'));
				blocks.push(this._blockFor(origin, 'left'));
				break;
			case TETRONIMO_TYPES.LONG_PIECE:
				blocks.push(this._blockFor(origin, 'double up'));
				blocks.push(this._blockFor(origin, 'up'));
				blocks.push(this._blockFor(origin, 'down'));
				break;
			case TETRONIMO_TYPES.JANKY:
				blocks.push(this._blockFor(origin, 'up'));
				blocks.push(this._blockFor(origin, 'left'));
				blocks.push(this._blockFor(origin, 'right'));
				break;
			case TETRONIMO_TYPES.ZIG_ZAG:
				blocks.push(this._blockFor(origin, 'up'));
				blocks.push(this._blockFor(origin, 'left'));
				blocks.push(this._blockFor(origin, 'up right'));
				break;
			case TETRONIMO_TYPES.REVERSE_ZIG_ZAG:
				blocks.push(this._blockFor(origin, 'up'));
				blocks.push(this._blockFor(origin, 'right'));
				blocks.push(this._blockFor(origin, 'up left'));
				break;
		}

		return blocks;
	}

	/** Helper method. Returns a sprite relative to the position provided in the direction provided. */
	_blockFor(origin, direction) {
		let position = {};

		switch(direction) {
			case 'up':
				position.x = origin.x;
				position.y = origin.y - BLOCK_SIZE;
				break;
			case 'double up':
				position.x = origin.x;
				position.y = origin.y - BLOCK_SIZE * 2;
				break;
			case 'left':
				position.x = origin.x - BLOCK_SIZE;
				position.y = origin.y;
				break;
			case 'right':
				position.x = origin.x + BLOCK_SIZE;
				position.y = origin.y;
				break;
			case 'up right':
				position.x = origin.x + BLOCK_SIZE;
				position.y = origin.y + BLOCK_SIZE;
				break;
			case 'down':
				position.x = origin.x;
				position.y = origin.y + BLOCK_SIZE;
				break;
			case 'up left':
				position.x = position.x - BLOCK_SIZE;
				position.y = position.y - BLOCK_SIZE;
				break;
		}

		return new Block(position);
	}
}
/**
 * tetronimoFactory.js
 *
 * A class whose sole purpose is to churn out tetris pieces as requested. Instantiate it
 * with the puzzle scene, and then call any of its methods to get the piece requested.
 */
import { KEYS, SPRITES, TETRONIMO_TYPES, FRAME_NUMBERS, BLOCK_SIZE } from '../const.js';
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

		const origin = this.scene.physics.add.sprite(position.x, position.y, KEYS.sprites.blocks);
		const sprites = this._createOtherSpritesFor(position, type);
		sprites.push(origin);

		sprites.forEach(sprite => sprite.setFrame(FRAME_NUMBERS[type]));
		return new Tetronimo({ origin: origin, sprites: sprites, type: type });
	}

	/*---PRIVATE */

	/** Helper method. Returns a random tetronimo type other than random. */
	_randomType() {
		const validTypes = Object.keys(TETRONIMO_TYPES).filter(t => t !== TETRONIMO_TYPES.RANDOM);
		const key = Math.floor(Math.random() * (validTypes.length));
		return validTypes[key];
	}

	/** Helper method. Returns the set of sprites associated with the type provided, around the position provided. */
	_createOtherSpritesFor(position, type) {
		const sprites = [];

		switch(type) {
			case TETRONIMO_TYPES.SQUARE:
				sprites.push(this._spriteFor(position, 'right'));
				sprites.push(this._spriteFor(position, 'up right'));
				sprites.push(this._spriteFor(position, 'up'));
				break;
			case TETRONIMO_TYPES.LETTER_L:
				sprites.push(this._spriteFor(position, 'right'));
				sprites.push(this._spriteFor(position, 'up'));
				sprites.push(this._spriteFor(position, 'double up'));
				break;
			case TETRONIMO_TYPES.REVERSE_LETTER_L:
				sprites.push(this._spriteFor(position, 'double up'));
				sprites.push(this._spriteFor(position, 'up'));
				sprites.push(this._spriteFor(position, 'left'));
				break;
			case TETRONIMO_TYPES.LONG_PIECE:
				sprites.push(this._spriteFor(position, 'double up'));
				sprites.push(this._spriteFor(position, 'up'));
				sprites.push(this._spriteFor(position, 'down'));
				break;
			case TETRONIMO_TYPES.JANKY:
				sprites.push(this._spriteFor(position, 'up'));
				sprites.push(this._spriteFor(position, 'left'));
				sprites.push(this._spriteFor(position, 'right'));
				break;
			case TETRONIMO_TYPES.ZIG_ZAG:
				sprites.push(this._spriteFor(position, 'up'));
				sprites.push(this._spriteFor(position, 'left'));
				sprites.push(this._spriteFor(position, 'up right'));
				break;
			case TETRONIMO_TYPES.REVERSE_ZIG_ZAG:
				sprites.push(this._spriteFor(position, 'up'));
				sprites.push(this._spriteFor(position, 'right'));
				sprites.push(this._spriteFor(position, 'up left'));
				break;
		}

		return sprites;
	}

	/** Helper method. Returns a sprite relative to the position provided in the direction provided. */
	_spriteFor(position, direction) {
		switch(direction) {
			case 'up':
				return this.scene.physics.add.sprite(position.x, position.y - BLOCK_SIZE, KEYS.sprites.blocks)
			case 'double up':
				return this.scene.physics.add.sprite(position.x, position.y - BLOCK_SIZE * 2, KEYS.sprites.blocks);
			case 'left':
				return this.scene.physics.add.sprite(position.x - BLOCK_SIZE, position.y, KEYS.sprites.blocks);
			case 'right':
				return this.scene.physics.add.sprite(position.x + BLOCK_SIZE, position.y, KEYS.sprites.blocks);
			case 'up right':
				return this.scene.physics.add.sprite(position.x + BLOCK_SIZE, position.y - BLOCK_SIZE, KEYS.sprites.blocks);
			case 'down':
				return this.scene.physics.add.sprite(position.x, position.y + BLOCK_SIZE, KEYS.sprites.blocks);
			case 'up left':
				return this.scene.physics.add.sprite(position.x - BLOCK_SIZE, position.y - BLOCK_SIZE, KEYS.sprites.blocks);
		}
	}
}
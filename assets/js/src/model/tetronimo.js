/**
 * tetronimo.js
 *
 * A tetris piece. A polygon made up of four squares is called a tetronimo, so the
 * tetris piece class is called such.
 */
export class Tetronimo {
	constructor(opts) {
		this.type = opts.type;
		this.sprites = opts.sprites;
		this.origin = opts.origin;
	}

	/** Moves the tetronimo to the left the number of pixels provided. */
	moveLeft(amount) {
		this.sprites.forEach(sprite => sprite.setX(sprite.x - amount));
	}

	/** Moves the tetronimo to the right the number of pixels provided. */
	moveRight(amount) {
		this.sprites.forEach(sprite => sprite.setX(sprite.x + amount));
	}

	/** Moves the tetronimo down the number of pixels provided. */
	moveDown(amount) {
		this.sprites.forEach(sprite => sprite.setY(sprite.y + amount));
	}

	/** Rotates the tetronimo by 90 degrees to the right. */
	rotate() {
		throw 'Implement me!';
	}
}
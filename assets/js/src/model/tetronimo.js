/**
 * tetronimo.js
 *
 * A tetris piece. A polygon made up of four squares is called a tetronimo, so the
 * tetris piece class is called such.
 */
export class Tetronimo {
	constructor(opts) {
		this.type = opts.type;
		this.sprites = opts.sprite;
		this.origin = opts.origin;
	}

	/** Rotates the tetronimo by 90 degrees to the right. */
	rotate() {
		throw 'Implement me!';
	}
}
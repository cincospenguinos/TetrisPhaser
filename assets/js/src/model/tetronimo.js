/**
 * tetronimo.js
 *
 * A tetris piece. A polygon made up of four squares is called a tetronimo, so the
 * tetris piece class is called such.
 */
export class Tetronimo {
	constructor(opts) {
		this.type = opts.type;
		this.blocks = opts.blocks;
		this.origin = opts.origin;
	}

	getOriginPosition() {
		return this.origin.getPosition();
	}

	setOriginPosition(position) {
		this.origin.setPosition(position);
	}
}
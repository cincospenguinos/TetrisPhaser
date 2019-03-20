/**
 * tetronimo.js
 *
 * A tetris piece. A polygon made up of four squares is called a tetronimo, so the
 * tetris piece class is called such.
 */
export class Tetronimo {
	constructor(opts) {
		this.type = opts.type;
		this.blocks = opts.blocks || [];
		this.origin = opts.origin;

		if (this.blocks.length !== 4) {
			throw 'A tetronimo must have 4 blocks!';
		}
	}

	getBlocks() {
		return this.blocks;
	}

	getOriginPosition() {
		return this.origin.getPosition();
	}

	/** Sets the origin position of this tetronimo, and all the other blocks around it. */
	setOriginPosition(position) {
		const diff = this._getDiff(this.origin.getPosition(), position);
		this.blocks.forEach((block) => {
			block.setPosition({ 
				x: block.getPosition().x + diff.x, 
				y: block.getPosition().y + diff.y,
			});
		});
	}

	/*---PRIVATE */
	_getDiff(oldPosition, newPosition) {
		return { x: newPosition.x - oldPosition.x, y: newPosition.y - oldPosition.y };
	}
}
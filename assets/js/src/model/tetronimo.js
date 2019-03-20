/**
 * tetronimo.js
 *
 * A tetris piece. A polygon made up of four squares is called a tetronimo, so the
 * tetris piece class is called such.
 */
import { BLOCK_SIZE } from '../const.js';

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

	setOriginPosition(position) {
		const diff = this._getDiff(this.origin.getPosition(), position);
		this.blocks.forEach((block) => {
			block.setPosition({ 
				x: block.getPosition().x + diff.x, 
				y: block.getPosition().y + diff.y,
			});
		});
	}

	/** Applies the movement provided unless it would break the boundary provided. */
	applyMovement(movement, boundary) {
		let valid = true;
		this.blocks.forEach((block) => {
			const positionTo = this._positionTo(movement, block);
			if (!this._respectsBoundary(positionTo, movement, boundary)) {
				valid = false;
				return;
			}
		});

		if (valid) {
			this.blocks.forEach((b) => b.setPosition(this._positionTo(movement, b)));
		}

		return valid;
	}

	/*---PRIVATE */

	/** Helper method. Returns the position that the block provided would have if it moves in the movement provided. */
	_positionTo(movement, block) {
		const blockPosition = block.getPosition();

		switch(movement) {
			case Tetronimo.LEFT:
				return { x: blockPosition.x - BLOCK_SIZE, y: blockPosition.y };
			case Tetronimo.RIGHT:
				return { x: blockPosition.x + BLOCK_SIZE, y: blockPosition.y };
			case Tetronimo.DOWN:
				return { x: blockPosition.x, y: blockPosition.y + BLOCK_SIZE };
			case Tetronimo.ROTATE:
				throw 'Implement me!';
		}
	}

	/** Helper method. Returns whether or not the position provided respects the boundary provided in the movement provided. */
	_respectsBoundary(position, movement, boundary) {
		switch(movement) {
			case Tetronimo.LEFT:
				return position.x >= boundary;
			case Tetronimo.RIGHT:
				return position.x <= boundary;
			case Tetronimo.DOWN:
				return position.y <= boundary;
			case Tetronimo.ROTATE:
				throw 'Implement me!';
		}
	}

	/*---PRIVATE */
	_getDiff(oldPosition, newPosition) {
		return { x: newPosition.x - oldPosition.x, y: newPosition.y - oldPosition.y };
	}
}

Tetronimo.LEFT = 'left';
Tetronimo.RIGHT = 'right';
Tetronimo.DOWN = 'down';
Tetronimo.ROTATE = 'rotate';
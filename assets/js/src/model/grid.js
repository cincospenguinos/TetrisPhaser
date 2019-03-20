/**
 * grid.js
 *
 * A grid associated with a level. Tetris operates on a grid system, and the Grid class is the
 * definition of the object that keeps track of where pieces are and where they may go.
 */
import { BLOCK_SIZE } from '../const.js';
import { Tetronimo } from './tetronimo.js';

export class Grid {
	constructor(opts) {
		this.width = Math.floor(opts.width / BLOCK_SIZE);
		this.height = Math.floor(opts.height / BLOCK_SIZE);
		this.startingPosition = opts.startingPosition;

		this.boundaries = {
			left: BLOCK_SIZE / 2,
			right: this.width * BLOCK_SIZE - BLOCK_SIZE / 2,
			down: this.height * BLOCK_SIZE - BLOCK_SIZE / 2,
		};
	}

	getActivePiece() {
		return this.activePiece;
	}

	/** Sets the active piece in the grid (that is, the one the player is messing with. */
	setActivePiece(tetronimo) {
		this.activePiece = tetronimo;
		tetronimo.setOriginPosition(this._toPixels(this.startingPosition));
	}

	/** Moves the active piece to the left, or doesn't if it can't. */
	moveLeft() {
		const boundary = this.boundaries.left;
		const valid = this.activePiece.applyMovement(Tetronimo.LEFT, boundary);
		return { valid: valid };
	}

	/** Moves the active piece to the right, or doesn't if it can't. */
	moveRight() {
		const boundary = this.boundaries.right;
		const valid = this.activePiece.applyMovement(Tetronimo.RIGHT, boundary);
		return { valid: valid };
	}

	/** Moves the active piece downwards, or doesn't if it can't. */
	shiftDown() {
		const boundary = this.boundaries.down;
		const valid = this.activePiece.applyMovement(Tetronimo.DOWN, boundary);
		return { valid: valid };
	}

	/** Rotates the active piece, or doesn't if it can't. */
	rotate() {
		throw 'Implement me!';
		return { valid: true };
	}

	/*---PRIVATE */

	/** Helper method. Converts position from grid units to pixels. */
	_toPixels(position) {
		return { 
			x: position.x * BLOCK_SIZE + BLOCK_SIZE / 2,
			y: position.y * BLOCK_SIZE + BLOCK_SIZE / 2,
		};
	}

	/** Helper method. Converts position from pixels to grid units. */
	_toGridUnits(position) {
		return {
			x: (position.x - BLOCK_SIZE / 2) / BLOCK_SIZE,
			y: (position.y - BLOCK_SIZE / 2) / BLOCK_SIZE,
		}
	}
}
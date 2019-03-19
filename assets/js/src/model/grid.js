/**
 * grid.js
 *
 * A grid associated with a level. Tetris operates on a grid system, and the Grid class is the
 * definition of the object that keeps track of where pieces are and where they may go.
 */
import { BLOCK_SIZE } from '../const.js';

export class Grid {
	constructor(opts) {
		this.width = Math.floor(opts.width / BLOCK_SIZE);
		this.height = Math.floor(opts.height / BLOCK_SIZE);
	}

	/** Sets the active piece in the grid (that is, the one the player is messing with. */
	setActivePiece(tetronimo) {
		if (this.activePiece) {
			this._keepPieceInPlace(this.activePiece);
		}

		this.activePiece = tetronimo;
	}

	/** Moves the active piece to the left. */
	moveLeft() {
		let isValid = true;

		this.activePiece.sprites.forEach((sprite) => {
			if (sprite.x - BLOCK_SIZE <= 0) {
				isValid = false;
				return;
			}
		});

		if (isValid) {
			this.activePiece.moveLeft(BLOCK_SIZE);
		}
	}

	/** Moves the active piece to the right. */
	moveRight() {
		let isValid = true;

		this.activePiece.sprites.forEach((sprite) => {
			if ((sprite.x + BLOCK_SIZE) / BLOCK_SIZE > this.width) {
				isValid = false;
				return;
			}
		});

		if (isValid) {
			this.activePiece.moveRight(BLOCK_SIZE);
		}
	}

	/** Shifts the active piece down one step. Returns true if it occurred, or false if it could not. */
	shiftDown() {
		let isValid = true;

		this.activePiece.sprites.forEach((sprite) => {
			if ((sprite.y + BLOCK_SIZE) / BLOCK_SIZE > this.height) {
				isValid = false;
				return;
			}
		});

		if (isValid) {
			this.activePiece.moveDown(BLOCK_SIZE);
		}

		return isValid;
	}

	rotate() {
		this.activePiece.rotate();
	}

	/*---PRIVATE */

	/** Helper method. Makes the piece provided sit in place. */
	_keepPieceInPlace(tetronimo) {
		console.warn('This needs to be implemented');
	}
}
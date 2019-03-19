/**
 * grid.js
 *
 * A grid associated with a level. Tetris operates on a grid system, and the Grid class is the
 * definition of the object that keeps track of where pieces are and where they may go.
 */
import { BLOCK_SIZE } from '../const.js';

export class Grid {
	constructor(opts) {
		this.blockSize = opts.blockSize || BLOCK_SIZE;
		this.width = Math.floor(opts.width / this.blockSize);
		this.height = Math.floor(opts.height / this.blockSize);
		this.startingPosition = opts.startingPosition;
	}

	/** Sets the active piece in the grid (that is, the one the player is messing with. */
	setActivePiece(tetronimo) {
		this.activePiece = tetronimo;
		tetronimo.setOriginPosition({ 
			x: this.startingPosition.x * BLOCK_SIZE + BLOCK_SIZE / 2, 
			y: this.startingPosition.y * BLOCK_SIZE + BLOCK_SIZE / 2,
		});
	}
}
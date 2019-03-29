/**
 * grid.js
 *
 * A grid associated with a level. Tetris operates on a grid system, and the Grid class is the
 * definition of the object that keeps track of where pieces are and where they may go.
 */
import { BLOCK_SIZE } from '../const.js';
import { Tetronimo } from './tetronimo.js';
import { BlockSet } from './blockSet.js';
import { DeadBlocks } from '../service/deadBlocks.js';
import { toGridUnits, toPixels } from '../utils.js';

export class Grid {
	constructor(opts) {
		this.width = Math.floor(opts.width / BLOCK_SIZE);
		this.height = Math.floor(opts.height / BLOCK_SIZE);
		this.startingPosition = opts.startingPosition;

		this.blockSet = new BlockSet(this.width, this.height);
		this.deadBlocks = new DeadBlocks();
	}

	getActivePiece() {
		return this.activePiece;
	}

	/** Sets the active piece in the grid (that is, the one the player is messing with. */
	setActivePiece(tetronimo) {
		this.activePiece = tetronimo;
		tetronimo.setOriginPosition(toPixels(this.startingPosition));
	}

	/** Moves the active piece to the left, or doesn't if it can't. */
	moveLeft() {
		const valid = this.activePiece.applyMovement(Tetronimo.LEFT, this.blockSet);
		return { valid: valid };
	}

	/** Moves the active piece to the right, or doesn't if it can't. */
	moveRight() {
		const valid = this.activePiece.applyMovement(Tetronimo.RIGHT, this.blockSet);
		return { valid: valid };
	}

	/** Moves the active piece downwards, or doesn't if it can't. */
	shiftDown() {
		const valid = this.activePiece.applyMovement(Tetronimo.DOWN, this.blockSet);
		return { valid: valid };
	}

	/** Rotates the active piece, or doesn't if it can't. */
	rotate() {
		const valid = this.activePiece.applyMovement(Tetronimo.ROTATE, this.blockSet);
		return { valid: valid };
	}

	dropDown(nextPiece) {
		while (this.activePiece.applyMovement(Tetronimo.DOWN, this.blockSet));
		this._placeActivePiece();
		this.setActivePiece(nextPiece);

		const response = this._clearLines();
		return { valid: true, lines: response.lines, blocks: response.blocks };
	}

	/*---PRIVATE */

	/** Helper method. Clears the lines in the block set and manages dead blocks helper. */
	_clearLines() {
		const response = this.blockSet.clearLines();
		response.blocks = this.deadBlocks.blocksMatching(response.blocks.map(b => toPixels(b)));
		return response;
	}

	/** Helper method. Places the active piece at its current position into the block set. */
	_placeActivePiece() {
		const blocks = this.activePiece.getBlocks()
			.map(b => b.getPosition())
			.map(p => toGridUnits(p));
		this.blockSet.placeBlocks(blocks);
		this.deadBlocks.addBlocks(this.activePiece.getBlocks());
	}
}
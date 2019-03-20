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
		this.startingPosition = opts.startingPosition;
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
		let valid = this._validMovementTo('left');

		if (valid) {
			const originGridUnits = this._toGridUnits(this.activePiece.getOriginPosition());
			const newOriginGridUnits = this._positionTo('left', originGridUnits);
			const newOrigin = this._toPixels(newOriginGridUnits);
			this.activePiece.setOriginPosition(newOrigin);
		}

		return { valid: valid };
	}

	/** Moves the active piece to the right, or doesn't if it can't. */
	moveRight() {
		let valid = this._validMovementTo('right');

		if (valid) {
			const originGridUnits = this._toGridUnits(this.activePiece.getOriginPosition());
			const newOriginGridUnits = this._positionTo('right', originGridUnits);
			const newOrigin = this._toPixels(newOriginGridUnits);
			this.activePiece.setOriginPosition(newOrigin);
		}

		return { valid: valid };
	}

	/** Moves the active piece downwards, or doesn't if it can't. */
	shiftDown() {
		let valid = this._validMovementTo('down');

		if (valid) {
			const originGridUnits = this._toGridUnits(this.activePiece.getOriginPosition());
			const newOriginGridUnits = this._positionTo('down', originGridUnits);
			const newOrigin = this._toPixels(newOriginGridUnits);
			this.activePiece.setOriginPosition(newOrigin);
		}

		return { valid: valid };
	}

	/*---PRIVATE */

	/** Helper method. Returns true if the active piece can move in the direction provided. */
	_validMovementTo(direction) {
		let valid = true;
		this.activePiece.getBlocks().forEach((block) => {
			const newPosition = this._positionTo(direction, this._toGridUnits(block.getPosition()));
			if (!this._isPositionEmpty(newPosition) || this._isPositionOutOfBounds(newPosition)) {
				valid = false;
				return;
			}
		});
		return valid;
	}

	/** Helper method. Returns true if the position provided is out of bounds. */
	_isPositionOutOfBounds(position) {
		const breaksX = position.x < 0 || position.x >= this.width;
		const breaksY = position.y >= this.height;

		return breaksX || breaksY;
	}

	/** Helper method. Returns whether or not the position provided in the grid is empty. */
	_isPositionEmpty(position) { // TODO: This
		return true;
	}

	/** Helper method. Returns the grid position to the direction of the position provided. */
	_positionTo(direction, position) {
		switch(direction) {
			case 'left':
				return { x: position.x - 1, y: position.y };
			case 'right':
				return { x: position.x + 1, y: position.y };
			case 'down':
				return { x: position.x, y: position.y + 1 };
		}
	}

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
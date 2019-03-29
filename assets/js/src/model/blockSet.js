/**
 * blockSet.js
 *
 * Object that handles where blocks are and removing lines and junk. Also only handles things in grid units.
 */
export class BlockSet {
	constructor(width, height) {
		this.dimensions = { width, height };
		this.blocks = new Map();
	}

	/** Clears lines out and returns the number of lines cleared. */
	clearLines() {
		let lines = 0;
		let blocks;

		for (let y = this.dimensions.height - 1; y >= 0; y--) {
			let rowHasLine = true;

			for (let x = 0; x < this.dimensions.width; x++) {
				if (!this.hasBlockAt({ x, y })) {
					rowHasLine = false;
					break;
				}
			}

			if (rowHasLine) {
				lines += 1;
			} else {
				lines === 0 ? blocks = [] : blocks = this._shiftLines(y);
				break;
			}
		}

		return { lines, blocks };
	}

	/** Places all the blocks at the locations associated. Must be an array of positions. */
	placeBlocks(blocks) {
		blocks.forEach(b => this.placeBlockAt(b));
	}

	/** Places a block at the location provided. */
	placeBlockAt(position) {
		if (this.positionInBounds(position) && !this.hasBlockAt(position)) {
			const xVals = this.blocks.get(position.y) || new Set();
			xVals.add(position.x);
			this.blocks.set(position.y, xVals);

			return true;
		}

		return false;
	}

	/** Returns true if the block set has a block at the location provided. */
	hasBlockAt(position) {
		const xVals = this.blocks.get(position.y);
		return (xVals && xVals.has(position.x)) || false;
	}

	/** Returns whether or not the position provided is in bounds. */
	positionInBounds(position) {
		return position.x < this.dimensions.width && position.x >= 0 && position.y < this.dimensions.height;
	}

	/*---PRIVATE */

	/** Helper method. Shifts all blocks down to the bottom from the row provided. */
	_shiftLines(row) {
		const blocks = [];
		for (let y = this.dimensions.height - 1; y > row; y--) {
			blocks.push(Array.from(this.blocks.get(y).values()))
		}

		const diffY = (this.dimensions.height - 1) - row;

		for (let y = row; y >= 0; y--) {
			const xVals = this.blocks.get(y);
			this.blocks.set(y + diffY, xVals);
			this.blocks.delete(y);
		}

		return blocks.flat();
	}
}
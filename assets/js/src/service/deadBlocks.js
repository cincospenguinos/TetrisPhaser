/**
 * deadBlocks.js
 *
 * Object that handles what blocks hit the floor (i.e. are "dead") and offers methods to grab them to
 * be cleaned up by the GameplayScene. Uses pixels for positions.
 */
export class DeadBlocks {
	constructor() {
		this.deadBlocks = [];
	}

	/** Removes all blocks that match the positions provided in the list provided. Returns the block objects included. */
	blocksMatching(positionList) {
		const blocksToClean = [];

		positionList.forEach((pos) => {
			this.deadBlocks.forEach((block) => {
				const blockPos = block.getPosition();

				if (pos.x === blockPos.x && pos.y === blockPos.y) {
					blocksToClean.push(block);
				}
			});
		});

		this.deadBlocks = this.deadBlocks.filter(b => !blocksToClean.includes(b));
		return blocksToClean;
	}

	hasBlock(block) {
		return this.deadBlocks.includes(block);
	}

	/** Adds the list of blocks provided to the collection of dead blocks. */
	addBlocks(blocks) {
		this.deadBlocks = this.deadBlocks.concat(blocks);
	}
}
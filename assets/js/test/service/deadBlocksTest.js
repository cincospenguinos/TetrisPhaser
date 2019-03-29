/**
 * deadBlocksTest.js
 */
import { DeadBlocks } from '../../src/service/deadBlocks.js';
import { Block } from '../../src/model/block.js';

QUnit.module('DeadBlocks', () => {
	QUnit.test('properly maintains what blocks to grab', (assert) => {
		const deadBlocks = new DeadBlocks();
		const blockOne = new Block({ x: 0, y: 100 });
		const blockTwo = new Block({ x: 32, y: 100 });

		deadBlocks.addBlocks([ blockOne, blockTwo ]);
		const blocksToClean = deadBlocks.blocksMatching([{ x: 0, y: 100 }]);
		assert.ok(blocksToClean.includes(blockOne));
		assert.notOk(blocksToClean.includes(blockTwo));

		assert.ok(deadBlocks.hasBlock(blockTwo));
	});
});
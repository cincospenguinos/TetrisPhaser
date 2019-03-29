/**
 * blockSetTest.js
 */
import { BlockSet } from '../../src/model/blockSet.js';

QUnit.module('BlockSet', () => {
	QUnit.module('#placeBlockAt', () => {
		QUnit.test('allows placement of a block', (assert) => {
			const blockSet = new BlockSet(10, 10);
			blockSet.placeBlockAt({ x: 3, y: 9 });
			assert.ok(blockSet.hasBlockAt({ x: 3, y: 9 }));
		});

		QUnit.test('does not allow placement of a block out of bounds', (assert) => {
			const blockSet = new BlockSet(10, 10);
			blockSet.placeBlockAt({ x: 10, y: 9 });
			assert.notOk(blockSet.hasBlockAt({ x: 10, y: 9 }));
		});
	});

	QUnit.module('#clearLines', () => {
		QUnit.test('returns 1 when one line is cleared', (assert) => {
			const blockSet = new BlockSet(3, 10);
			blockSet.placeBlockAt({ x: 0, y: 9 });
			blockSet.placeBlockAt({ x: 1, y: 9 });
			blockSet.placeBlockAt({ x: 2, y: 9 });
			
			const result = blockSet.clearLines();
			assert.equal(result.lines, 1);
			assert.notOk(blockSet.hasBlockAt({ x: 0, y: 9 }));
			assert.notOk(blockSet.hasBlockAt({ x: 1, y: 9 }));
			assert.notOk(blockSet.hasBlockAt({ x: 2, y: 9 }));
		});

		QUnit.test('returns zero when no lines are cleared', (assert) => {
			const blockSet = new BlockSet(3, 10);
			blockSet.placeBlockAt({ x: 0, y: 9 });
			blockSet.placeBlockAt({ x: 1, y: 9 });
			
			const result = blockSet.clearLines();
			assert.equal(result.lines, 0);
			assert.ok(blockSet.hasBlockAt({ x: 0, y: 9 }));
			assert.ok(blockSet.hasBlockAt({ x: 1, y: 9 }));
		});

		QUnit.test('returns 3 when three lines are cleared', (assert) => {
			const blockSet = new BlockSet(2, 10);
			blockSet.placeBlockAt({ x: 0, y: 9 });
			blockSet.placeBlockAt({ x: 1, y: 9 });
			blockSet.placeBlockAt({ x: 0, y: 8 });
			blockSet.placeBlockAt({ x: 1, y: 8 });
			blockSet.placeBlockAt({ x: 0, y: 7 });
			blockSet.placeBlockAt({ x: 1, y: 7 });
			
			const result = blockSet.clearLines();
			assert.equal(result.lines, 3);
		});
	});
});
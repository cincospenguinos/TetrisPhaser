/**
 * tetronimoTest.js
 */
import { TETRONIMO_TYPES, BLOCK_SIZE } from '../../src/const.js';
import { Tetronimo } from '../../src/model/tetronimo.js';
import { TestHelper } from '../testHelper.js';

QUnit.module('TetronimoTest', () => {
	QUnit.module('movement', () => {
		QUnit.test('LEFT', (assert) => {
			const tetronimo = TestHelper.getTetronimo({ 
				x: 5 * BLOCK_SIZE / 2, 
				y: 3 * BLOCK_SIZE / 2 
			}, TETRONIMO_TYPES.REVERSE_LETTER_L);

			let oldPositions = tetronimo.getBlocks().map(block => block.getPosition());
			const valid = tetronimo.applyMovement(Tetronimo.LEFT, TestHelper.getBlockSet());
			let newPositions = tetronimo.getBlocks().map(block => block.getPosition());

			assert.ok(valid);
			for (let i = 0; i < oldPositions.length; i++) {
				assert.equal(newPositions[i].x, oldPositions[i].x - BLOCK_SIZE);
				assert.equal(newPositions[i].y, oldPositions[i].y);
			}
		});

		QUnit.test('RIGHT', (assert) => {
			const tetronimo = TestHelper.getTetronimo({ 
				x: 3 * BLOCK_SIZE / 2, 
				y: 3 * BLOCK_SIZE / 2 
			}, TETRONIMO_TYPES.REVERSE_LETTER_L);

			let oldPositions = tetronimo.getBlocks().map(block => block.getPosition());
			const valid = tetronimo.applyMovement(Tetronimo.RIGHT, TestHelper.getBlockSet());
			let newPositions = tetronimo.getBlocks().map(block => block.getPosition());

			assert.ok(valid);
			for (let i = 0; i < oldPositions.length; i++) {
				assert.equal(newPositions[i].x, oldPositions[i].x + BLOCK_SIZE);
				assert.equal(newPositions[i].y, oldPositions[i].y);
			}
		});

		QUnit.test('DOWN', (assert) => {
			const tetronimo = TestHelper.getTetronimo({ 
				x: 3 * BLOCK_SIZE / 2, 
				y: 3 * BLOCK_SIZE / 2 
			}, TETRONIMO_TYPES.REVERSE_LETTER_L);

			let oldPositions = tetronimo.getBlocks().map(block => block.getPosition());
			const valid = tetronimo.applyMovement(Tetronimo.DOWN, TestHelper.getBlockSet());
			let newPositions = tetronimo.getBlocks().map(block => block.getPosition());

			assert.ok(valid);
			for (let i = 0; i < oldPositions.length; i++) {
				assert.equal(newPositions[i].x, oldPositions[i].x);
				assert.equal(newPositions[i].y, oldPositions[i].y + BLOCK_SIZE);
			}
		});

		QUnit.test('respects other blocks', (assert) => {
			const tetronimo = TestHelper.getTetronimo({ 
				x: BLOCK_SIZE / 2, 
				y: BLOCK_SIZE / 2 
			}, TETRONIMO_TYPES.LONG_PIECE);
			const blockSet = TestHelper.getBlockSet(1, 6);
			assert.ok(blockSet.placeBlockAt({ x: 0, y: 5 }));

			while(tetronimo.applyMovement(Tetronimo.DOWN, blockSet));
			tetronimo.getBlocks().forEach(b => assert.ok(b.getPosition().y > 6));
		});
	});
});
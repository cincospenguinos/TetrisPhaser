/**
 * gridTest.js
 */
import { BLOCK_SIZE, TETRONIMO_TYPES } from '../../src/const.js';
import { TestHelper } from '../testHelper.js';

QUnit.module('Grid', () => {
	QUnit.test('respects a starting position', (assert) => {
		const grid = TestHelper.createGrid({
			width: 10 * BLOCK_SIZE,
			height: 10 * BLOCK_SIZE,
			startingPosition: { x: 5, y: 0 },
		});
		const tetronimo = TestHelper.getTetronimo({ x: 0, y: 0 }, TETRONIMO_TYPES.SQUARE);
		grid.setActivePiece(tetronimo);

		assert.equal(tetronimo.getOriginPosition().x, 5 * BLOCK_SIZE + BLOCK_SIZE / 2);
		assert.equal(tetronimo.getOriginPosition().y, 0 * BLOCK_SIZE + BLOCK_SIZE / 2);
	});

	QUnit.module('movement', () => {
		QUnit.test('allows the active piece to move left when space is empty', (assert) => {
			const grid = TestHelper.createGrid({
				width: 10 * BLOCK_SIZE,
				height: 10 * BLOCK_SIZE,
				startingPosition: { x: 5, y: 0 },
			});
			const tetronimo = TestHelper.getTetronimo({ x: 0, y: 0 }, TETRONIMO_TYPES.SQUARE);
			grid.setActivePiece(tetronimo);

			const response = grid.moveLeft();
			assert.ok(response.valid);
		});

		QUnit.test('allows the active piece to move right when space is empty', (assert) => {
			const grid = TestHelper.createGrid({
				width: 10,
				height: 10,
				blockSize: 1,
				startingPosition: { x: 5, y: 0 },
			});
			const tetronimo = TestHelper.getTetronimo(TETRONIMO_TYPES.SQUARE);
			grid.setActivePiece(tetronimo);

			const response = grid.moveRight();
			assert.ok(response.valid);
		});

		QUnit.test('does not allow active piece to move left or right on edge', (assert) => {
			const grid = TestHelper.createGrid({
				width: 1,
				height: 10,
				blockSize: 1,
				startingPosition: { x: 0, y: 0 },
			});
			const tetronimo = TestHelper.getTetronimo(TETRONIMO_TYPES.SQUARE);
			grid.setActivePiece(tetronimo);

			let response = grid.moveLeft();
			assert.notOk(response.valid);

			response = grid.moveRight();
			assert.notOk(response.valid);
		});
	})
});
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
			assert.equal(grid.getActivePiece().getOriginPosition().x, (5 * BLOCK_SIZE - BLOCK_SIZE) + BLOCK_SIZE / 2);
		});

		QUnit.test('allows the active piece to move right when space is empty', (assert) => {
			const grid = TestHelper.createGrid({
				width: 10 * BLOCK_SIZE,
				height: 10 * BLOCK_SIZE,
				startingPosition: { x: 5, y: 0 },
			});
			const tetronimo = TestHelper.getTetronimo({ x: 0, y: 0 }, TETRONIMO_TYPES.SQUARE);
			grid.setActivePiece(tetronimo);

			const response = grid.moveRight();
			assert.ok(response.valid);
			assert.equal(grid.getActivePiece().getOriginPosition().x, 5 * BLOCK_SIZE + BLOCK_SIZE + BLOCK_SIZE / 2);
		});

		QUnit.test('does not allow active piece to move left or right on edge', (assert) => {
			const grid = TestHelper.createGrid({
				width: 1 * BLOCK_SIZE,
				height: 10 * BLOCK_SIZE,
				startingPosition: { x: 0, y: 0 },
			});
			const tetronimo = TestHelper.getTetronimo({ x: 0, y: 0 }, TETRONIMO_TYPES.LONG_PIECE);
			grid.setActivePiece(tetronimo);

			let response = grid.moveLeft();
			assert.notOk(response.valid);

			response = grid.moveRight();
			assert.notOk(response.valid);
		});

		QUnit.test('allows movement downwards', (assert) => {
			const grid = TestHelper.createGrid({
				width: 10 * BLOCK_SIZE,
				height: 10 * BLOCK_SIZE,
				startingPosition: { x: 0, y: 0 },
			});
			const tetronimo = TestHelper.getTetronimo({ x: 0, y: 0 }, TETRONIMO_TYPES.LONG_PIECE);
			grid.setActivePiece(tetronimo);

			let response = grid.shiftDown();
			assert.ok(response.valid);
			assert.equal(tetronimo.getOriginPosition().x, BLOCK_SIZE / 2);
			assert.equal(tetronimo.getOriginPosition().y, 1 * BLOCK_SIZE + BLOCK_SIZE / 2);
		});

		QUnit.test('does not allow movement downwards when on the edge', (assert) => {
			const grid = TestHelper.createGrid({
				width: 10 * BLOCK_SIZE,
				height: 1 * BLOCK_SIZE,
				startingPosition: { x: 0, y: 0 },
			});
			const tetronimo = TestHelper.getTetronimo({ x: 0, y: 0 }, TETRONIMO_TYPES.LONG_PIECE);
			grid.setActivePiece(tetronimo);

			let response = grid.shiftDown();
			assert.notOk(response.valid);
		});

		QUnit.test('allows rotation when available', (assert) => {
			const grid = TestHelper.createGrid({
				width: 10 * BLOCK_SIZE,
				height: 10 * BLOCK_SIZE,
				startingPosition: { x: 5, y: 0 },
			});
			const tetronimo = TestHelper.getTetronimo({ x: 0, y: 0 }, TETRONIMO_TYPES.LONG_PIECE);
			grid.setActivePiece(tetronimo);

			let response = grid.rotate();
			assert.ok(response.valid);
		});

		QUnit.test('does not allow rotation when on the edge', (assert) => {
			const grid = TestHelper.createGrid({
				width: 1 * BLOCK_SIZE,
				height: 10 * BLOCK_SIZE,
				startingPosition: { x: 0, y: 0 },
			});
			const tetronimo = TestHelper.getTetronimo({ x: 0, y: 0 }, TETRONIMO_TYPES.LONG_PIECE);
			grid.setActivePiece(tetronimo);

			let response = grid.rotate();
			assert.notOk(response.valid);
		});

		QUnit.test('handles dropping downwards', (assert) => {
			const grid = TestHelper.createGrid({
				width: 2 * BLOCK_SIZE,
				height: 10 * BLOCK_SIZE,
				startingPosition: { x: 0, y: 0 },
			});
			const tetronimo = TestHelper.getTetronimo({ x: 0, y: 0 }, TETRONIMO_TYPES.SQUARE);
			grid.setActivePiece(tetronimo);

			let response = grid.dropDown(TestHelper.getTetronimo({ x: 0, y: 0 }, TETRONIMO_TYPES.SQUARE));
			assert.ok(response.valid);
			assert.equal(tetronimo.getOriginPosition().x, BLOCK_SIZE / 2);
			assert.equal(tetronimo.getOriginPosition().y, 10 * BLOCK_SIZE - BLOCK_SIZE / 2);
		});
	})

	QUnit.test('updates the active piece after dropping down', (assert) => {
		const grid = TestHelper.createGrid({
			width: 10 * BLOCK_SIZE,
			height: 10 * BLOCK_SIZE,
			startingPosition: { x: 5, y: 0 },
		});
		const tetronimo = TestHelper.getTetronimo({ x: 0, y: 0 }, TETRONIMO_TYPES.SQUARE);
		const nextTetronimo = TestHelper.getTetronimo({ x: 0, y: 0 }, TETRONIMO_TYPES.SQUARE);
		grid.setActivePiece(tetronimo);
		grid.dropDown(nextTetronimo);
		
		assert.equal(nextTetronimo.getOriginPosition().x, 5 * BLOCK_SIZE + BLOCK_SIZE / 2);
		assert.equal(nextTetronimo.getOriginPosition().y, 0 * BLOCK_SIZE + BLOCK_SIZE / 2);
	});

	QUnit.test('automatically handles line clearing', (assert) => {
		const grid = TestHelper.createGrid({
			width: 2 * BLOCK_SIZE,
			height: 10 * BLOCK_SIZE,
			startingPosition: { x: 0, y: 0 },
		});

		const tetronimo = TestHelper.getTetronimo({ x: 0, y: 0 }, TETRONIMO_TYPES.SQUARE);
		const nextTetronimo = TestHelper.getTetronimo({ x: 0, y: 0 }, TETRONIMO_TYPES.SQUARE);
		grid.setActivePiece(tetronimo);
		const result = grid.dropDown(nextTetronimo);

		assert.equal(result.lines, 2);
	});
});
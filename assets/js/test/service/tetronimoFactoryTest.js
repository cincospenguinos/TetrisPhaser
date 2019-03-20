/**
 * tetronimoFactory.js
 */
import { TETRONIMO_TYPES, BLOCK_SIZE } from '../../src/const.js';
import { TestHelper } from '../testHelper.js';
import { TetronimoFactory } from '../../src/service/tetronimoFactory.js';

QUnit.module('TetronimoFactory', () => {
	QUnit.module('creating the pieces', () => {
		const assertTetronimoContainsPosition = (assert, tetronimo, position) => {
			let included = false;

			tetronimo.getBlocks().forEach((block) => {
				const blockPos = block.getPosition();
				if (blockPos.x === position.x && blockPos.y === position.y) {
					included = true;
					return;
				}
			});

			assert.ok(included);
		}

		QUnit.test('Letter L', (assert) => {
			const factory = new TetronimoFactory();
			const originPos = { x: 64, y: 64 };
			const tetronimo = factory.createTetronimo(originPos, TETRONIMO_TYPES.LETTER_L);
			const expected = [originPos, { x: 64 + BLOCK_SIZE, y: 64 }, { x: 64, y: 64 - BLOCK_SIZE }, { x: 64, y: 64 - BLOCK_SIZE * 2 }];
			expected.forEach(e => assertTetronimoContainsPosition(assert, tetronimo, e));
		});

		QUnit.test('Reverse Letter L', (assert) => {
			const factory = new TetronimoFactory();
			const originPos = { x: 64, y: 64 };
			const tetronimo = factory.createTetronimo(originPos, TETRONIMO_TYPES.REVERSE_LETTER_L);
			const expected = [originPos, { x: 64 - BLOCK_SIZE, y: 64 }, { x: 64, y: 64 - BLOCK_SIZE }, { x: 64, y: 64 - BLOCK_SIZE * 2 }];
			expected.forEach(e => assertTetronimoContainsPosition(assert, tetronimo, e));
		});

		QUnit.test('Zig Zag', (assert) => {
			const factory = new TetronimoFactory();
			const originPos = { x: 64, y: 64 };
			const tetronimo = factory.createTetronimo(originPos, TETRONIMO_TYPES.ZIG_ZAG);
			const expected = [originPos, { x: 64 - BLOCK_SIZE, y: 64 }, { x: 64, y: 64 - BLOCK_SIZE }, { x: 64 + BLOCK_SIZE, y: 64 - BLOCK_SIZE }];
			expected.forEach(e => assertTetronimoContainsPosition(assert, tetronimo, e));
		});

		QUnit.test('Reverse Zig Zag', (assert) => {
			const factory = new TetronimoFactory();
			const originPos = { x: 64, y: 64 };
			const tetronimo = factory.createTetronimo(originPos, TETRONIMO_TYPES.REVERSE_ZIG_ZAG);
			const expected = [originPos, { x: 64 + BLOCK_SIZE, y: 64 }, { x: 64, y: 64 - BLOCK_SIZE }, { x: 64 - BLOCK_SIZE, y: 64 - BLOCK_SIZE }];
			expected.forEach(e => assertTetronimoContainsPosition(assert, tetronimo, e));
		});

		QUnit.test('Janky', (assert) => {
			const factory = new TetronimoFactory();
			const originPos = { x: 64, y: 64 };
			const tetronimo = factory.createTetronimo(originPos, TETRONIMO_TYPES.JANKY);
			const expected = [originPos, { x: 64 + BLOCK_SIZE, y: 64 }, { x: 64, y: 64 - BLOCK_SIZE }, { x: 64 - BLOCK_SIZE, y: 64 }];
			expected.forEach(e => assertTetronimoContainsPosition(assert, tetronimo, e));
		});

		QUnit.test('Long Piece', (assert) => {
			const factory = new TetronimoFactory();
			const originPos = { x: 64, y: 64 };
			const tetronimo = factory.createTetronimo(originPos, TETRONIMO_TYPES.LONG_PIECE);
			const expected = [originPos, { x: 64, y: 64 + BLOCK_SIZE }, { x: 64, y: 64 - BLOCK_SIZE }, { x: 64, y: 64 - BLOCK_SIZE * 2 }]
			expected.forEach(e => assertTetronimoContainsPosition(assert, tetronimo, e));
		});

		QUnit.test('Square', (assert) => {
			const factory = new TetronimoFactory();
			const originPos = { x: 64, y: 64 };
			const tetronimo = factory.createTetronimo(originPos, TETRONIMO_TYPES.LONG_PIECE);
			const expected = [originPos, { x: 64, y: 64 + BLOCK_SIZE }, { x: 64, y: 64 - BLOCK_SIZE }, { x: 64, y: 64 - BLOCK_SIZE * 2 }]
			expected.forEach(e => assertTetronimoContainsPosition(assert, tetronimo, e));
		});
	});
});
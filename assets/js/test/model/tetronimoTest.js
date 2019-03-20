/**
 * tetronimoTest.js
 */
import { TETRONIMO_TYPES } from '../../src/const.js';
import { Tetronimo } from '../../src/model/tetronimo.js';
import { TestHelper } from '../testHelper.js';

QUnit.module('TetronimoTest', () => {
	QUnit.test('moving the origin position moves the rest of the tetronimo', (assert) => {
		const tetronimo = TestHelper.getTetronimo({ x: 5, y: 5 }, TETRONIMO_TYPES.REVERSE_LETTER_L);

		let oldPositions = tetronimo.getBlocks().map(block => block.getPosition());
		tetronimo.moveTo({ x: 50, y: 13 });
		let newPositions = tetronimo.getBlocks().map(block => block.getPosition());

		for (let i = 0; i < oldPositions.length; i++) {
			assert.equal(newPositions[i].x, oldPositions[i].x + 45);
			assert.equal(newPositions[i].y, oldPositions[i].y + 8);
		}

		oldPositions = newPositions;
		tetronimo.moveTo({ x: 0, y: 0});
		newPositions = tetronimo.getBlocks().map(block => block.getPosition());

		for (let i = 0; i < oldPositions.length; i++) {
			assert.equal(newPositions[i].x, oldPositions[i].x - 50);
			assert.equal(newPositions[i].y, oldPositions[i].y - 13);
		}		
	});
});
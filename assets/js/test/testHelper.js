/**
 * testHelper.js
 *
 * Class that helps tests in various ways.
 */
import { TetronimoFactory } from '../src/service/tetronimoFactory.js';
import { Grid } from '../src/model/grid.js';
import { BlockSet } from '../src/model/blockSet.js';

export class TestHelper {
	static createGrid(opts) {
		return new Grid(opts);
	}

	static getTetronimo(position, type) {
		const factory = new TetronimoFactory();
		return factory.createTetronimo(position, type);
	}

	static getBlockSet(width = 10, height = 10) {
		return new BlockSet(width, height);
	}
}
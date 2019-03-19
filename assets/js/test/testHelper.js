/**
 * testHelper.js
 *
 * Class that helps tests in various ways.
 */
import { TetronimoFactory } from '../src/service/tetronimoFactory.js';
import { Grid } from '../src/model/grid.js';

export class TestHelper {
	static createGrid(opts) {
		return new Grid(opts);
	}

	static getTetronimo(position, type) {
		const factory = new TetronimoFactory();
		return factory.createTetronimo(position, type);
	}
}
/**
 * gameplayHelper.js
 *
 * Helper class. Created to automate some of the tedious and unsightly 
 * aspects of the GameplayScene.
 */
import { KEYS, FRAME_NUMBERS } from '../const.js';

export class GameplayHelper {
	constructor(scene) {
		this.scene = scene;
	}

	/** Creates and assignes sprites in the encapsulated scene for the tetronimo provided. */
	createSpritesFor(tetronimo) {
		tetronimo.getBlocks().forEach((block) => {
			const blockPos = block.getPosition();
			const sprite = this.scene.add.sprite(blockPos.x, blockPos.y, KEYS.sprites.blocks);
			sprite.setFrame(FRAME_NUMBERS[tetronimo.getType()]);

			block.setSprite(sprite);
		});
	}
}
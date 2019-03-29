/**
 * gameplayScene.js
 *
 * This is where a lot of the action that you would expect in a game occurs. The main gameplay loop is here
 * (`update()`) as well as `init()` which takes data from the object passed in, `preload()` which loads
 * resources from the server, and `create()` which instantiates the various pieces of the game in preparation
 * for `update()`.
 */
import { KEYS, SPRITES, TETRONIMO_TYPES, BLOCK_SIZE, WIDTH, HEIGHT } from '../const.js';
import { TetronimoFactory } from '../service/tetronimoFactory.js';
import { GameplayHelper } from '../service/gameplayHelper.js';
import { Grid } from '../model/grid.js';

export class GameplayScene extends Phaser.Scene {
	constructor() {
		super({ key: KEYS.scenes.gameplayScene });
	}

	init(data) {
		this.startingPosition = { x: Math.floor((WIDTH / BLOCK_SIZE) / 2), y: 0 };
		this.grid = new Grid({
			width: WIDTH, 
			height: HEIGHT, 
			startingPosition: this.startingPosition,
		});

		this.factory = new TetronimoFactory();
		this.helper = new GameplayHelper(this);
	}

	preload() {
		this.load.spritesheet(KEYS.sprites.blocks, SPRITES[KEYS.sprites.blocks], 
			{ frameWidth: BLOCK_SIZE, frameHeight: BLOCK_SIZE });
	}

	create() {
		this.cursors = this.input.keyboard.createCursorKeys();
		this.grid.setActivePiece(this._newTetronimo());
	}

	update() {
		this._handleInput();
	}

	/*---PRIVATE */

	// I like to pretend that I have public/private methods in javascript. Any function I want to keep private
	// I prepend with an underscore character, and place it below the banner above. I've read that it's not
	// good practice, but I like having a clear picture of where a class's public interface and private
	// manipulation begins and ends.

	/** Helper method. Handles any input the player provides. */
	_handleInput() {
		if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
			this.grid.moveLeft();
		} else if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
			this.grid.moveRight();
		} else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
			this.grid.dropDown(this._newTetronimo());
		} else if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
			this.grid.rotate(); // TODO: Handle rotation
		}
	}

	/** Helper method. Creates a new tetronimo and returns it with sprites applied. */
	_newTetronimo(type = TETRONIMO_TYPES.RANDOM) {
		const newPiece = this.factory.createTetronimo({ x: 0, y: 0 }, type);
		this.helper.createSpritesFor(newPiece);
		return newPiece;
	}
}
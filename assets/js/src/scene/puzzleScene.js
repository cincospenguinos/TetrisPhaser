/**
 * puzzleScene.js
 *
 * This is where a lot of the action that you would expect in a game occurs. The main gameplay loop is here
 * (`update()`) as well as `init()` which takes data from the object passed in, `preload()` which loads
 * resources from the server, and `create()` which instantiates the various pieces of the game in preparation
 * for `update()`.
 */
import { KEYS, SPRITES, TETRONIMO_TYPES, BLOCK_SIZE, WIDTH, HEIGHT } from '../const.js';
import { TetronimoFactory } from '../service/tetronimoFactory.js';
import { Grid } from '../model/grid.js';

export class PuzzleScene extends Phaser.Scene {
	constructor() {
		super({ key: KEYS.scenes.puzzleScene });
	}

	init(data) {
		this.factory = new TetronimoFactory(this);
		this.grid = new Grid({ width: WIDTH, height: HEIGHT });

		this.INITIAL_POSITION = { x: 4 * BLOCK_SIZE + BLOCK_SIZE / 2, y: BLOCK_SIZE / 2 }; // Creating a variable is a good way to keep things tidy
	}

	preload() {
		// Grab sprites for various tetris pieces
		this.load.spritesheet(KEYS.sprites.blocks, SPRITES[KEYS.sprites.blocks], 
			{ frameWidth: BLOCK_SIZE, frameHeight: BLOCK_SIZE });
	}

	create() {
		this.cursors = this.input.keyboard.createCursorKeys();
		const activePiece = this.factory.createTetronimo(this.INITIAL_POSITION, TETRONIMO_TYPES.RANDOM);
		this.grid.setActivePiece(activePiece);
	}

	update() {
		this._handleInput();
		// Check if it's time to move, and if so, handle movement
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
			this.grid.shiftDown();
		} else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
			this.grid.rotate();
		}
	}
}
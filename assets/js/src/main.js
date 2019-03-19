/**
 * main.js
 *
 * The main entry point for Phaser to work its magic.
 */
import { WIDTH, HEIGHT } from './const.js';
import { PuzzleScene } from './scene/puzzleScene.js';

let config = {
	type: Phaser.AUTO,
	width: WIDTH,
	height: HEIGHT,
	scene: [PuzzleScene],
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {},
			debug: true,
		}
	}
}

let game = new Phaser.Game(config);
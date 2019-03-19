/**
 * main.js
 *
 * The main entry point for Phaser to work its magic.
 */
import { PuzzleScene } from './scene/puzzleScene.js';

let config = {
	type: Phaser.AUTO,
	width: 288,
	height: 640,
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
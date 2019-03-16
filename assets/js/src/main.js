/**
 * main.js
 *
 * The main entry point for Phaser to work its magic.
 */
import { PuzzleScene } from './scene/puzzleScene.js';

let config = {
	type: Phaser.AUTO,
	width: 400,
	height: 800,
	scene: [PuzzleScene],
}

let game = new Phaser.Game(config);
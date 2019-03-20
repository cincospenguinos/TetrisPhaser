/**
 * main.js
 *
 * The main entry point for Phaser to work its magic.
 */
import { WIDTH, HEIGHT } from './const.js';
import { GameplayScene } from './scene/gameplayScene.js';

let config = {
	type: Phaser.AUTO,
	width: WIDTH,
	height: HEIGHT,
	scene: [GameplayScene],
}

let game = new Phaser.Game(config);
/**
 * utils.js
 *
 * A few extra functions that help manage things. A junk drawer of sorts.
 */
import { BLOCK_SIZE } from './const.js';

export function toGridUnits(position) {
	return {
		x: (position.x - BLOCK_SIZE / 2) / BLOCK_SIZE,
		y: (position.y - BLOCK_SIZE / 2) / BLOCK_SIZE,
	}
}

export function toPixels(position) {
	return { 
		x: position.x * BLOCK_SIZE + BLOCK_SIZE / 2,
		y: position.y * BLOCK_SIZE + BLOCK_SIZE / 2,
	}
}
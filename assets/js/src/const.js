/**
 * const.js
 *
 * Where we keep constants for various things. This will greatly reduce issues with keys
 * and where/how things in the game are configured. We will keep all of those "magic numbers"
 * here so that they aren't magic anymore.
 */
export const KEYS = {
	scenes: {
		puzzleScene: 'PuzzleScene',
	},
	sprites: {
		blocks: 'blocks',
	},
};

const spriteLocation = 'assets/sprites';
export const SPRITES = {
	[KEYS.sprites.blocks]: `${spriteLocation}/blocks.png`,
};

export const TETRONIMO_TYPES = {
	SQUARE: 'SQUARE',
	LONG_PIECE: 'LONG_PIECE',
	LETTER_L: 'LETTER_L',
	REVERSE_LETTER_L: 'REVERSE_LETTER_L',
	ZIG_ZAG: 'ZIG_ZAG',
	REVERSE_ZIG_ZAG: 'REVERSE_ZIG_ZAG',
	JANKY: 'JANKY',
	RANDOM: 'RANDOM',
};

export const FRAME_NUMBERS = {
	[TETRONIMO_TYPES.LONG_PIECE]: 0,
	[TETRONIMO_TYPES.SQUARE]: 1,
	[TETRONIMO_TYPES.JANKY]: 2,
	[TETRONIMO_TYPES.LETTER_L]: 3,
	[TETRONIMO_TYPES.REVERSE_LETTER_L]: 4,
	[TETRONIMO_TYPES.ZIG_ZAG]: 5,
	[TETRONIMO_TYPES.REVERSE_ZIG_ZAG]: 6,
}

export const BLOCK_SIZE = 32;
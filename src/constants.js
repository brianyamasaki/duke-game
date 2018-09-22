// number of spaces on the board
export const BOARD_ROW_COUNT = 6;
export const BOARD_COL_COUNT = 6;
// board margin is same width/height as a space, so we divide by 8
export const BOARD_SPACE_DIVISOR = 8;

export const HIGHLIGHT_MOVE = 'HIGHLIGHT_MOVE';
export const HIGHLIGHT_JUMP = 'HIGHLIGHT_JUMP';
export const HIGHLIGHT_SLIDE = 'HIGHLIGHT_SLIDE';
export const HIGHLIGHT_JUMPSLIDE = 'HIGHLIGHT_JUMPSLIDE';
export const HIGHLIGHT_STRIKE = 'HIGHLIGHT_STRIKE';
export const HIGHLIGHT_COMMAND = 'HIGHLIGHT_COMMAND';
export const HIGHLIGHT_CAPTURE = 'HIGHLIGHT_CAPTURE'; // highlights for capturing a tile that would move the tile
export const HIGHLIGHT_CAPTURE_STRIKE = 'HIGHLIGHT_CAPTURE_STRIKE'; // highlights for capturing a tile that would not move the tile
export const isCaptureHighlight = (highlight) => (highlight.type === HIGHLIGHT_CAPTURE || highlight.type === HIGHLIGHT_CAPTURE_STRIKE);

export const SELECTED_TILE_IN_BAG = 'SELECTED_TILE_IN_BAG';
export const SELECTED_TILE_ON_BOARD = 'SELECTED_TILE_ON_BOARD';

export const PLAYER_ZERO_WINS = 'Player One Wins';
export const PLAYER_ONE_WINS = 'Player Two Wins';
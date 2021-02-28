const CELL_SIZE_PX = 24;
const CELL_PADDING = 1;
const BLOCK_SIZE = CELL_SIZE_PX - (CELL_PADDING * 1);

class GamePainter {
  constructor(canvasElement) {
    this.canvasElement = canvasElement;
    this.canvasContext = this.canvasElement.getContext("2d");
  }

  paintGame(game) {
    // Set the grid size
    const gridWidthPx = CELL_SIZE_PX * game.config.gridSize.x;
    const gridHeightPx = CELL_SIZE_PX * game.config.gridSize.y;
    this.canvasElement.setAttribute("width", `${gridWidthPx}px`);
    this.canvasElement.setAttribute("height", `${gridHeightPx}px`);

    // Erase everything
    this.canvasContext.clearRect(0, 0, gridWidthPx, gridHeightPx);

    // Draw the apple
    this.paintCell(game.apple, "red");

    // Draw the snake
    for (const segment of game.snake.body) {
        this.paintCell(segment, "green");
    }
  }

  paintCell(coordinate, color) {
    this.canvasContext.fillStyle = color;
    const x = (coordinate.x * CELL_SIZE_PX) + CELL_PADDING;
    const y = (coordinate.y * CELL_SIZE_PX) + CELL_PADDING;
    this.canvasContext.fillRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
  }
}

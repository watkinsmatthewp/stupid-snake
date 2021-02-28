class GamePainter {
  constructor(canvasElement) {
    this.canvasElement = canvasElement;
    this.canvasContext = this.canvasElement.getContext("2d");
  }

  paintGame(game) {
    // Set the grid size
    const gridWidthPx = game.config.cellSizePx * game.config.gridSize.x;
    const gridHeightPx = game.config.cellSizePx * game.config.gridSize.y;
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
    const x = (coordinate.x * game.config.cellSizePx) + game.config.cellPaddingPx;
    const y = (coordinate.y * game.config.cellSizePx) + game.config.cellPaddingPx;
    const blockSize = game.config.cellSizePx - (2 * game.config.cellPaddingPx);
    this.canvasContext.fillRect(x, y, blockSize, blockSize);
  }
}

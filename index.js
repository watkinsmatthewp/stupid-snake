const game = new Game({
  autoMoveIntervalMs: 250,
  gridSize: new Coordinate(12, 12),
  cellSizePx: 30,
  cellPaddingPx: 1
});
const painter = new GamePainter(document.getElementById("grid"));

game.init();
painter.paintGame(game);

const controller = new GameLoopController(game, painter);

window.addEventListener('keydown', function(event) {
  if (!event.defaultPrevented && game.isStarted) {
    switch (event.code) {
      case "KeyS":
      case "ArrowDown":
        controller.onPlayerMove(Coordinate.offsetUp);
        break;
      case "KeyW":
      case "ArrowUp":
        controller.onPlayerMove(Coordinate.offsetDown);
        break;
      case "KeyA":
      case "ArrowLeft":
        controller.onPlayerMove(Coordinate.offsetLeft);
        break;
      case "KeyD":
      case "ArrowRight":
        controller.onPlayerMove(Coordinate.offsetRight);
        break;
    }
  }
});

function loopCallback(currentTimestampMs) {
  controller.onAnimationTick(currentTimestampMs);
  requestAnimationFrame(loopCallback);
}

function startGame() {
  game.start();
  requestAnimationFrame(loopCallback);
}
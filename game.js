class Coordinate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  get hashCode() {
    return this.x * 100 + this.y;
  }

  equals(coordinate) {
    return this.hashCode === coordinate.hashCode;
  }

  plus(coordinateOffset) {
    return new Coordinate(this.x + coordinateOffset.x, this.y + coordinateOffset.y);
  }

  areaContains(coordinate) {
    return coordinate.x >= 0 && coordinate.y >= 0 && this.x > coordinate.x && this.y > coordinate.y;
  }

  static get offsetRight() {
    return new Coordinate(1, 0);
  }

  static get offsetLeft() {
    return new Coordinate(-1, 0);
  }

  static get offsetUp() {
    return new Coordinate(0, 1);
  }

  static get offsetDown() {
    return new Coordinate(0, -1);
  }
}

class Snake {
  body = [];
  occupiedCoordinateHashCodes;

  constructor(initialHeadCoordinate) {
    this.body.push(initialHeadCoordinate);
    this.occupiedCoordinateHashCodes = new Set();
    this.occupiedCoordinateHashCodes.add(initialHeadCoordinate.hashCode);
  }

  get headCoordinate() {
    return this.body[this.body.length - 1];
  }

  get tailCoordinate() {
    return this.body[0];
  }

  get length() {
    return this.body.length;
  }

  tailOccupies(coordinate) {
    return this.tailCoordinate.equals(coordinate);
  }

  headOccupies(coordinate) {
    return this.headCoordinate.equals(coordinate);
  }

  bodyOccupies(coordinate) {
    return this.occupiedCoordinateHashCodes.has(coordinate.hashCode);
  }

  move(coordinateOffset, appleCoordinate) {
    const newHead = this.headCoordinate.plus(coordinateOffset);
    if (this.length > 1 && this.bodyOccupies(newHead)) {
      throw new Error("Body crash!");
    }

    if (!appleCoordinate.equals(newHead)) {
      // No grow
      const removedTail = this.body.shift();
      this.occupiedCoordinateHashCodes.delete(removedTail.hashCode);
    }

    this.body.push(newHead);
    this.occupiedCoordinateHashCodes.add(newHead.hashCode);
  }
}

class Game {
  constructor(config) {
    this.config = config;
    this.isStarted = false;
  }

  init() {
    const midPoint = this.getMidpoint();
    this.snake = new Snake(midPoint);
    this.apple = this.getRandomEmptyPointOnGrid();
    this.snakeOrientation = new Coordinate(1, 0);
  }

  start() {
    this.isStarted = true;
  }

  getMidpoint() {
    return new Coordinate(Math.round(this.config.gridSize.x / 2), Math.round(this.config.gridSize.y / 2));
  }

  getRandomEmptyPointOnGrid() {
    while (true) {
      const point = this.getRandomPointOnGrid();
      if (!this.snake.bodyOccupies(point)) {
        return point;
      }
    }
  }

  getRandomPointOnGrid() {
    const x = Math.floor(Math.random() * this.config.gridSize.x);
    const y = Math.floor(Math.random() * this.config.gridSize.y);
    return new Coordinate(x, y);
  }

  turn(newOrientation) {
    this.snakeOrientation = newOrientation;
  }

  loop() {
    this.snake.move(this.snakeOrientation, this.apple);
    if (!this.config.gridSize.areaContains(this.snake.headCoordinate)) {
      throw new Error("Grid cash!");
    }
    if (this.snake.headCoordinate.equals(this.apple)) {
      this.apple = this.getRandomEmptyPointOnGrid();
    }
  }
}

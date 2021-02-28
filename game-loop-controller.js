class GameLoopController {
    constructor(game, painter) {
        this.game = game;
        this.painter = painter;
        this.clock = 0
        this.nextAutoMoveMs = 0;
        this.isActing = false;
    }

    onAnimationTick(currentTimestampMs) {
        this.clock = currentTimestampMs;
        if (this.isActing) {
            return;
        }
        if (currentTimestampMs < this.nextAutoMoveMs) {
            return;
        }

        this.isActing = true;
        this.game.loop();
        this.painter.paintGame(game);
        this.nextAutoMoveMs = this.clock + this.game.config.autoMoveIntervalMs;
        this.isActing = false;
    }

    onPlayerMove(newOrientation) {
        this.isActing = true;
        this.game.turn(newOrientation);
        this.game.loop();
        this.painter.paintGame(game);
        this.nextAutoMoveMs = this.clock + this.game.config.autoMoveIntervalMs;
        this.isActing = false;
    }
}
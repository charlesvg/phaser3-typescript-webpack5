import * as Phaser from 'phaser';
import {GameScene} from "./scenes/game-scene";
import {SplashScene} from "./scenes/splash-scene";

const gameConfig = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 800,
  height: 600,
  localStorageName: 'phaseres6webpack',
  scene: [SplashScene, GameScene]
}

class Game extends Phaser.Game {
  constructor () {
    super(gameConfig)
  }
}

new Game();

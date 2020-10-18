import * as Phaser from 'phaser';

export class SplashScene extends Phaser.Scene {
  constructor () {
    super({ key: 'SplashScene' })
  }

  public preload () {
    this.load.image('mushroom', 'assets/images/mushroom2.png')
  }

  public create () {
    this.scene.start('GameScene')
  }

  public update () {}
}

import * as Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
  private sprite: any;
  private text: any;
  constructor () {
    super({ key: 'GameScene' })
  }

  public init () {
  }

  public preload () {
  }

  public create () {

    let graphics = this.add.graphics()
    graphics.setVisible(false)
    graphics.fillStyle(0x00ff00, 1)
    graphics.beginPath()
    graphics.moveTo(0, 0)
    graphics.lineTo(60, 20)
    graphics.lineTo(0, 40)
    graphics.lineTo(0, 0)
    graphics.fillPath()
    graphics.generateTexture('sprite', 60, 40)
    this.sprite = this.add.sprite(400, 300, 'sprite').setOrigin(0.5)

    this.text = this.add.text(10, 10, 'angle')

    this.input.on('pointermove', (pointer: any)  => {
      const angle = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.sprite.x, this.sprite.y, pointer.x, pointer.y)
      this.sprite.setAngle(angle)
      this.text.text = 'angle: ' + angle
    }, this);

  }
}

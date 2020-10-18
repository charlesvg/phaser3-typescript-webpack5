import * as Phaser from 'phaser';
import TileSprite = Phaser.GameObjects.TileSprite;
import Text = Phaser.GameObjects.Text;

export class GameScene extends Phaser.Scene {
  private sprite: any;
  private text: Text;
  private land: TileSprite;
  constructor () {
    super({ key: 'GameScene' })
  }

  public init () {
  }

  public preload () {
    this.load.image('concrete', 'assets/games/goons/cobblestone.png');
    this.load.image('hitman', 'assets/games/goons/hitman.png');
    this.load.image('wall', 'assets/games/goons/concrete.png');
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

    this.text = this.add.text(10, 10, 'angle');

    this.input.on('pointermove', (pointer: any)  => {
      const angle = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.sprite.x, this.sprite.y, pointer.x, pointer.y)
      this.sprite.setAngle(angle)
      this.text.text = 'angle: ' + angle
      this.text.setColor('#ffffff');
      this.text.setBackgroundColor('#000000');
    }, this);


    //  Resize our game world to be a 2000 x 2000 square
    // this.physics.world.bounds.setTo(-1000, -1000, 2000, 2000);


    //  Our tiled scrolling background
    this.land = this.add.tileSprite(800 / 2 , 600 / 2 , 800, 600, 'concrete');

    this.land.tilePositionX = -this.cameras.main.x;
    this.land.tilePositionY = -this.cameras.main.y;
    this.land.depth = -1;

    // https://phaser.io/examples/v3/view/camera/follow-sprite-small-bounds
  }
}

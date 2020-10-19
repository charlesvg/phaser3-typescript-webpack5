import * as Phaser from 'phaser';
import TileSprite = Phaser.GameObjects.TileSprite;
import Text = Phaser.GameObjects.Text;
import CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;
import Image = Phaser.Physics.Arcade.Image;
import Pointer = Phaser.Input.Pointer;
import {Bullet} from "./bullet";
import Group = Phaser.GameObjects.Group;
import BaseSound = Phaser.Sound.BaseSound;

export class GameScene extends Phaser.Scene {
    private sprite: Image;
    private text: Text;
    private land: TileSprite;
    private cursors: CursorKeys;
    private bullets: Group;
    private gunShot: BaseSound;
    private lastFired: number = 0;

    constructor() {
        super({key: 'GameScene'})
    }

    public init() {
    }

    public preload() {
        this.load.image('concrete', 'assets/games/goons/cobblestone.png');
        this.load.image('hitman', 'assets/games/goons/hitman.png');
        this.load.image('wall', 'assets/games/goons/concrete.png');
        this.load.image('bullet', 'assets/games/goons/bullet.png');
        this.load.audio('gun-shot', 'assets/games/goons/gun-shot.mp3');
    }

    public create() {

        this.gunShot = this.sound.add('gun-shot');

        this.sprite = this.physics.add.image(400, 300, 'hitman');
        this.sprite.setOrigin(0.5, 0.5);

        this.text = this.add.text(10, 10, 'angle');

        // https://phaser.io/examples/v3/view/input/mouse/pointer-lock
        // let pos = {x: 0, y:0};
        // Pointer lock will only work after an 'engagement gesture', e.g. mousedown, keypress, etc.
        // this.input.on('pointerdown', (pointer: Pointer) => {
        //   this.input.mouse.requestPointerLock();
        //   pos.x = pointer.x;
        //   pos.y = pointer.y;
        // }, this);


        // Bullets

        this.bullets = this.add.group({
            classType: Bullet,
            maxSize: 10,
            runChildUpdate: true
        });


        this.input.on('pointermove', (pointer: Pointer) => {
            const angle = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(400, 300, pointer.x, pointer.y)
            this.sprite.setAngle(angle)
            this.text.text = 'angle: ' + angle
            this.text.setColor('#ffffff');
            this.text.setBackgroundColor('#000000');
        }, this);


        //  Resize our game world to be a 2000 x 2000 square
        // this.physics.world.bounds.setTo(-1000, -1000, 2000, 2000);

        this.cursors = this.input.keyboard.createCursorKeys();

        //  Our tiled scrolling background
        this.land = this.add.tileSprite(800 / 2, 600 / 2, 800, 600, 'wall');

        this.land.tilePositionX = -this.cameras.main.x;
        this.land.tilePositionY = -this.cameras.main.y;

        // Z axis
        this.land.depth = -1;

        this.cameras.main.startFollow(this.sprite, true);

        // https://phaser.io/examples/v3/view/camera/follow-sprite-small-bounds
    }

    public update(time: number, delta: number) {
        this.sprite.setVelocity(0);
        const factor = 200;
        if (this.cursors.left.isDown) {
            this.sprite.setVelocityX(-factor);
        } else if (this.cursors.right.isDown) {
            this.sprite.setVelocityX(factor);
        }

        if (this.cursors.up.isDown) {
            this.sprite.setVelocityY(-factor);

            const bullet = this.bullets.get();

            if (bullet) {
              console.log('time', time, 'last', this.lastFired);
                if (this.lastFired + 350 < time) {
                    bullet.fire(this.sprite.x, this.sprite.y);
                    this.gunShot.play();
                    this.lastFired = time;
                }
            }
        } else if (this.cursors.down.isDown) {
            this.sprite.setVelocityY(factor);
        }
    }
}

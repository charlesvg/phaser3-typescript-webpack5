import * as Phaser from "phaser";

export class Bullet extends Phaser.GameObjects.Image {

    private speed: number;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | integer) {
        super(scene, x, y, texture, frame);
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
        this.speed = Phaser.Math.GetSpeed(800, 1);
    }

    public fire(x: number, y: number, rotation: number) {
        this.rotation = rotation;
        this.setPosition(x + 5, y - 5);
        this.setActive(true);
        this.setVisible(true);
    }

    public update(time: number, delta: number) {

        const length = this.speed * delta;
        let newX = Math.round(this.x + length * Math.cos(this.rotation));
        let newY = Math.round(this.y + length * Math.sin(this.rotation));

        this.x = newX;
        this.y = newY;

        // this.y -= this.speed * delta;

        if (this.y < -50) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

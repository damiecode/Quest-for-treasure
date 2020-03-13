import Phaser from 'phaser';


class Hero extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'hero');
    this.anchor.set(0.5, 0.5);

    this.game.physics.enable(this);
    this.body.collideWorldBounds = true;
  }

  move(direction) {
    const SPEED = 200;
    this.body.velocity.x = direction * SPEED;
  }
}

export default Hero;

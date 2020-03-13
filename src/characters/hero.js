import Phaser from 'phaser';


class Hero extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'hero');
  }
}

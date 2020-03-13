import Phaser from 'phaser';


export default class Hero extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'hero');
  }
}

import Phaser from 'phaser';


export default class extends Phaser.Sprite {
  constructor(_game, _x, _y) {
    super({ key: 'Hero' });
  }
}

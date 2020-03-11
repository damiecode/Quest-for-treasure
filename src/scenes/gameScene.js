import Phaser from 'phaser';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.image('background', './assets/images/background.png');
  }

  create() {
    this.add.image(0, 0, 'background').setOrigin(0, 0);
  }
}

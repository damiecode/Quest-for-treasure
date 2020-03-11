import Phaser from 'phaser';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'SplashScene' });
  }

  preload() {
    this.load.image('logo', 'assets/images/ms_logo.png');
  }

  create() {
    this.add.image(0, 0, 'logo').setOrigin(0, 0);
    this.scene.start('GameScene');
  }

  update() {}
}
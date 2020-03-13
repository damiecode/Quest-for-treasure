import Phaser from 'phaser';
import makeAnimations from '../animations/heroanimations';
import Hero from '../characters/hero';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.image('background', './assets/images/background.png');
    this.load.json('level:1', './assets/data/level01.json');
    this.load.image('ground', './assets/images/ground.png');
    this.load.image('grass:8x1', './assets/images/grass_8x1.png');
    this.load.image('grass:6x1', './assets/images/grass_6x1.png');
    this.load.image('grass:4x1', './assets/images/grass_4x1.png');
    this.load.image('grass:2x1', './assets/images/grass_2x1.png');
    this.load.image('grass:1x1', './assets/images/grass_1x1.png');
    this.load.spritesheet('dude',
      'assets/images/dude.png',
      { frameWidth: 32, frameHeight: 48 });
    this.load.on('complete', () => {
      makeAnimations(this);
    });
    this.load.spritesheet('coin', './assets/images/coin_animated.png', {
      frameWidth: 22, frameHeight: 22,
    });
  }

  create() {
    this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.loadLevel(this.cache.json.get('level:1'));
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  loadLevel(data) {
    data.platforms.forEach(this.spawnPlatform, this);
    this.spawnCharacters({ hero: data.hero });
  }

  spawnPlatform(platform) {
    this.add.sprite(platform.x, platform.y, platform.image);
  }

  spawnCharacters(data) {
    this.hero = new Hero(this.game, data.hero.x, data.hero.y);
    this.add.existing(this.hero);
  }
}

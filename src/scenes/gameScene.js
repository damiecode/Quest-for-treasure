import Phaser from 'phaser';

function Hero(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'hero');
  this.anchor.set(0.5, 0.5);
}

Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Hero;

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
    this.load.image('hero', './assets/images/hero_stopped.png');
  }

  create() {
    this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.loadLevel(this.cache.json.get('level:1'));
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
    this.game.add.existing(this.hero);
  }
}

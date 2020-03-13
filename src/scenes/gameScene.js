import Phaser from 'phaser';
import makeAnimations from '../animations/heroanimations';

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
      './assets/images/dude.png',
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
    this.player = this.physics.add.sprite(100, 450, 'dude').setOrigin(0.5, 0.5);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.spawnPlatform);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  loadLevel(data) {
    data.platforms.forEach(this.spawnPlatform, this);
    this.platforms = this.game.add.group();
    this.coins = this.game.add.group();
    this.spawnCharacters({ hero: data.hero, spiders: data.spiders });
    data.coins.forEach(this.spawnCoin, this);
  }

  spawnPlatform(platform) {
    this.add.sprite(platform.x, platform.y, platform.image);
  }

  spawnCoin(coin) {
    const sprite = this.coins.create(coin.x, coin.y, 'coin');
    sprite.anchor.set(0.5, 0.5);
    sprite.animations.add('rotate', [0, 1, 2, 1], 6, true);
    sprite.animations.play('rotate');
    this.physics.enable(sprite);
    sprite.body.allowGravity = false;
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);

      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);

      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}

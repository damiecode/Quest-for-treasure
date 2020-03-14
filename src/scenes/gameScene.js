import Phaser from 'phaser';
import makeAnimations from '../animations/heroanimations';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('background', 'assets/images/background.png');
    this.load.image('trees', 'assets/images/trees.png');
    this.load.image('clouds', 'assets/images/clouds.png');
    this.load.image('platform', 'assets/images/platform.png');
    this.load.image('ice-platform', 'assets/images/ice-platform.png');
    this.load.spritesheet('dude', 'assets/images/dude.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.on('complete', () => {
      makeAnimations(this);
    });
    this.load.spritesheet('coin', './assets/images/coin_animated.png', {
      frameWidth: 22,
      frameHeight: 22,
    });
    this.load.spritesheet('spider', './assets/images/spider.png', {
      frameWidth: 42,
      frameHeight: 32,
    });
  }

  create() {
    this.add.sprite(0, 0, 'background').setOrigin(0, 0);
    this.sky = this.add.tileSprite(0, 0, 640, 480, 'clouds');
    this.sky.fixedToCamera = true;
    this.add.sprite(0, 1906, 'trees');
    this.cursors = this.input.keyboard.createCursorKeys();
    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(0, 64, 'ice-platform');
    this.platforms.create(200, 180, 'platform');
    this.platforms.create(400, 296, 'ice-platform');
    this.platforms.create(600, 412, 'platform');

    this.player = this.physics.add.sprite(100, 450, 'dude');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.enemy = this.physics.add.sprite(200, 450, 'spider');
    this.enemy.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.enemy, this.platforms);
    this.physics.add.collider(this.coins, this.platforms);

    this.coins = this.physics.add.group({
      key: 'coin',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    // this.coins.children.iterate((child) => {
    //   child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    // });
  }

  // collectCoin(player, coins) {
  //   this.coins.disableBody(true, true);
  // }

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

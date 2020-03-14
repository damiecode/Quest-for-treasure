import Phaser from 'phaser';
import makeAnimations from '../animations/heroanimations';


let player;
let coins;
let platforms;
let cursors;
let enemy;


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
    this.add.sprite(0, 0, 'background').setOrigin(0, 0).setScale(2);
    this.sky = this.add.tileSprite(0, 0, 640, 480, 'clouds');
    this.sky.fixedToCamera = true;
    this.add.sprite(0, 1906, 'trees');
    this.cursors = this.input.keyboard.createCursorKeys();
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(0, 64, 'ice-platform');
    platforms.create(200, 180, 'platform');
    platforms.create(400, 296, 'ice-platform');
    platforms.create(600, 412, 'platform');

    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    enemy = this.physics.add.sprite(200, 450, 'spider');
    enemy.setCollideWorldBounds(true);

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(enemy, platforms);
    this.physics.add.collider(coins, platforms);

    coins = this.physics.add.group({
      key: 'coin',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    coins.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(coins, platforms);

    this.physics.add.overlap(player, coins, collectCoin, null, this);
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

  // eslint-disable-next-line class-methods-use-this
  collectCoin(player, coins) {
    coins.disableBody(true, true);
  }
}

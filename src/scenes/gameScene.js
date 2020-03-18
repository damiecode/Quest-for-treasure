/* eslint-disable class-methods-use-this */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-vars */
import Phaser from 'phaser';
import makeAnimations from '../animations/animations';
import config from '../config';

let player;
let coins;
let platforms;
let cursors;
let bombs;
let door;
let key;
let chicks;
let score = 0;
let scoreText;
let gameOverText;

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  init() {
    this.hasKey = false;
  }

  preload() {
    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('background', 'assets/images/sky.png');
    this.load.image('clouds', 'assets/images/clouds.png');
    this.load.image('platform', 'assets/images/platform.png');
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
    this.load.spritesheet('door', './assets/images/door.png', {
      frameWidth: 42,
      frameHeight: 66,
    });
    this.load.spritesheet('chicks', './assets/images/chick.png', {
      frameWidth: 22,
      frameHeight: 22,
    });
    this.load.image('key', './assets/images/key.png');
    this.load.image('bomb', 'assets/images/bomb.png');
    this.load.audio('coinSound', ['assets/audio/coin.wav']);
    this.load.audio('keySound', ['assets/audio/key.wav']);
    this.load.audio('doorSound', ['assets/audio/door.wav']);
    this.load.audio('jumpSound', ['assets/audio/jump.wav']);
    this.load.audio('gameOver', ['assets/audio/game-over-2.wav']);
  }

  create() {
    this.add.sprite(0, 0, 'background').setOrigin(0, 0).setScale(2);
    this.sky = this.add.tileSprite(0, 0, 640, 480, 'clouds');
    this.sky.fixedToCamera = true;
    cursors = this.input.keyboard.createCursorKeys();
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(0, 64, 'platform');
    platforms.create(200, 180, 'platform');
    platforms.create(400, 296, 'platform');
    platforms.create(600, 412, 'platform');
    platforms.create(700, 296, 'platform');
    platforms.create(400, 80, 'platform');

    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    chicks = this.physics.add.sprite(220, 20, 'chicks');
    chicks.setBounceX(1);
    chicks.setBounceY(0);
    chicks.setCollideWorldBounds(true);
    chicks.body.velocity.x = 80;

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(chicks, platforms);

    scoreText = this.add.text(100, 16, `score: ${score}`, { fontSize: '32px', fill: '#000' });
    gameOverText = this.add.text(400, 300, 'Game Over', { fontSize: '64px', fill: '#000' });
    gameOverText.setOrigin(0.5);
    gameOverText.setVisible(false);

    this.createHud();

    door = this.physics.add.staticGroup();
    door.create(20, 450, 'door');

    key = this.physics.add.staticGroup();
    key.create(20, 20, 'key');

    coins = this.physics.add.staticGroup();
    for (let i = 0; i < 20; i++) {
      const x = Phaser.Math.RND.between(0, 800);
      const y = Phaser.Math.RND.between(0, 600);

      const newobj = coins.create(x, y, 'sprites', 'coin');
    }

    coins.anims.play('rotate');

    this.coinSound = this.sound.add('coinSound');
    this.keySound = this.sound.add('keySound');
    this.jumpSound = this.sound.add('jumpSound');
    this.doorSound = this.sound.add('doorSound');
    this.gameOverSound = this.sound.add('gameOver');

    bombs = this.physics.add.group({
      key: 'bomb',
      repeat: 1,
      setXY: { x: 12, y: 0, stepX: 20 },
    });

    bombs.children.iterate((child) => {
      child.setBounce(1);
      child.setCollideWorldBounds(true);
      child.setVelocity(Phaser.Math.Between(-200, 200), 20);
    });


    this.physics.add.collider(coins, platforms);
    this.physics.add.overlap(player, coins, this.collectCoin, null, this);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(player, bombs, this.getKilled, null, this);
    this.physics.add.collider(player, chicks, this.getKilled, null, this);
    this.physics.add.overlap(player, key, this.collectKey, null, this);
    this.physics.add.overlap(player, door, this.openDoor,
      (player, door) => this.hasKey && player.body.touching.down, this);
  }

  // eslint-disable-next-line class-methods-use-this
  update() {
    if (cursors.left.isDown) {
      player.setVelocityX(-160);

      player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);

      player.anims.play('right', true);
    } else {
      player.setVelocityX(0);

      player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
      this.jumpSound.play();
    }

    this.physics.collide(this, platforms, (chick, platform) => {
      if (chick.body.velocity.x > 0 && chick.x > platform.x + (platform.width - chick.width)
              || chick.body.velocity.x < 0 && chick.x < platform.x) {
        chick.body.velocity.x *= -1;
      }
      if (chick.body.velocity.x > 0) {
        chick.anims.play('eRight', true);
      } else {
        chick.anims.play('eLeft', true);
      }
    });

    this.physics.collide(this, chicks, (chick, chicks) => {
      chick.body.velocity.x *= -1.0001;
    });
  }

  // eslint-disable-next-line class-methods-use-this
  collectCoin(_player, coins) {
    this.coinSound.play();
    coins.disableBody(true, true);
    score += 10;
    scoreText.setText(`Score: ${score}`);
  }

  collectKey(_player, key) {
    key.disableBody(true, true);
    this.hasKey = true;
  }

  openDoor(player, door) {
    this.doorSound.play();
    this.scene.start('GameScene2');
  }

  createHud() {
    const coinIcon = this.make.image(0, 0, 'icon:coin');
    this.hud = this.physics.add.group();
    this.hud.add(coinIcon);
    this.hud.setOrigin(10, 10);
  }


  getKilled(player, enemy) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    this.gameOverSound.play();
    gameOverText.setVisible(true);
    this.restart();
  }

  restart() {
    this.scene.start('TitleScene');
  }
}

/* eslint-disable no-unused-vars */
import Phaser from 'phaser';
import makeAnimations from '../animations/animations';


let player;
let coins;
let platforms;
let movingPlatforms;
let movingPlatforms1;
let movingPlatforms2;
let movingPlatforms3;
let movingPlatforms4;
let cursors;
let bombs;
let door;
let key;
let score = 0;
let livesText;
let scoreText;
let gameOverText;

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  init() {
    this.hasKey = false;
    this.lives = 3;
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
    movingPlatforms = this.physics.add.image(20, 64, 'platform');
    movingPlatforms1 = this.physics.add.image(200, 180, 'platform');
    movingPlatforms2 = this.physics.add.image(400, 296, 'platform');
    movingPlatforms3 = this.physics.add.image(600, 412, 'platform');
    movingPlatforms4 = this.physics.add.image(700, 296, 'platform');
    movingPlatforms1.setCollideWorldBounds(true);
    movingPlatforms2.setCollideWorldBounds(true);
    movingPlatforms3.setCollideWorldBounds(true);
    movingPlatforms4.setCollideWorldBounds(true);

    this.tweens.timeline({
      targets: movingPlatforms.body.velocity,
      loop: -1,
      tweens: [
        {
          x: 0, y: -200, duration: 2000, ease: 'Stepped',
        },
        {
          x: 0, y: 0, duration: 1000, ease: 'Stepped',
        },
        {
          x: 150, y: 100, duration: 4000, ease: 'Stepped',
        },
        {
          x: 0, y: -200, duration: 2000, ease: 'Stepped',
        },
        {
          x: 0, y: 0, duration: 1000, ease: 'Stepped',
        },
        {
          x: -150, y: 100, duration: 4000, ease: 'Stepped',
        },
      ],
    });
    this.tweens.timeline({
      targets: movingPlatforms1.body.velocity,
      loop: -1,
      tweens: [
        {
          x: 0, y: 300, duration: 2000, ease: 'Stepped',
        },
        {
          x: 0, y: -200, duration: 1000, ease: 'Stepped',
        },
        {
          x: 150, y: 100, duration: 4000, ease: 'Stepped',
        },
        {
          x: -150, y: 100, duration: 2000, ease: 'Stepped',
        },
        {
          x: 0, y: 0, duration: 1000, ease: 'Stepped',
        },
        {
          x: -150, y: 300, duration: 4000, ease: 'Stepped',
        },
      ],
    });
    this.tweens.timeline({
      targets: movingPlatforms2.body.velocity,
      loop: -1,
      tweens: [
        {
          x: -150, y: -300, duration: 2000, ease: 'Stepped',
        },
        {
          x: 0, y: 200, duration: 1000, ease: 'Stepped',
        },
        {
          x: 150, y: 100, duration: 4000, ease: 'Stepped',
        },
        {
          x: 0, y: -300, duration: 2000, ease: 'Stepped',
        },
        {
          x: 0, y: 0, duration: 1000, ease: 'Stepped',
        },
        {
          x: -300, y: 100, duration: 4000, ease: 'Stepped',
        },
      ],
    });
    this.tweens.timeline({
      targets: movingPlatforms3.body.velocity,
      loop: -1,
      tweens: [
        {
          x: 300, y: -200, duration: 2000, ease: 'Stepped',
        },
        {
          x: 0, y: 150, duration: 1000, ease: 'Stepped',
        },
        {
          x: 200, y: 100, duration: 4000, ease: 'Stepped',
        },
        {
          x: 80, y: -200, duration: 2000, ease: 'Stepped',
        },
        {
          x: 0, y: 0, duration: 1000, ease: 'Stepped',
        },
        {
          x: -250, y: 100, duration: 4000, ease: 'Stepped',
        },
      ],
    });
    this.tweens.timeline({
      targets: movingPlatforms.body.velocity,
      loop: -1,
      tweens: [
        {
          x: 0, y: -200, duration: 2000, ease: 'Stepped',
        },
        {
          x: -200, y: 0, duration: 1000, ease: 'Stepped',
        },
        {
          x: 150, y: 300, duration: 4000, ease: 'Stepped',
        },
        {
          x: 0, y: -200, duration: 2000, ease: 'Stepped',
        },
        {
          x: 0, y: 200, duration: 1000, ease: 'Stepped',
        },
        {
          x: -150, y: 100, duration: 4000, ease: 'Stepped',
        },
      ],
    });
    this.tweens.timeline({
      targets: movingPlatforms4.body.velocity,
      loop: -1,
      tweens: [
        {
          x: 0, y: -200, duration: 2000, ease: 'Stepped',
        },
        {
          x: 0, y: 0, duration: 1000, ease: 'Stepped',
        },
        {
          x: 150, y: 100, duration: 4000, ease: 'Stepped',
        },
        {
          x: 0, y: -200, duration: 2000, ease: 'Stepped',
        },
        {
          x: 0, y: 0, duration: 1000, ease: 'Stepped',
        },
        {
          x: -150, y: 100, duration: 4000, ease: 'Stepped',
        },
      ],
    });

    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, movingPlatforms);
    this.physics.add.collider(player, movingPlatforms1);
    this.physics.add.collider(player, movingPlatforms2);
    this.physics.add.collider(player, movingPlatforms3);
    this.physics.add.collider(player, movingPlatforms4);

    this.physics.add.collider(platforms, movingPlatforms);
    this.physics.add.collider(platforms, movingPlatforms1);
    this.physics.add.collider(platforms, movingPlatforms2);
    this.physics.add.collider(platforms, movingPlatforms3);
    this.physics.add.collider(platforms, movingPlatforms4);

    this.physics.add.collider(movingPlatforms1, movingPlatforms);
    this.physics.add.collider(movingPlatforms1, movingPlatforms2);
    this.physics.add.collider(movingPlatforms1, movingPlatforms3);
    this.physics.add.collider(movingPlatforms1, movingPlatforms4);
    this.physics.add.collider(movingPlatforms2, movingPlatforms3);
    this.physics.add.collider(movingPlatforms2, movingPlatforms4);
    this.physics.add.collider(movingPlatforms2, movingPlatforms3);
    this.physics.add.collider(movingPlatforms2, movingPlatforms);
    this.physics.add.collider(movingPlatforms, movingPlatforms3);
    this.physics.add.collider(movingPlatforms, movingPlatforms4);
    this.physics.add.collider(movingPlatforms4, movingPlatforms3);

    scoreText = this.add.text(100, 16, `score: ${score}`, { fontSize: '32px', fill: '#000' });
    livesText = this.add.text(350, 16, `Lives: ${this.lives}`, { fontSize: '32px', fill: '#000' });
    gameOverText = this.add.text(400, 300, 'Game Over', { fontSize: '64px', fill: '#000' });
    gameOverText.setOrigin(0.5);
    gameOverText.setVisible(false);

    this.createHud();

    door = this.physics.add.staticGroup();
    door.create(20, 450, 'door');

    key = this.physics.add.staticGroup();
    key.create(20, 20, 'key');

    coins = this.physics.add.group({
      key: 'coin',
      repeat: 15,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    this.coinSound = this.sound.add('coinSound');
    this.keySound = this.sound.add('keySound');
    this.jumpSound = this.sound.add('jumpSound');
    this.doorSound = this.sound.add('doorSound');
    this.gameOverSound = this.sound.add('gameOver');

    bombs = this.physics.add.group({
      key: 'bomb',
      repeat: 1,
      setXY: { x: 12, y: 0, stepX: 90 },
    });

    coins.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    bombs.children.iterate((child) => {
      child.setBounce(1);
      child.setCollideWorldBounds(true);
      child.setVelocity(Phaser.Math.Between(-200, 200), 20);
    });

    this.physics.add.collider(coins, platforms);
    this.physics.add.overlap(player, coins, this.collectCoin, null, this);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(player, bombs, this.hitBomb, null, this);
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
  }

  // eslint-disable-next-line class-methods-use-this
  collide(movingPlatforms, player) {
    if (movingPlatforms.body.move && movingPlatforms.body.touching.up && player.body.touching.down) {
      player.setGravity(10000);
    }
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


  hitBomb(player, bomb) {
    if (this.lives <= 0) {
      this.physics.pause();
      player.setTint(0xff0000);
      player.anims.play('turn');
      this.gameOverSound.play();
      gameOverText.setVisible(true);
      score = 0;
      this.restart();
    } else {
      this.lives -= 1;
      score -= 20;
      this.create();
    }
  }

  restart() {
    this.scene.start('ScoresScene');
  }
}

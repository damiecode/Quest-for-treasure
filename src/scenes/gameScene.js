import Phaser from 'phaser';
import makeAnimations from '../animations/animations';


let player;
let coins;
let platforms;
let cursors;
let enemy;
let enemy1;
let enemy2;
let door;
let key;
let enemyWalls;
let score = 0;
let scoreText;


export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  init() {
    this.coinPickupCount = 0;
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
      frameWidth: 32,
      frameHeight: 22,
    });

    this.load.spritesheet('door', './assets/images/door.png', {
      frameWidth: 42,
      frameHeight: 66,
    });
    this.load.image('key', './assets/images/key.png');
    this.load.image('invisible-wall', './assets/images/invisible_wall.png');
    this.load.image('icon:coin', 'assets/images/coin_icon.png');
  }

  create() {
    this.add.sprite(0, 0, 'background').setOrigin(0, 0).setScale(2);
    this.sky = this.add.tileSprite(0, 0, 640, 480, 'clouds');
    this.sky.fixedToCamera = true;
    this.add.sprite(0, 1906, 'trees');
    cursors = this.input.keyboard.createCursorKeys();
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(0, 64, 'ice-platform');
    platforms.create(200, 180, 'platform');
    platforms.create(400, 296, 'ice-platform');
    platforms.create(600, 412, 'platform');
    platforms.create(700, 296, 'ice-platform');
    platforms.create(400, 80, 'platform');

    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    enemy = this.physics.add.sprite(160, 20, 'spider');
    enemy1 = this.physics.add.sprite(700, 20, 'spider');
    enemy2 = this.physics.add.sprite(400, 200, 'spider');
    enemy.setCollideWorldBounds(true);
    enemy1.setCollideWorldBounds(true);
    enemy2.setCollideWorldBounds(true);
    enemy.anims.play('crawl');

    enemyWalls = this.physics.add.staticGroup();
    enemyWalls.create(158, 250, 'invisible-wall');
    enemyWalls.create(270, 250, 'invisible-wall');
    // enemyWalls.setVisible = false;

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(enemy, platforms);
    this.physics.add.collider(enemy1, platforms);
    this.physics.add.collider(enemy2, platforms);
    this.physics.add.collider(enemy, enemyWalls);
    this.physics.add.collider(enemy1, enemyWalls);
    this.physics.add.collider(enemy2, enemyWalls);

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

    coins.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(coins, platforms);

    this.physics.add.overlap(player, coins, this.collectCoin, null, this);
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
    }
  }

  // eslint-disable-next-line class-methods-use-this
  collectCoin(player, coins) {
    coins.disableBody(true, true);
    score += 10;
    scoreText.setText(`Score: ${score}`);

    if (coins.countActive(true) === 0) {
      coins.children.iterate((child) => {
        child.enableBody(true, child.x, 0, true, true);
      });
    }
  }

  createHud() {
    const coinIcon = this.make.image(0, 0, 'icon:coin');
    this.hud = this.physics.add.group();
    this.hud.add(coinIcon);
    this.hud.setOrigin(10, 10);
  }


  hitBomb(player, enemy) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    // eslint-disable-next-line no-undef
    gameOver = true;
  }

  hitEnemy() {
    this.physics.add.overlap(player, enemy, this.onHeroVsEnemy, null, this);
  }

  onHeroVsEnemy(hero, enemy) {
    if (player.body.velocity.y > 0) {
      enemy.disableBody(true, true);
    } else {
      this.scene.restart();
    }
  }
}

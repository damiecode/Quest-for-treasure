import Phaser from 'phaser';
import makeAnimations from '../animations/heroanimations';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.image('background', './assets/images/background.png');
    this.load.image('platform', './assets/images/grass_4x1.png');
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
    this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.cursors = this.input.keyboard.createCursorKeys();
    const platform = this.physics.add.image(100, 500, 'platform')
      .setImmovable(true)
      .setVelocity(100, -100);

    platform.body.setAllowGravity(false);
    const player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    const enemy = this.physics.add.sprite(200,450, 'spider');
    enemy.setCollideWorldBounds(true);
    this.physics.add.collider(player, platform);
    this.physics.add.collider(enemy, platform);
  }

  this.tweens.timeline({
    targets: platform.body.velocity,
    loop: -1,
    tweens: [
      { x:    0, y: -200, duration: 2000, ease: 'Stepped' },
      { x:    0, y:    0, duration: 1000, ease: 'Stepped' },
      { x:  150, y:  100, duration: 4000, ease: 'Stepped' },
      { x:    0, y: -200, duration: 2000, ease: 'Stepped' },
      { x:    0, y:    0, duration: 1000, ease: 'Stepped' },
      { x: -150, y:  100, duration: 4000, ease: 'Stepped' }
    ]
  });

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
      this.player.setVelocityY(-500);
    }
  }
}

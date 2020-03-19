import Phaser from 'phaser';

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(config, cursor) {
    super(
      config.scene,
      config.x,
      config.y,
      config.name,
    );
    config.scene.physics.world.enableBody(this);
    this.score = 0;
    this.name = config.name;
    this.cursors = cursor;
  }

  create() {
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
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
      this.jumpSound.play();
    }
  }

  getScore() {
    return this.score;
  }

  setScore(score) {
    this.score = score;
  }

  getPlayerName() {
    return this.name;
  }

  updateScore() {
    this.scoreText.setText(`Score: ${this.score}`);
  }

  async uploadScore() {
    const player = {
      user: this.getPlayerName(),
      score: this.getScore(),
    };
    try {
      const response = await fetch(
        'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/RQ7wTRILVQffKgAUBlO7/scores/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(player),
        },
      );

      const result = await response.json();
      return result;
    } catch (err) {
      console.log('error unable to fetch the data Please try again!');
      return err;
    }
  }
}

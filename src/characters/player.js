import Phaser from 'phaser';

class PlayerFactory extends Phaser.Scene {
  create(player, coins, platforms, enemy, door, key) {
    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, door);
    this.physics.add.overlap(player, coins, this.collectCoin, null, this);
    this.physics.add.overlap(player, key, this.collectKey, null, this);
    this.physics.add.overlap(player, door, this.openDoor,
      (player, door) => this.hasKey && player.body.touching.down, this);
  }
}

export default PlayerFactory;
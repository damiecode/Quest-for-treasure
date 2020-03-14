const playerFactory = (player, coins, platforms, enemy, door, key) => {
  player = this.physics.add.sprite(100, 450, 'dude');
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(player, door);
  this.physics.add.overlap(player, coins, this.collectCoin, null, this);
  this.physics.add.overlap(player, key, this.collectKey, null, this);
  this.physics.add.overlap(player, door, this.openDoor,
    (player, door) => this.hasKey && player.body.touching.down, this);

  return (() => {
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
  });
};

export default playerFactory;
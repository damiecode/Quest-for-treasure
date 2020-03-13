import Phaser from 'phaser';


class Hero extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'hero');
  }

  spawnCharacters(data) {
    this.hero = new Hero(this.game, data.hero.x, data.hero.y);
    this.add.existing(this.hero);
  }
}

export default Hero;

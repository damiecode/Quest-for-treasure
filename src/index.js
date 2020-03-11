
import Phaser from 'phaser';

import BootScene from './scenes/bootScene';
import SplashScene from './scenes/splashScene';
import GameScene from './scenes/gameScene';

import config from './config';

const gameConfig = Object.assign(config, {
  scene: [BootScene, SplashScene, GameScene],
});

class Game extends Phaser.Game {
  constructor() {
    super(gameConfig);
  }
}

window.game = new Game();
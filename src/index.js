
import Phaser from 'phaser';

import BootScene from './scenes/bootScene';
import PreloaderScene from './scenes/preloaderScene';
import GameScene from './scenes/gameScene';

import config from './config';

const gameConfig = Object.assign(config, {
  scene: [BootScene, PreloaderScene, GameScene],
});

class Game extends Phaser.Game {
  constructor() {
    super(gameConfig);
  }
}

window.game = new Game();
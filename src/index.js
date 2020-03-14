
import Phaser from 'phaser';

import BootScene from './scenes/bootScene';
import PreloaderScene from './scenes/preloaderScene';
import TitleScene from './scenes/titleScene';
import OptionsScene from './scenes/optionsScene';
import GameScene from './scenes/gameScene';
import GameScene2 from './scenes/gameScene2';

import config from './config';

const gameConfig = Object.assign(config, {
  scene: [BootScene, PreloaderScene, TitleScene, OptionsScene, GameScene, GameScene2],
});

class Game extends Phaser.Game {
  constructor() {
    super(gameConfig);
  }
}

window.game = new Game();
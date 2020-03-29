
import Phaser from 'phaser';

import Model from './model';
import BootScene from './scenes/bootScene';
import PreloaderScene from './scenes/preloaderScene';
import TitleScene from './scenes/titleScene';
import OptionsScene from './scenes/optionsScene';
import InstructionsScene from './scenes/instructionScene';
import GameScene from './scenes/gameScene';
import GameScene2 from './scenes/gameScene2';
import PlayerInfo from './scenes/playerName';
import ScoresScene from './scenes/scoreScene';

import config from './config';

const gameConfig = Object.assign(config, {
  scene: [BootScene, PreloaderScene, TitleScene, OptionsScene, InstructionsScene, GameScene,
    GameScene2, PlayerInfo, ScoresScene],
});


class Game extends Phaser.Game {
  constructor() {
    super(gameConfig);
    const model = new Model();
    this.globals = { model, bgMusic: null };
  }
}

window.game = new Game();
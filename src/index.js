/* eslint-disable no-unused-vars */

import Phaser from 'phaser';

import Model from './model';
import Score from './player';
import BootScene from './scenes/bootScene';
import PreloaderScene from './scenes/preloaderScene';
import TitleScene from './scenes/titleScene';
import OptionsScene from './scenes/optionsScene';
import InstructionsScene from './scenes/instructionScene';
import GameScene from './scenes/gameScene';
import GameScene2 from './scenes/gameScene2';
import ScoresScene from './scenes/scoreScene';

import config from './config';

const gameConfig = Object.assign(config, {
  scene: [BootScene, PreloaderScene, TitleScene, OptionsScene, InstructionsScene, GameScene,
    GameScene2, ScoresScene],
});


class Game extends Phaser.Game {
  constructor() {
    super(gameConfig);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    const score = new Score();
    this.score = { score };
  }
}

const game = new Game();
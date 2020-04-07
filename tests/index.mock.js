/* eslint-disable no-unused-vars */

import Phaser from 'phaser';

import BootScene from '../src/scenes/bootScene';
import PreloaderScene from '../src/scenes/preloaderScene';
import TitleScene from '../src/scenes/titleScene';
import OptionsScene from '../src/scenes/optionsScene';
import InstructionsScene from '../src/scenes/instructionScene';
import GameScene from '../src/scenes/gameScene';
import GameScene2 from '../src/scenes/gameScene2';
import PlayerInfo from '../src/scenes/playerName';
import ScoresScene from '../src/scenes/scoreScene';

import config from '../src/config';

const gameConfig = Object.assign(config, {
  scene: [BootScene, PreloaderScene, TitleScene, OptionsScene, InstructionsScene, GameScene,
    GameScene2, PlayerInfo, ScoresScene],
});


export default class Game extends Phaser.Game {
  constructor() {
    super(gameConfig);
  }
}

const game = new Game();
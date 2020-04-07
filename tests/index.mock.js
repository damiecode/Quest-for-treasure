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

export default function initiate() {
  const gameConfig = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 960,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        enableBody: true,
      },
    },
    scene: [BootScene, PreloaderScene, TitleScene, OptionsScene, InstructionsScene, GameScene,
      GameScene2, PlayerInfo, ScoresScene],
  };

  const game = new Phaser.Game(gameConfig);
  return game;
}

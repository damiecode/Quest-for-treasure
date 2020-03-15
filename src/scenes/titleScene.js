/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import 'phaser';
import config from '../config';
import Button from '../objects/button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  create() {
    this.gameButton = new Button(this, config.width / 2, config.height - 100, 'blueButton1', 'blueButton2', 'Play', 'GameScene');

    this.optionsButton = new Button(this, config.width / 2, config.height - 100, 'blueButton1', 'blueButton2', 'Options', 'OptionsScene');

    this.scoresButton = new Button(this, config.width / 2, config.height - 100, 'blueButton1', 'blueButton2', 'Scores', 'ScoresScene');

    this.model = this.sys.global.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.globals.bgMusic = this.bgMusic;
    }
  }
}

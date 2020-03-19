/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
import Phaser from 'phaser';
import PlayerName from './playerName';
import Button from '../objects/button';

export default class ScoreBoard extends Phaser.Scene {
  constructor() {
    super('Scores');
    this.game;
    this.menuButton;
  }

  create() {
    this.add.text(80, 10, 'Leaderboard', { fontSize: '32px', fill: 'green' });

    this.menuButton = new Button(
      this,
      400,
      500,
      'blueButton1',
      'blueButton2',
      'Back',
      'TitleScene'
    );
  }

  async getScore() {
    let y = 50;
    const scores = new PlayerName();
    const scoreBoard = await scores.getUserScore();
    const scoreArr = scoreBoard.result;
    for (let i = 0; i < scoreArr.length; i += 1) {
      y += 10;
      this.add.text(
        80,
        y,
        `Name: ${scoreArr[i].user} Score: ${scoreArr[i].score}`,
        { fontSize: '18px', fill: '#fff', paddingTop: '4px' }
      );
    }
  }
}

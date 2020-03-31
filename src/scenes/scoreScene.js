/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
import Phaser from 'phaser';
import PlayerName from './playerName';
import Button from '../objects/button';

const scores = new PlayerName();

export default class ScoreBoard extends Phaser.Scene {
  constructor() {
    super('ScoresScene');
    this.scores = [];
  }

  preload() {
    this.load.bitmapFont('arcade', 'assets/images/arcade.png', 'assets/images/arcade.xml');
  }

  create() {
    this.add.text(80, 10, 'Leaderboard', { fontSize: '32px', fill: 'blue' });
    this.add.bitmapText(100, 110, 'arcade', 'RANK  SCORE   NAME').setTint(0xffffff);

    for (let i = 1; i < 6; i += 1) {
      if (scores[i - 1]) {
        this.add.bitmapText(100, 160 + 50 * i, 'arcade', ` ${i}      ${scores[i - 1].highScore}    ${scores[i - 1].name}`).setTint(0xffffff);
      } else {
        this.add.bitmapText(100, 160 + 50 * i, 'arcade', ` ${i}      0    ---`).setTint(0xffffff);
      }
    }

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
    const leaderboard = await scores.getLeaderboard();
    const scoreRes = leaderboard.result;
    for (let i = 0; i < scoreRes.length; i += 1) {
      y += 10;
      this.add.text(
        80,
        y,
        `Name: ${scoreRes[i].user} Score: ${scoreRes[i].score}`,
        { fontSize: '18px', fill: '#fff', paddingTop: '4px' }
      );
    }
  }
}

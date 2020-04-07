/* eslint-disable consistent-return */
/* eslint-disable no-alert */
/* eslint-disable class-methods-use-this */
import Phaser from 'phaser';
import Button from '../objects/button';
import PlayerInfo from './playerName';

const sorter = (object) => {
  const scoreArr = [];
  for (let i = 0; i < object.length; i += 1) {
    scoreArr.push([object[i].user, object[i].score]);
  }
  return Array.from(scoreArr).sort((a, b) => b[1] - a[1]);
};

export default class ScoreBoard extends Phaser.Scene {
  constructor() {
    super('ScoresScene');
  }

  preload() {
    this.load.html('table', 'assets/table.html');
  }

  create() {
    this.add.text(290, 10, 'Leaderboard', { fontSize: '32px', fill: '#3D85C6' });
    this.menuButton = new Button(
      this,
      400,
      550,
      'blueButton1',
      'blueButton2',
      'Back',
      'TitleScene',
    );
    sorter(this.ranking());
  }

  async ranking() {
    const htmlDom = this.add.dom(400, 90).createFromCache('table');
    const content = htmlDom.getChildByID('body');
    content.innerHTML = '';
    const scores = new PlayerInfo();
    const scoreBoard = await scores.getLeaderboard();
    const scoreArr = scoreBoard.result;
    for (let i = 0; i < scoreArr.length; i += 1) {
      const count = i + 1;
      const row = content.insertRow(0);
      row.setAttribute('data-index', `${i}`);
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      cell1.innerHTML = count;
      cell2.innerHTML = scoreArr[i].user;
      cell3.innerHTML = scoreArr[i].score;
    }
  }
}

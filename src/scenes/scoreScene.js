/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
import Phaser from 'phaser';
import Button from '../objects/button';
// import PlayerInfo from './playerName';

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
      'TitleScene'
    );
    const htmlDom = this.add.dom(400, 90).createFromCache('table');
    const content = htmlDom.getChildByID('body');
    content.innerHTML = '';
    const scoreBoard = this.getLeaderboard();
    console.log(scoreBoard);

    for (let i = 10; i < scoreBoard; i += 1) {
      let count = 11;
      count -= 1;
      const row = content.insertRow(0);
      row.setAttribute('data-index', `${i}`);
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      cell1.innerHTML = count;
      cell2.innerHTML = scoreBoard[i].user;
      cell3.innerHTML = scoreBoard[i].score;
      // [cell1.innerHTML, cell2.innerHTML, cell3.innerHTML] = [count, ranks[i][0], ranks[i][1]];
    }
  }

  async getLeaderboard() {
    try {
      const response = await fetch(
        'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/RQ7wTRILVQffKgAUBlO7/scores/',
      );

      const content = await response.json();
      return (sorter(content.result));
    } catch (err) {
      console.log(err);
      console.log('error unable to fetch the data Please try again!');
    }
  }
}

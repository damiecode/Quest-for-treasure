/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
import Phaser from 'phaser';
import Button from '../objects/button';
import ranking from '../DOM/ranking';

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

  create() {
    this.add.text(80, 10, 'Leaderboard', { fontSize: '32px', fill: 'blue' });

    this.menuButton = new Button(
      this,
      400,
      500,
      'blueButton1',
      'blueButton2',
      'Back',
      'TitleScene'
    );
    this.getLeaderboard();
  }


  async getLeaderboard() {
    try {
      const response = await fetch(
        'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/RQ7wTRILVQffKgAUBlO7/scores/',
      );

      const content = await response.json();
      return ranking(sorter(content.result));
    } catch (err) {
      console.log(err);
      console.log('error unable to fetch the data Please try again!');
    }
  }
}

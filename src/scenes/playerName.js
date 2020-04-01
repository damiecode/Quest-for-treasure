/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */

import Phaser from 'phaser';
import updateLeaderboard from '../leaderboard';

const sorter = (object) => {
  const scoreArr = [];
  for (let i = 0; i < object.length; i += 1) {
    scoreArr.push([object[i].user, object[i].score]);
  }
  return Array.from(scoreArr).sort((a, b) => b[1] - a[1]);
};

export default class PlayerInfo extends Phaser.Scene {
  constructor() {
    super('PlayerInfo');
    this.player;
  }

  preload() {
    this.load.html('info', 'assets/form.html');
  }

  create() {
    const htmlDom = this.add.dom(400, 200).createFromCache('info');
    htmlDom.addListener('click');
    htmlDom.on('click', e => {
      if (e.target.name === 'submit') {
        this.player = htmlDom.getChildByName('player');

        if (this.player.value !== '') {
          htmlDom.removeListener('click');
          htmlDom.setVisible(false);
          this.scene.start('ScoresScene', {
            player: this.player.value,
          });
        }
      }
    });
    updateLeaderboard(this.player, this.score);
  }

  async getLeaderboard() {
    try {
      const response = await fetch(
        'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/RQ7wTRILVQffKgAUBlO7/scores/',
      );

      const result = await response.json();
      return sorter(result);
    } catch (err) {
      console.log('error unable to fetch the data Please try again!');
    }
  }
}

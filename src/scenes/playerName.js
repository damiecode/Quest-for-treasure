/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */

import Phaser from 'phaser';

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
          this.scene.start('TitleScene', {
            player: this.player.value,
          });
        }
      }
    });
  }

  async getLeaderboard() {
    try {
      const response = await fetch(
        'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/RQ7wTRILVQffKgAUBlO7/scores/',
      );

      const result = await response.json();
      return result;
    } catch (err) {
      console.log('error unable to fetch the data Please try again!');
    }
  }

  async updateLeaderboard() {
    const results = JSON.parse(localStorage.getItem('result'));
    (async () => {
      const scoring = {
        user: results[0].user,
        score: results[0].score,
      };
      try {
        const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/RQ7wTRILVQffKgAUBlO7/scores/',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(scoring),
          });
        const content = await response.json();
        console.log(content.result);
      } catch (err) {
        throw new Error('Unable to send score!');
      }
    })();
  }
}

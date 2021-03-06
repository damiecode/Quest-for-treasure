/* eslint-disable no-alert */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */

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
        localStorage.setItem('name', this.player.value);
        if (this.player.value !== '') {
          htmlDom.removeListener('click');
          htmlDom.setVisible(false);
          this.scene.start('GameScene', {
            player: this.player.value,
          });
        }
        return this.player.value;
      }
    });
  }

  async getLeaderboard() {
    try {
      const response = await fetch(
        'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/RQ7wTRILVQffKgAUBlO7/scores/',
      );

      const content = await response.json();
      return content;
    } catch (err) {
      alert('error unable to fetch the data Please try again!');
    }
  }

  async uploadScore(name, scores) {
    const player = {
      user: name,
      score: scores,
    };
    try {
      const response = await fetch(
        'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/RQ7wTRILVQffKgAUBlO7/scores/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(player),
        },
      );

      const result = await response.json();
      return result;
    } catch (err) {
      alert('error unable to fetch the data Please try again!');
    }
  }
}

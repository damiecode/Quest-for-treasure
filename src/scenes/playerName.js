/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */

import Phaser from 'phaser';
import updateLeaderboard from '../leaderboard';

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

  async getScore() {
    return this.score;
  }
}

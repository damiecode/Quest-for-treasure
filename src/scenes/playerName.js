/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */
import Phaser from 'phaser';

export default class PlayerInfo extends Phaser.Scene {
  constructor() {
    super('PlayerName');
    this.player;
  }

  preload() {
    this.load.html('info', '../form.html');
  }

  create() {
    const htmlDom = this.add.dom(400, 200).createFromCache('info');
    htmlDom.addListener('click');
    htmlDom.on('click', e => {
      if (e.target.name === 'submit') {
        this.player = this.getChildByName('player');

        if (this.player.value !== '') {
          this.removeListener('click');
          this.setVisible(false);
          this.scene.start('GameScene', {
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
      return err;
    }
  }
}

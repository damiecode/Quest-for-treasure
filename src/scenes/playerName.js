/* eslint-disable no-unused-expressions */
import Phaser from 'phaser';

export default class PlayerInfo extends Phaser.Scene {
  constructor() {
    super('PlayerName');
    this.player;
  }

  preload() {
    this.load.html('info', '../src/form.html');
  }

  create() {
    const htmlDom = this.add.dom(400, 200).createFromCache('info');
    htmlDom.addListener('click');
    htmlDom.on('click', (e) => {
      if (e.target.name === 'submit') {
        this.player = this.getChildByName('player');

        if (this.player.value !== '') {
          this.removeListener('click');
          this.setVisible(false);
          this.scene.start('TitleScene', {
            player: this.player.value,
          });
        }
      }
    });
  }
}

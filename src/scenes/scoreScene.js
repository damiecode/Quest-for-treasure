import Phaser from 'phaser';
import Button from '../objects/button';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'ScoresScene', active: true });

    // eslint-disable-next-line no-unused-expressions
    this.playerText;
  }

  preload() {
    this.load.image('block', 'assets/images/block.png');
    this.load.image('rub', 'assets/images/rub.png');
    this.load.image('end', 'assets/images/end.png');

    this.load.bitmapFont('arcade', 'assets/images/arcade.png', 'assets/images/arcade.xml');
  }

  create() {
    this.add.bitmapText(100, 260, 'arcade', 'RANK  SCORE   NAME').setTint(0xff00ff);
    this.add.bitmapText(100, 310, 'arcade', '1ST   50000').setTint(0xff0000);

    this.playerText = this.add.bitmapText(580, 310, 'arcade', '').setTint(0xff0000);

    this.input.keyboard.enabled = false;

    this.scene.launch('InputPanel');

    const panel = this.scene.get('InputPanel');

    panel.events.on('updateName', this.updateName, this);
    panel.events.on('submitName', this.submitName, this);
    this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Back', 'TitleScene');
  }

  submitName() {
    this.scene.stop('InputPanel');

    this.add.bitmapText(100, 360, 'arcade', '2ND   40000    ANT').setTint(0xff8200);
    this.add.bitmapText(100, 410, 'arcade', '3RD   30000    .-.').setTint(0xffff00);
    this.add.bitmapText(100, 460, 'arcade', '4TH   20000    BOB').setTint(0x00ff00);
    this.add.bitmapText(100, 510, 'arcade', '5TH   10000    ZIK').setTint(0x00bfff);
  }

  updateName(name) {
    this.playerText.setText(name);
  }
}
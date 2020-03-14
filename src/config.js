import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'content',
  width: 960,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 300 } },
  },
  audio: {
    disableWebAudio: true,
  },
};
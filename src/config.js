import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'content',
  width: 960,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: { debug: true, fps: 100, gravity: { y: 300 } },
  },
};
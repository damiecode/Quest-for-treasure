import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'content',
  physics: {
    default: 'arcade',
    arcade: { debug: true, fps: 100, gravity: { y: 300 } },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'content',
    width: 750,
    height: 1334,
  },
};
import Phaser from 'phaser';
import Leaderboard from '../leaderboard';

export default class ScoresScene extends Phaser.Scene {
  constructor() {
    super('ScoresScene');
  }

  init() {
    this.key = null;
  }

  createGameKey() {
    this.createGameKey.innerText = 'Creating game key...';
    const gameKeyPromise = Leaderboard.createGameKey('Quest for treasure');
    gameKeyPromise.then((gameKey) => {
      if (gameKey === null) {
        this.createGameKey.innerText = 'could not create game key. Please refresh and try again.';
      } else {
        this.key = gameKey;
        this.createGameKey.innerText = gameKey;
      }
    });
  }
}

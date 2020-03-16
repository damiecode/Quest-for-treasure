
import Phaser from 'phaser';

import Model from './model';
import BootScene from './scenes/bootScene';
import PreloaderScene from './scenes/preloaderScene';
import TitleScene from './scenes/titleScene';
import OptionsScene from './scenes/optionsScene';
import GameScene from './scenes/gameScene';
import GameScene2 from './scenes/gameScene2';
import scoreScene from './scenes/scoreScene';
import inputPanelScene from './scenes/inputPanel';
import starFieldScene from './scenes/starField';

import Leaderboard from './leaderboard';


import config from './config';

const gameConfig = Object.assign(config, {
  scene: [BootScene, PreloaderScene, TitleScene, OptionsScene, GameScene,
    GameScene2, scoreScene, inputPanelScene, starFieldScene],
});

const globalGame = {
  state: 'NOT_BEGUN',
  player: null,
  key: null,
};

const statusGameKey = document.getElementById('status-game-key');
setTimeout(() => {
  statusGameKey.innerText = 'Creating game key...';
  const gameKeyPromise = Leaderboard.createGameKey('Quest for treasure');
  gameKeyPromise.then((gameKey) => {
    if (gameKey === null) {
      statusGameKey.innerText = "Couldn't create game key. Refresh to try again.";
    } else {
      globalGame.key = gameKey;
      statusGameKey.innerText = gameKey;
    }
  });
});

const leaderboardState = {
  previous: globalGame.state,
};

const gameLeaderboard = scoreScene;

const leaderboardUpdate = () => {
  if (leaderboardState.previous !== globalGame.state) {
    leaderboardState.previous = globalGame.state;

    if (globalGame.state === 'GAME_OVER') {
      const gameKey = globalGame.key;
      const name = globalGame.player;
      const { points } = score;
      const userScorePromise = Leaderboard.postUserScore(gameKey, name, points);

      gameLeaderboard.innerText = 'Loading leaderboard...';

      userScorePromise.then(() => {
        const scoresPromise = Leaderboard.getScores(gameKey);
        scoresPromise.then((scores) => {
          const { result } = scores;
          result.sort((a, b) => a.score - b.score);

          const orderedList = document.createElement('ol');
          for (let i = 0; i < result.length; i += 1) {
            const listItem = document.createElement('li');
            listItem.innerText = `NAME: ${result[i].user}, SCORE: ${result[i].score}`;

            orderedList.append(listItem);
          }

          gameLeaderboard.innerText = '';
          gameLeaderboard.append(orderedList);
        }).catch(() => {
          gameLeaderboard.innerText = 'Something went wrong. Sorry.';
        });
      });
    }
  }
};

class Game extends Phaser.Game {
  constructor() {
    super(gameConfig);
    const model = new Model();
    this.globals = { model, bgMusic: null };
  }
}

window.game = new Game();
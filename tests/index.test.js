import Game from './index.mock';

describe('Testing mock index file', () => {
  const game = Game();
  test('Game is an object', () => {
    expect(typeof game).toBe('object');
  });
  test('Scene is an object', () => {
    expect(typeof game.scene.scenes).toBe('object');
  });
});
const config = require('../src/index');

test('player physics are enabled', () => {
  player.init();
  expect(game.physics.p2.enable).toBe(to.have.been.calledWith(player.sprite));
});

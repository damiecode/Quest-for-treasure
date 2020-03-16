const game = require('../src/objects/button');

const button = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'TitleScene');

test('creates a new button', () => {
  expect(button.targetScene).toBe('TitleScene');
});

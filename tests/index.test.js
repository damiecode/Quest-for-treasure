/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import Phaser from 'phaser';
// import Button from '../src/objects/button';

// const button = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'TitleScene');

// test('creates a new button', () => {
//   expect(button.targetScene).toBe('TitleScene');
// });

describe('Phaser', () => {
  it('Check the instance of Phaser', () => {
    expect(Phaser).toBeInstanceOf(Object);
  });

  it('Check Phaser version', () => {
    expect(Phaser).toHaveProperty('VERSION', '3.22.0');
  });
});
export default function makeAnimations(scene) {
  scene.anims.create({
    key: 'left',
    frames: scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: 'turn',
    frames: [{ key: 'dude', frame: 4 }],
    frameRate: 20,
  });

  scene.anims.create({
    key: 'right',
    frames: scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: 'eLeft',
    frames: scene.anims.generateFrameNumbers('chicks', { start: 0, end: 5 }),
    frameRate: 5,
    repeat: -1,
  });

  scene.anims.create({
    key: 'eRight',
    frames: scene.anims.generateFrameNumbers('chicks', { start: 5, end: 9 }),
    frameRate: 5,
    repeat: -1,
  });
}
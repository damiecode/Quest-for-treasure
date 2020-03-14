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
    key: 'eIdle',
    frames: scene.anims.generateFrameNames('enemy', { prefix: 'sprite', start: 1, end: 1 }),
    frameRate: 8,
    repeat: -1,
  });

  scene.anims.create({
    key: 'eWalkDown',
    frames: scene.anims.generateFrameNames('enemy', { prefix: 'sprite', start: 1, end: 5 }),
    frameRate: 8,
    repeat: -1,
  });

  scene.anims.create({
    key: 'eWalkLeft',
    frames: scene.anims.generateFrameNames('enemy', { prefix: 'sprite', start: 7, end: 11 }),
    frameRate: 8,
    repeat: -1,

  });

  scene.anims.create({
    key: 'eWalkRight',
    frames: scene.anims.generateFrameNames('enemy', { prefix: 'sprite', start: 13, end: 17 }),
    frameRate: 8,
    repeat: -1,

  });

  scene.anims.create({
    key: 'eWalkUp',
    frames: scene.anims.generateFrameNames('enemy', { prefix: 'sprite', start: 19, end: 23 }),
    frameRate: 8,
    repeat: -1,

  });
}
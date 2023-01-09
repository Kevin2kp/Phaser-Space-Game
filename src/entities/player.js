export const PlayerProps = {
  acceleration: 100,
  deceleration: 50,
  drag: 50,
  angularAcceleration: 180,
  angularDrag: 180,
};

const WeaponProps = {
  fireRate: 250,
};

export function playerUpdate(time, dt) {
  let {scene, controller, nozzleParticles, body} = this;
  let position = this.body.position;
  nozzleParticles.setPosition(position.x,
      position.y + this.height / 2);

  // Handle controls
  if (controller.up.isDown) {
    // Go faster
    body.acceleration.setToPolar(this.rotation,
        PlayerProps.acceleration);
  } else {
    body.acceleration.setLength(0);
  }

  // Rotation

  if (controller.left.isDown) {
    body.setAngularAcceleration(-PlayerProps.angularAcceleration);
  } else if (controller.right.isDown) {
    body.setAngularAcceleration(PlayerProps.angularAcceleration);
  } else {
    body.setAngularAcceleration(0);
  }

  //Shooting

  if (Phaser.Input.Keyboard.JustDown(controller.space)) {
    scene.add.gameObject.playerBullet(this);
  }
}
import World from '../config/world';
import {playerUpdate, PlayerProps} from '../entities/player';
import {BulletProps, onBulletCollision} from '../entities/bullet';
import GeometryFactory from './GeometryFactory';
import {Game, GameObjects} from 'phaser';

export default class GameObjectFactory {
  constructor(scene) {
    this.scene = scene;
    this.players = scene.add.group();
    this.enemies = scene.add.group();
    this.playerBullets = scene.add.group();
    this.enemyBullets = scene.add.group();
    this.planets = scene.add.group();

    scene.physics.add.collider(this.enemyBullets, this.players,
        onBulletCollision);
    scene.physics.add.collider(this.playerBullets, this.enemies,
        onBulletCollision);

  }

  player(controller, x, y) {
    let scene = this.scene;
    let rocketSprite = new GameObjects.Sprite(scene, 0, 0, 'shuttle');
    let nozzleParticles = scene.add.particles('fire-particle');
    nozzleParticles.createEmitter({
      quantity: 30,
      speed: {
        min: 0,
        max: 500,
      },
      scale: {
        start: 0.01,
        end: 1.5,
      },
      alpha: {
        start: 1,
        end: 0,
      },
      tint: {
        min: 0xff0000,
        max: 0xffff30,
      },
      angle: {
        min: 0,
        max: 180,
      },
      gravityY: 3000,
      lifespan: 200,
      on: true,
    });

    nozzleParticles.setPosition(rocketSprite.x -60, rocketSprite.y);
    nozzleParticles.setAngle(90);
    nozzleParticles.setScale(.50);

    scene.physics.add.existing(rocketSprite);
    rocketSprite.body.setDrag(PlayerProps.drag, PlayerProps.drag);
    rocketSprite.body.setAngularDrag(PlayerProps.angularDrag);

    rocketSprite.preUpdate = playerUpdate;
    rocketSprite.controller = controller;
    rocketSprite.nozzleParticles = nozzleParticles;
    rocketSprite.setActive(true);

    this.players.add(rocketSprite, true);

    return rocketSprite;
  }

  enemy(x, y, size = 100, angle = Math.random() * 360) {
    let scene = this.scene;
    let verts = GeometryFactory.equilateralTriangle(size);
    let pos = World.randomPos();
    let enemy = new GameObjects.Triangle(scene, x, y, ...verts);

    enemy.setStrokeStyle(2, 0xFF0000);
    enemy.angle = angle;

    scene.physics.add.existing(enemy);
    this.enemies.add(enemy, true);
  }

  playerBullet(player) {
    let scene = this.scene;
    let bullet = new GameObjects.Sprite(scene, player.x,
        player.y, 'bullet');

    // Rendering

    bullet.angle = player.angle;

    // Physics

    scene.physics.add.existing(bullet);
    bullet.body.velocity.setToPolar(player.angle * Math.PI / 180,
        BulletProps.speed);

    this.playerBullets.add(bullet, true);
    scene.time.delayedCall(BulletProps.lifeSpan, bullet.destroy, undefined,
        bullet);
  }

  earth(x, y) {
    let scene = this.scene;
    let earthObj = new GameObjects.Sprite(scene, x, y, 'earth');
    this.planets.add(earthObj, true);
    return earthObj;
  }
}
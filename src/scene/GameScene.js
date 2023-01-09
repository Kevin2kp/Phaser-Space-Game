import World from '../config/world';
import GameObjectFactory from '../factories/GameObjectFactory';

export default class GameScene extends Phaser.Scene {
  preload() {
    this.load.image('shuttle', 'textures/shuttle.png');
    this.load.image('bullet', 'textures/bullet.png');
    this.load.image('earth', 'textures/earth.png');
    this.load.image('fire-particle', 'textures/fire-particle.png');
  }

  create() {
    this.add.gameObject = new GameObjectFactory(this);

    let earthPlanet = this.add.gameObject.earth(World.centerX(),
        World.centerY());

    let player = this.add.gameObject.player(this.input.keyboard.createCursorKeys(), 50);

    let enemyPos = World.randomPos();
    this.add.gameObject.enemy(enemyPos.x, enemyPos.y, 200, 90);

    this.cameras.main.startFollow(player, false, 100, 100, 100, 100);
  }

  update(time, dt) {

  }
}
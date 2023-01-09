import {Scene, Game} from 'phaser';
import WorldConfig from './config/world';
import GameScene from './scene/GameScene';

const canvas = document.getElementById('canvas');

const game = new Game({
  width: WorldConfig.width,
  height: WorldConfig.height,
  backgroundColor: 0x000000,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  parent: 'game',
});

game.scene.add('gameScene', GameScene);
game.scene.start('gameScene');


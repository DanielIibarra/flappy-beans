import Game from './game.js'

const config = {
  type: Phaser.AUTO,
  width: 390,
  height: 650,
  parent: 'game',
  scene: [Game],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: {
        y: 400,
      }
    }
  }
};

const game = new Phaser.Game(config);
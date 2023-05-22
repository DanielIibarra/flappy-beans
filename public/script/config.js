import Game from './game.js'

const config = {
  type: Phaser.AUTO,
  width: 390,
  height: 657,
  parent: 'game',
  scene: [Game],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: {
        y: 500,
      }
    }
  }
};

const game = new Phaser.Game(config);
export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'game' });
    this.scoreValue = 0;
    this.scoreValue2 = 1;
  }

  preload() {
    this.load.image('fondo', './png/fbs-49.png');
    this.load.image('playerf1', './png/fbs-01.png');
    this.load.image('playerf2', './png/fbs-02.png');
    this.load.image('playerf3', './png/fbs-03.png');
    this.load.image('playerm', './png/fbs-25.png');
    this.load.image('tuberiaarriba', './png/fbs-05.png');
    this.load.image('tuberiaabajo', './png/fbs-06.png');
    this.load.image('piso', './png/fbs-04.png');
    this.load.image('0', './png/fbs-35.png');
    this.load.image('1', './png/fbs-36.png');
    this.load.image('2', './png/fbs-37.png');
    this.load.image('3', './png/fbs-38.png');
    this.load.image('4', './png/fbs-39.png');
    this.load.image('5', './png/fbs-40.png');
    this.load.image('6', './png/fbs-41.png');
    this.load.image('7', './png/fbs-42.png');
    this.load.image('8', './png/fbs-43.png');
    this.load.image('9', './png/fbs-44.png');
    this.load.image('Game-over', './png/fbs-32.png');
  }

  create() {
    
    const fondo = this.add.sprite(0, 0, 'fondo');
    fondo.setDisplaySize(800, 1400);

    this.player = this.physics.add.sprite(60, 300, 'playerf1');
    this.player.setDisplaySize(40, 40);

    this.input.keyboard.on('keydown', (event) => {
      if (event.keyCode === 32) {
        this.saltar();
      }
    });

    this.input.on('pointerdown', () => this.saltar());

    this.nuevaColumna();

    this.piso = this.physics.add.group();
    for (let i = 0; i < 3; i++) {
      const piso = this.piso.create(i * 320, 650, 'piso');
      piso.body.allowGravity = false;
    }
    this.piso.setDepth(1);
    this.piso.setVelocityX(-200);
    this.piso.checkWorldBounds = true;
    this.piso.outOfBoundsKill = true;
    this.physics.add.overlap(this.player, this.piso, this.hitColumna, null, this);

    this.score1 = this.add.image(190, 200, '0')
    this.score1.setDepth(1);
    this.time.addEvent({
      delay: 1500,
      callback: this.scoreact,
      callbackScope: this,
      loop: true
    });
   
  }
  scoreact() {
    this.scoreValue += 1; // Incrementa el puntaje actual
    if (this.scoreValue > 9) {
      this.scoreValue = 0;
      this.dosDigitos(this.scoreValue2);
      this.scoreValue2 += 1;
    }
    this.score1.text = this.score1.setTexture(String(this.scoreValue)); // Actualiza el texto del puntaje
    
  }

  dosDigitos(scoreValue2){
    if(scoreValue2 === 1){
    this.score2 = this.add.image(175, 200, '1')
    this.score2.setDepth(1);
  }
    else{
      this.score2.text = this.score2.setTexture(String(this.scoreValue2));
    }
  }



  nuevaColumna() {
    const columna = this.physics.add.group();

    const hueco = Math.floor(Math.random() * 4) + 4;
    for (let i = 0; i < 14; i++) {
      if (i == hueco - 2) {
        const cubo = columna.create(400, i * 45 - 120, 'tuberiaarriba');
        cubo.body.allowGravity = false;
      } else if (i == hueco + 2) {
        const cubo = columna.create(400, i * 45 + 160, 'tuberiaabajo');
        cubo.body.allowGravity = false;
      }
    }

    columna.setVelocityX(-200);
    columna.checkWorldBounds = true;
    columna.outBoundsKill = true;
    this.time.delayedCall(1500, this.nuevaColumna, [], this);
    this.physics.add.overlap(this.player, columna, this.hitColumna, null, this);
  }

  hitColumna() {
    this.physics.pause('Game'); // Detener la simulación de física (pausar el juego)
    this.time.removeAllEvents(); // Detener todos los timers y eventos
    this.player.body.gravity.y = 1000;
    this.gameover = this.add.image(185, 200, 'Game-over');
    this.gameover.setDepth(2);
    this.input.on('pointerdown', () => this.scene.start('game'));
    this.input.keyboard.on('keydown', (event) => {
      if (event.keyCode === 32) {
        this.scene.start('game')
      }
    });
  }

  saltar() {
    this.player.setVelocityY(-200);
  }

  update() {

    this.piso.children.iterate((piso) => {
      if (piso.x < -150) {
        piso.x += 700;
      }
    });
    // Obtener la velocidad vertical del jugador
    const velocityY = this.player.body.velocity.y;

    // Aplicar rotación basada en la velocidad vertical
    if (velocityY > 60) {
      this.player.setTexture('playerf3');
      // El jugador está cayendo

    } else if (velocityY < -10) {
      this.player.setTexture('playerf1');
      // El jugador está subiendo

    } else {
      this.player.setTexture('playerf2');
      // El jugador está en reposo
      this.player.rotation = 0; // Sin rotación
    }

  }
}

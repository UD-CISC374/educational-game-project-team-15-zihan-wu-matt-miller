export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    //this.load.image("mario-tiles", "../assets/tutorial/super-mario-tiles.png");
    this.load.image("tiles", "../assets/tutorial/pkmn.png");
    this.load.tilemapTiledJSON("map", "../assets/tutorial/tiledemo.json");
    this.load.spritesheet("cat", "assets/catchara.png",{frameWidth: 32, frameHeight: 32});
  }

  create() {
    this.add.text(20,20,"LOADING GAME...");

    this.anims.create({
      key: "cat_down",
      frames: this.anims.generateFrameNumbers("cat",{start: 0, end: 2}),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "cat_left",
      frames: this.anims.generateFrameNumbers("cat",{start: 3, end: 5}),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "cat_right",
      frames: this.anims.generateFrameNumbers("cat",{start: 6, end: 8}),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "cat_up",
      frames: this.anims.generateFrameNumbers("cat",{start: 9, end: 11}),
      frameRate: 10,
      repeat: -1
    });


    this.scene.start('MainScene');
  }
}

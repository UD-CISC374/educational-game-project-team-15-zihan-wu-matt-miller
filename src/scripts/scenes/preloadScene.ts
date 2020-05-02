export default class PreloadScene extends Phaser.Scene {

  // The scene to jump to once initialization is complete
  startScenceKey:string = 'StartScene';

  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    //this.load.image("mario-tiles", "../assets/tutorial/super-mario-tiles.png");
    this.load.image("tiles", "../assets/camotiles.png");
    this.load.spritesheet("player", "assets/catchara.png",{frameWidth: 32, frameHeight: 32});
    this.load.spritesheet("keys", "assets/keys.png",{frameWidth: 32, frameHeight: 32});
    this.load.spritesheet("gem", "assets/gem.png",{frameWidth: 16, frameHeight: 16});

    // Load images
    this.load.image('mv-tut-blck','assets/move-tutorial-black-1.png');
    this.load.image('mv-tut-wht','assets/move-tutorial-white-1.png');

    // Load levels
    this.load.tilemapTiledJSON("map", "assets/camocaper.json");
    this.load.tilemapTiledJSON("level1", "assets/level-1.json");
    this.load.tilemapTiledJSON("level2", "assets/camocaper.json");
  }

  create() {
    this.add.text(20,20,"LOADING GAME...");

    this.anims.create({
      key: "player_down",
      frames: this.anims.generateFrameNumbers("player",{start: 0, end: 2}),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "player_left",
      frames: this.anims.generateFrameNumbers("player",{start: 3, end: 5}),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "player_right",
      frames: this.anims.generateFrameNumbers("player",{start: 6, end: 8}),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "player_up",
      frames: this.anims.generateFrameNumbers("player",{start: 9, end: 11}),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "player_up",
      frames: this.anims.generateFrameNumbers("player",{start: 9, end: 11}),
      frameRate: 10,
      repeat: -1
    });
    
    this.anims.create({
      key: "gem_rotate",
      frames: this.anims.generateFrameNumbers("gem",{}),
      frameRate: 10,
      repeat: -1
    });


    this.scene.start(this.startScenceKey);
  }
}

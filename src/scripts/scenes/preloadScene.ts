export default class PreloadScene extends Phaser.Scene {

  // The scene to jump to once initialization is complete
  startScenceKey:string = 'StartScene';

  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    //this.load.image("mario-tiles", "../assets/tutorial/super-mario-tiles.png");
    this.load.image("tiles", "assets/camotiles.png");
    this.load.spritesheet("player", "assets/catchara.png",{frameWidth: 32, frameHeight: 32});
    this.load.spritesheet("keys", "assets/keys.png",{frameWidth: 32, frameHeight: 32});
    this.load.spritesheet("gem", "assets/gem.png",{frameWidth: 16, frameHeight: 16});

    /* LOAD ALL IMAGES */
    // Load movement tutorial images
    this.load.image('mv-tut-blck','assets/move-tutorial-black-1.png');
    this.load.image('mv-tut-wht','assets/move-tutorial-white-1.png');
    // Load arrow for tutorial
    this.load.image('arrow-black','assets/arrow_black.png');
    this.load.image('arrow-white','assets/arrow_white.png');
    this.load.image("jail", "assets/jail.png");

    // Load levels
    this.load.tilemapTiledJSON("map", "assets/camocaper.json");
    this.load.tilemapTiledJSON("level1", "assets/level-1.json");
    this.load.tilemapTiledJSON("level2", "assets/level-2.json");
    this.load.tilemapTiledJSON("level3", "assets/level-3.json");

    //start and button assets
    this.load.image("start-bkg","assets/start-bkg-reg.jpg");
    this.load.image('title','assets/title.png');

    this.load.image("play-bttn-dwn","assets/play-3-dwn.png");
    this.load.image("play-bttn-up","assets/play-3-up.png");

    this.load.image("ctrl-bttn-dwn","assets/controls-3-dwn.png");
    this.load.image("ctrl-bttn-up","assets/controls-3-up.png");

    // Load sounds
    this.load.audio('click-1','assets/sounds/click-1.ogg');
    this.load.audio('success-1','assets/sounds/pluck-success-1.ogg');
    this.load.audio('diamond-1','assets/sounds/diamond-1.ogg');
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

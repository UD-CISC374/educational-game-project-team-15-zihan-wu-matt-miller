import ExampleObject from '../objects/exampleObject';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  player;
  cursorKeys;
  playerXVelocity = 100;
  playerYVelocity = 100;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    // When loading from an array, make sure to specify the tileWidth and tileHeight
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("pkmn", "tiles");
    
    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
    const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
    const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);
    worldLayer.setCollisionByProperty({ collides: true });

    const debugGraphics = this.add.graphics().setAlpha(0.75);
    worldLayer.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });



    this.player = this.physics.add.sprite(300, 300, "cat");
    this.player.play("cat_down");
    this.physics.add.collider(this.player, worldLayer);
    this.player.tint = 0xff00ff;

    //belowLayer.setCollisionByProperty({color:"red"});
    this.physics.add.overlap(this.player, aboveLayer, this.changeColor, undefined, this);

    this.exampleObject = new ExampleObject(this, 0, 0);
  }
  changeColor(){
    this.player.tint = 0x00ff00;  
    console.log("ehhhhhh");  
  }


  update() {
    this.movePlayerManager();

  }

  //does not allow diagonal movement currently
  movePlayerManager(){
    this.player.setVelocity(0,0);

    if(this.cursorKeys.left.isDown){
      this.player.setVelocityX(-this.playerXVelocity);
      this.player.play("cat_left",true);
    }else if(this.cursorKeys.right.isDown){
      this.player.setVelocityX(this.playerXVelocity);
      this.player.play("cat_right",true);
    }else if(this.cursorKeys.up.isDown){
      this.player.setVelocityY(-this.playerYVelocity);
      this.player.play("cat_up",true);
    }else if(this.cursorKeys.down.isDown){
      this.player.setVelocityY(this.playerYVelocity);
      this.player.play("cat_down",true);
    }else{
      this.player.setVelocity(0,0);
      //this.player.anims.stop(); 
      //better to have an idle, stops on blurry frames sometimes
    }
  }


checkColor(){

}

}

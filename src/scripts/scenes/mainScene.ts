import ExampleObject from '../objects/exampleObject';
import Player from '../objects/player';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  player:Player;
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
    this.player = new Player(this, 20, 20);
    const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);
    worldLayer.setCollisionByProperty({ collides: true });

    const debugGraphics = this.add.graphics().setAlpha(0.75);
    worldLayer.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });


    this.physics.add.collider(this.player, worldLayer);
    this.player.tint = 0x0000ff;

    //belowLayer.setCollisionByProperty({color:"red"});
    //this.physics.add.overlap(this.player, aboveLayer, this.changeColor, undefined, this);
  }
  
  changeColor(){
    this.player.tint = 0x0000ff;
    console.log("ehhhhhh");  
  }

  update() {
    this.player.move(this.cursorKeys);
  }

}

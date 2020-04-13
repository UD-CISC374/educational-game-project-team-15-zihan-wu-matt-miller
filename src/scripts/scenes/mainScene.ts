import ExampleObject from '../objects/exampleObject';
import Player from '../objects/player';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  player:Player;
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  map: Phaser.Tilemaps.Tilemap;
  tileset: Phaser.Tilemaps.Tileset;
  belowLayer:Phaser.Tilemaps.StaticTilemapLayer;
  worldLayer:Phaser.Tilemaps.StaticTilemapLayer;
  aboveLayer:Phaser.Tilemaps.StaticTilemapLayer;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.map = this.make.tilemap({ key: "map" });
    this.tileset = this.map.addTilesetImage("pkmn", "tiles");
    
    // Parameters: layer name (or index) from Tiled, tileset, x, y
    this.belowLayer = this.map.createStaticLayer("Below Player", this.tileset, 0, 0).setDepth(-1);
    this.worldLayer = this.map.createStaticLayer("World", this.tileset, 0, 0);
    this.aboveLayer = this.map.createStaticLayer("Above Player", this.tileset, 0, 0).setDepth(1);
    this.worldLayer.setCollisionByProperty({ collides: true });

    const debugGraphics = this.add.graphics().setAlpha(0.75);
    this.worldLayer.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });

    this.player = new Player(this, 20, 20);
    this.physics.add.collider(this.player, this.worldLayer); 
    this.physics.add.collider(this.player, this.belowLayer); // add collider but don't set collision for overlap callback
    this.player.tint = 0xff00ff;

    //not reading set collision points from json file?
    this.belowLayer.setTileIndexCallback([30,31,32,33], ()=>{
      this.player.tint = 0xff0000;
    }, this);

    this.belowLayer.setTileIndexCallback([125,126,150,151], ()=>{
      this.player.tint = 0xff00ff;
    }, this);

    //testing stuff, ignore this
    this.belowLayer.tilemap.layer.data.forEach( i =>{
      i.forEach(j =>{
        if(j.index == 32){

        }
      })
    });
  }
  
  changeColor(){
    this.player.tint = 0x00ffff;
    console.log("ehhhhhh");  
  }

  update() {
    this.player.move(this.cursorKeys);
  }

}

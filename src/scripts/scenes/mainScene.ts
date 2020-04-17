import ExampleObject from '../objects/exampleObject';
import Player from '../objects/player';
import ColorPalette from '../objects/colorPalette';
import ColorMixer from '../objects/colorMixer';
import { Color } from '../objects/color';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  player:Player;
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  otherKeys;
  map: Phaser.Tilemaps.Tilemap;
  tileset: Phaser.Tilemaps.Tileset;
  belowLayer:Phaser.Tilemaps.StaticTilemapLayer;
  worldLayer:Phaser.Tilemaps.StaticTilemapLayer;
  aboveLayer:Phaser.Tilemaps.StaticTilemapLayer;
  palette: ColorPalette; 

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.palette = new ColorPalette();
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.otherKeys = this.input.keyboard.addKeys({space:Phaser.Input.Keyboard.KeyCodes.SPACE, one:Phaser.Input.Keyboard.KeyCodes.ONE, two:Phaser.Input.Keyboard.KeyCodes.TWO, three:Phaser.Input.Keyboard.KeyCodes.THREE, four:Phaser.Input.Keyboard.KeyCodes.FOUR});

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
    
    this.add.text(450, 50, '2 color slots\none-red, two-blue, three-yellow, \nfour clears palette\npress space to mix').setBackgroundColor("0x000");


    //testing below this, ignore
    this.belowLayer.setTileIndexCallback([30,31,32,33], ()=>{
      //this.player.color = 0xff0000;
    }, this);

    this.belowLayer.setTileIndexCallback([125,126,150,151], ()=>{
      //this.player.color = 0xff00ff;
    }, this);

    this.belowLayer.tilemap.layer.data.forEach( i =>{
      i.forEach(j =>{
        if(j.index == 32){

        }
      })
    });

    // Testing color mixing
    console.log(ColorMixer.mixColors(Color.BLUE, Color.YELLOW));
  }
  

  update() {
    this.player.move(this.cursorKeys);

    //one,two,three,four, and space currently
    //one-red, two-blue, three-yellow, four-clear, space-mix must be handled in game

    if(Phaser.Input.Keyboard.JustDown(this.otherKeys.four)){
        console.log("4");
        this.palette.clearColors();
    }else if(Phaser.Input.Keyboard.JustDown(this.otherKeys.one)){
        console.log("1");
        this.palette.setColor(Color.RED);
    }else if(Phaser.Input.Keyboard.JustDown(this.otherKeys.two)){
        console.log("2");
        this.palette.setColor(Color.BLUE);
    }else if(Phaser.Input.Keyboard.JustDown(this.otherKeys.three)){
        console.log("3");
        this.palette.setColor(Color.YELLOW);
    }else if(Phaser.Input.Keyboard.JustDown(this.otherKeys.space)){
        console.log("space");
        this.player.color = this.palette.outputMix();
        console.log("color",this.player.color);
    }

  
    this.player.tint = this.player.color;

  } 

}
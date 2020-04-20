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
  suspicion: number;
  suspicionText;
  tileColor : Color; //tile player is standing on, want to move this later so we don't have to set up again for each scene

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.palette = new ColorPalette();
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.otherKeys = this.input.keyboard.addKeys({space:Phaser.Input.Keyboard.KeyCodes.SPACE, one:Phaser.Input.Keyboard.KeyCodes.ONE, two:Phaser.Input.Keyboard.KeyCodes.TWO, three:Phaser.Input.Keyboard.KeyCodes.THREE, four:Phaser.Input.Keyboard.KeyCodes.FOUR});

    this.map = this.make.tilemap({ key: "map" });
    this.tileset = this.map.addTilesetImage("camotiles", "tiles");
    
    // Parameters: layer name (or index) from Tiled, tileset, x, y
    this.belowLayer = this.map.createStaticLayer("Below Player", this.tileset, 0, 0).setDepth(-1);
    this.worldLayer = this.map.createStaticLayer("World", this.tileset, 0, 0);
    this.aboveLayer = this.map.createStaticLayer("Above Player", this.tileset, 0, 0).setDepth(1);
    this.worldLayer.setCollisionByProperty({ collides: true });
    this.belowLayer.setCollisionByProperty({ collides: true });

    const debugGraphics = this.add.graphics().setAlpha(0.75);
    this.worldLayer.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });

    this.player = new Player(this, 100, 64);
    this.physics.add.collider(this.player, this.worldLayer); 
    this.physics.add.collider(this.player, this.belowLayer); // add collider but don't set collision for overlap callback
    
    this.add.text(170, 0, '2 color slots in palette, no graphical display for palette yet\none-red, two-blue, three-yellow, \nfour clears palette\npress space to mix / change player color').setBackgroundColor("0x000");
    this.suspicion = 0;
    this.suspicionText = this.add.text(900,500, "Suspicion: "+this.suspicion,{font: "32px"}).setColor("0x000");

    //testing below this, ignore
    this.belowLayer.setTileIndexCallback(Array.from(Array(15).keys()), ()=>{
      this.tileColor = Color.YELLOW;
    }, this);

    this.belowLayer.setTileIndexCallback(Array.from(Array(15), (e,i)=>i+16), ()=>{
      this.tileColor = Color.BLUE;
    }, this);

    this.belowLayer.setTileIndexCallback(Array.from(Array(15), (e,i)=>i+32), ()=>{
      this.tileColor = Color.RED;
    }, this);

    this.belowLayer.setTileIndexCallback(Array.from(Array(15), (e,i)=>i+48), ()=>{
      this.tileColor = Color.GREEN;
    }, this);
    this.belowLayer.setTileIndexCallback([104,105,106,107], ()=>{ //grass
      this.tileColor = Color.GREEN;
    }, this);

    this.belowLayer.setTileIndexCallback(Array.from(Array(15), (e,i)=>i+64), ()=>{
      this.tileColor = Color.ORANGE;
    }, this);

    this.belowLayer.setTileIndexCallback(Array.from(Array(15), (e,i)=>i+80), ()=>{
      this.tileColor = Color.PURPLE;
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
    if(this.player.color != this.tileColor){
      this.suspicion += 1;
    }
    this.suspicionText.setText("Suspicion: " + this.suspicion);

  } 

}

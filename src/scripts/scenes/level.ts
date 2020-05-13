import Player from '../objects/player';
import ColorPalette from '../objects/colorPalette';
import { Color } from '../objects/color';
import Inventory from '../objects/inventory';
import Suspicionbar from '../objects/suspicionbar';
import Tutorial from '../objects/tutorial';

export default class Level extends Phaser.Scene{

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
    suspicionText: Phaser.GameObjects.Text;
    tileColor : Color = Color.NULL; //tile player is standing on, want to move this later so we don't have to set up again for each scene
    clock: number;
    startpt;
    endpt;
    gem;

    // Audio variables
    successSFX: Phaser.Sound.BaseSound;
    diamondSFX: Phaser.Sound.BaseSound;

    pauseSus: boolean = false;
  
    inventory: Inventory;
    suspicionBar: Suspicionbar;

    //scene: Phaser.Scene;
    sceneWidth: number;
    sceneHeight: number;

    MAX_SUS:number = 100;

    mapKey:string;
    tilesetName:string = 'camotiles';
    tilesetKey:string = 'tiles';
    nextsceneKey:string;
    sceneKey:string;

    restartButton; 
    inputEnabled:boolean = true; 

    // Constructor takes in sceneKey, mapKey, tilesetName, tilesetKey
    constructor(sceneKey:string, mapKey:string, nextsceneKey:string){
        super({key: sceneKey});
        this.sceneKey = sceneKey;
        this.mapKey = mapKey;
        this.nextsceneKey = nextsceneKey;

        this.clock = 0;
        this.suspicion = 0;
        this.tileColor = Color.NULL;  

        // Initialize some variables based on the scene
        //this.init();
    }

    init(){
        this.sceneWidth = this.cameras.main.width;
        this.sceneHeight = this.cameras.main.height;
    }

    /**
     * Adds all the required sounds to the scene and makes them available to be used
     */
    addSounds(){
        this.successSFX = this.sound.add('success-1', { loop: false });
        this.diamondSFX = this.sound.add('diamond-1', { loop: false });
    }


    create(){
        this.sceneWidth = this.cameras.main.width;
        this.sceneHeight = this.cameras.main.height;

        // Add sounds
        this.addSounds();

        this.palette = new ColorPalette(this, 650, 540);
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.otherKeys = this.input.keyboard.addKeys({space:Phaser.Input.Keyboard.KeyCodes.SPACE, one:Phaser.Input.Keyboard.KeyCodes.ONE, two:Phaser.Input.Keyboard.KeyCodes.TWO, three:Phaser.Input.Keyboard.KeyCodes.THREE, four:Phaser.Input.Keyboard.KeyCodes.FOUR});
    
        this.map = this.make.tilemap({ key: this.mapKey }); // "map"
        this.tileset = this.map.addTilesetImage('camotiles', 'tiles');// "camotiles" "tiles"

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        this.belowLayer = this.map.createStaticLayer("Below Player", this.tileset, 0, 0).setDepth(-1);
        this.worldLayer = this.map.createStaticLayer("World", this.tileset, 0, 0);
        this.aboveLayer = this.map.createStaticLayer("Above Player", this.tileset, 0, 0).setDepth(1);
        this.worldLayer.setCollisionByProperty({ collides: true });
        this.belowLayer.setCollisionByProperty({ collides: true });

        /*
        // Adds boxes around objects you can't move through debug
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        this.worldLayer.renderDebug(debugGraphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });
        */

        //finds start and end points from tilemap and use accordingly
        this.startpt = this.map.findObject("Objects", obj => obj.name === "start");
        this.player = new Player(this, this.startpt.x, this.startpt.y);
        this.physics.add.collider(this.player, this.worldLayer); 
        this.physics.add.collider(this.player, this.belowLayer); // add collider but don't set collision for overlap callback
    
        this.endpt = this.map.findObject("Objects", obj => obj.name === "end");
        this.gem = this.add.sprite(this.endpt.x, this.endpt.y, "gem");
        this.gem.play("gem_rotate");
        this.gem.setScale(2,2);
        this.physics.add.existing(this.gem, true); //true for static; gem doesn't move
        this.physics.add.overlap(this.gem,this.player,this.reachedGoal, function(){}, this); //calls caught function on overlap

        //this.add.text(170, 0, '2 color slots in palette, no graphical display for palette yet\none-red, two-blue, three-yellow, \nfour clears palette\npress space to mix / change player color').setBackgroundColor("0x000");
        this.suspicionText = this.add.text(900,500, "Suspicion: "+this.suspicion,{font: "32px"}).setColor("0x000");
        
        //tile index is ONE MORE than the id in tiled!
        this.belowLayer.setTileIndexCallback(112, ()=>{
            this.tileColor = Color.NULL;
        }, this);
  
        this.belowLayer.setTileIndexCallback(Array.from(Array(15), (e,i)=>i+1), ()=>{
            this.tileColor = Color.YELLOW;
        }, this);
  
        this.belowLayer.setTileIndexCallback(Array.from(Array(15), (e,i)=>i+17), ()=>{
            this.tileColor = Color.BLUE;
        }, this);
  
        this.belowLayer.setTileIndexCallback(Array.from(Array(15), (e,i)=>i+33), ()=>{
            this.tileColor = Color.RED;
        }, this);
  
        this.belowLayer.setTileIndexCallback(Array.from(Array(15), (e,i)=>i+49), ()=>{
            this.tileColor = Color.GREEN;
        }, this);

        this.belowLayer.setTileIndexCallback([105,106,107,108], ()=>{ //grass
            this.tileColor = Color.GREEN;
        }, this);
  
        this.belowLayer.setTileIndexCallback(Array.from(Array(15), (e,i)=>i+65), ()=>{
            this.tileColor = Color.ORANGE;
        }, this);
  
        this.belowLayer.setTileIndexCallback(Array.from(Array(15), (e,i)=>i+81), ()=>{
            this.tileColor = Color.PURPLE;
        }, this);
    
        // Initialize the inventory and the suspicionbar
        this.inventory = new Inventory(this, 100, this.sceneHeight - 50);
        this.suspicionBar = new Suspicionbar(this,this.sceneWidth, 25);


        // Set these colors by default, then update the inventory to display
        this.inventory.color[0] = Color.RED;
        this.inventory.color[1] = Color.BLUE;
        this.inventory.color[2] = Color.YELLOW;
        this.inventory.updateInventory(); // This updates the rectangle color on the screen


    }


    /**
     * Called by phaser at regular intervals
     */
    update(){
        this.clock++;
        
        if(this.checkStandingSecondary())
            Tutorial.handleCreateColor(this);
            

        if(this.inputEnabled == true){
            this.player.move(this.cursorKeys);

            //one,two,three,four, and space currently
            //one-red, two-blue, three-yellow, four-clear, space-mix must be handled in game

            if(Phaser.Input.Keyboard.JustDown(this.otherKeys.four)){
                this.palette.clearColors();
            }else if(Phaser.Input.Keyboard.JustDown(this.otherKeys.one)){
                this.palette.setColor(Color.RED);
            }else if(Phaser.Input.Keyboard.JustDown(this.otherKeys.two)){
                this.palette.setColor(Color.BLUE);
            }else if(Phaser.Input.Keyboard.JustDown(this.otherKeys.three)){
                this.palette.setColor(Color.YELLOW);
            }else if(Phaser.Input.Keyboard.JustDown(this.otherKeys.space)){
                this.player.color = this.palette.outputMix();
            }

            // Set the players tint to the color of the player that was just calculated
            this.player.tint = this.player.color;

            // Handles suspicion
            this.handleSuspicion();
        }
    }

    /**
     * If the player is currently standing on a secondary color, return true, otherwise false
     *  */ 
    checkStandingSecondary():boolean{
        if(this.tileColor != Color.GRAY   && 
            this.tileColor != Color.RED   && 
            this.tileColor != Color.BLUE  &&
            this.tileColor != Color.YELLOW&&
            this.tileColor != Color.NULL)
            return true;
        else
            return false;
    }

    /**
   * Handles whether the suspicion should increase or decrease
   * Triggers effect if MAX_SUS is reached
   */
    handleSuspicion(){
        // The rate that the suspicion meter will increase(lower is faster)
        let rate:number = 10; // Was 5 before
        // The rate that the suspicion meter will decrease(lower is faster)
        let dec_rate:number = 15; //25 before

        // Increase suspicion if user isn't matching floor
        if(this.clock % rate == 0 && !this.pauseSus){
            // If the color isn't standing on the correct color tile
            if(this.player.color != this.tileColor){
                this.suspicion = Math.min(this.MAX_SUS, this.suspicion+1);
            } else {
                // Check if decreasing the suspicion
                if(this.clock % dec_rate == 0)
                    this.suspicion = Math.max(0,this.suspicion-1);
            }
            this.suspicionText.setText("Suspicion: " + this.suspicion);
        }

        // After updating the suspicion amount, update the suspicion bar
        this.suspicionBar.colorBar(this, this.suspicion);

        if(this.suspicion == this.MAX_SUS)
            this.caught();
        
        // If suspicion is greater than 0, handle the suspicion tutorial
        if(this.suspicion > 0)
            Tutorial.handleSuspicion(this);
        
        if(this.suspicion > 5)
            Tutorial.handleFloor(this);
    }

    /**
     * Suspicion has reached 100 and youve been caught! 
     * Play animation and reset the current screen
     *  */ 
    caught(){
        this.player.setVelocity(0,0);
        this.player.anims.stop();
        this.inputEnabled = false;

        let timeout:number = 200; // in ms

        // Turn the player to face forward
        this.player.setFrame(1);

        Tutorial.handleMix(this);

        
        // Flash red a few times
        this.sleep(timeout).then(() => { 
            this.player.setTint(Color.RED); 
            this.sleep(timeout).then(() => { 
                this.player.setTint(Color.NULL); 
                this.sleep(timeout).then(() => { 
                    this.player.setTint(Color.RED); 
                    this.sleep(timeout).then(() => { 
                        this.player.setTint(Color.NULL); 
                        this.sleep(timeout).then(() => { 
                            this.player.setTint(Color.RED); 
                            this.sleep(timeout).then(() => { 
                                this.player.setTint(Color.NULL); 
                                this.sleep(timeout).then(() => { 
                                    this.player.setTint(Color.RED); 
                                    this.sleep(timeout).then(() => { 
                                        this.player.setTint(Color.NULL); 
                                        this.sleep(timeout).then(() => { 
                                            this.player.setTint(Color.RED); 
                                            this.sleep(timeout).then(() => { 
                                                this.player.setTint(Color.NULL); 
                                                this.sleep(timeout).then(() => { 
                                                    this.player.setTint(Color.RED); 
                                                    // After done flashing, restart the scene after another delay
                                                    

                                                    this.sleep(timeout).then(() => { 
                                                        // Set suspicion to zero and restart the scene after a little delay after the last flash
                                                        /*
                                                        this.suspicion = 0;
                                                        this.sleep(6000).then(() => {
                                                            this.scene.restart();
                                                        });
                                                        */
                                                        let black = this.add.rectangle( this.sceneWidth/2, this.sceneHeight/2, this.sceneWidth, this.sceneHeight, 0x000).setDepth(99);
                                                        this.tweens.add({
                                                            targets     : black,
                                                            alpha       : {from: 0, to: 1},
                                                            ease        : 'Linear',
                                                            duration    : 1800,
                                                        });

                                                        var jail = this.add.image(420, -300, 'jail').setDepth(99);
                                                        this.tweens.add({
                                                            targets     : jail,
                                                            x           : 430,
                                                            y           : 300,
                                                            ease        : 'Bounce.easeOut',
                                                            duration    : 2000,
                                                        });

                                                        this.sleep(2000).then(()=>{ //wait until jail finishes animating to add restart
                                                            //let caughttext = this.add.text(this.sceneWidth/2, 64 + this.sceneHeight/2, "You were spotted! \nRestart?",{font: "64px"}).setColor("0xFFFFFF").setDepth(99);

                                                            var tconfig = {
                                                                x: (this.sceneWidth/2) - 225,
                                                                y: (this.sceneHeight/2) - 200,
                                                                text: 'YOU WERE SPOTTED! \nRestart?',
                                                                style: {
                                                                  fontSize: '48px',
                                                                  fontFamily: 'MS PGothic',
                                                                  fontStyle: 'bold',
                                                                  color: '#ffffff',
                                                                  align: 'center',
                                                                  lineSpacing: 24,
                                                                }
                                                              };
                                                              let caughttext = this.make.text(tconfig).setDepth(99);

                                                            this.restartButton = this.add.image(this.sceneWidth/2, this.sceneHeight/2, 'play-bttn-up').setDepth(99);
                                                            this.restartButton.setInteractive();

                                                            this.restartButton.on('pointerover', () => {
                                                                this.restartButton.setTexture('play-bttn-dwn');
                                                                this.restartButton.setScale(1.1);
                                                            });
                                                            this.restartButton.on('pointerout', () => {
                                                                this.restartButton.setTexture('play-bttn-up');
                                                                this.restartButton.setScale(1);
                                                            });
                                                            this.restartButton.on('pointerup', () => {
                                                                this.restart();
                                                            });
                                                        });


                                                    });
                                                    
                                                });
                                                
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });

        // Needed b/c sleep is async so the code will keep running otherwise
        //this.scene.pause();
    }

    /**
     * Called when the player runs into the diamond
     */
    reachedGoal(){
        // Play the diamond getting sound
        this.diamondSFX.play();
        this.player.setFrame(1);
        this.scene.pause(this.sceneKey);
        // Pause the game
        //this.pauseGame();
        
        // Wait a second for sound to play then move on
        this.sleep(1000).then(()=>{
             //placeholder for now, just move on to next scene here
            this.suspicion = 0;
            // Stop the current scene first
            this.scene.stop();
            // Then start the next scene
            if(this.nextsceneKey != '')
                this.scene.start(this.nextsceneKey);
            else
                this.scene.restart();
        });
       
    }

    /**
     * Pauses the game when called
     */
    pauseGame(){
        this.pauseSus = true;
        this.player.pauseMovement = true;
        this.player.anims.stop();
    }

    /**
     * Resumes the game when called
     */
    resumeGame(){
        this.pauseSus = false;
        this.player.pauseMovement = false;
    }

    restart(){
        this.suspicion = 0;
        this.inputEnabled = true;
        this.scene.restart();
    }

    // Returns promise with setTimeout to simulate sleeping
    // must use '.then()' after call to this 
    async sleep(ms:number){
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
}
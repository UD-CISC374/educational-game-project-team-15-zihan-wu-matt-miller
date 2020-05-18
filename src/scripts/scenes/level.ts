import Player from '../objects/player';
import ColorPalette from '../objects/colorPalette';
import { Color } from '../objects/color';
import Inventory from '../objects/inventory';
import Suspicionbar from '../objects/suspicionbar';
import Tutorial from '../objects/tutorial';
import Timer from '../objects/timer';
import Music from '../objects/music';

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

    // Suspicion variables
    // The rate that the suspicion meter will increase(lower is faster)
    inc_rate:number = 15; // Was 5 before
    // The rate that the suspicion meter will decrease(lower is faster)
    dec_rate:number = 15; //25 before
    MAX_SUS:number = 100;
    prev_tileColor:Color;
    inc:number = this.inc_rate;

    // Timer variable
    timerTXT:Phaser.GameObjects.Text;

    // Audio variables
    successSFX: Phaser.Sound.BaseSound;
    diamondSFX: Phaser.Sound.BaseSound;
    rewardSFX: Phaser.Sound.BaseSound;
    wrongSFX: Phaser.Sound.BaseSound;
    clickSFX: Phaser.Sound.BaseSound;
    alarmSFX: Phaser.Sound.BaseSound;
    sirenSFX: Phaser.Sound.BaseSound;
    tickSFX: Phaser.Sound.BaseSound;
    jailSFX: Phaser.Sound.BaseSound;

    // Shifts the map along the x-axis
    OFFSET:number;

    pauseSus: boolean = false;
  
    inventory: Inventory;
    suspicionBar: Suspicionbar;

    //scene: Phaser.Scene;
    sceneWidth: number;
    sceneHeight: number;

    mapKey:string;
    tilesetName:string = 'camotiles';
    tilesetKey:string = 'tiles';
    nextsceneKey:string;
    sceneKey:string;

    // Button variables for when player gets caught
    restartButton: Phaser.GameObjects.Image; 
    menuButton: Phaser.GameObjects.Image;

    inputEnabled:boolean = true; 
    touchedGem:boolean = false;

    // Constructor takes in sceneKey, mapKey, tilesetName, tilesetKey
    constructor(sceneKey:string, mapKey:string, nextsceneKey:string, offset:number){
        super({key: sceneKey});
        this.sceneKey = sceneKey;
        this.mapKey = mapKey;
        this.nextsceneKey = nextsceneKey;
        this.OFFSET = offset;

        this.clock = 0;
        this.suspicion = 0;
        this.tileColor = Color.NULL;  
    }

    init(){
        this.sceneWidth = this.cameras.main.width;
        this.sceneHeight = this.cameras.main.height;
    }

    /**
     * Adds all the required sounds to the scene and makes them available to be used
     */
    addSounds(){
        this.clickSFX = this.sound.add('click-1',{ loop:false, volume:0.5 });
        this.tickSFX = this.sound.add('tick',{ loop:false, volume:0.5 });
        this.successSFX = this.sound.add('success-1', { loop: false, volume: 0.5});
        this.diamondSFX = this.sound.add('diamond-1', { loop: false });
        this.rewardSFX = this.sound.add('reward-1', { loop: false });
        this.wrongSFX = this.sound.add('wrong-1', { loop: false });
        this.alarmSFX = this.sound.add('alarm-1', { loop: false });
        this.sirenSFX = this.sound.add('siren-1', { loop: false, volume: 0.5});
        this.jailSFX = this.sound.add('jail', { loop: false, volume: 0.5 });
    }


    create(){
        this.sceneWidth = this.cameras.main.width;
        this.sceneHeight = this.cameras.main.height;

        // Add all sounds
        this.addSounds();

        this.palette = new ColorPalette(this, 650, 540);
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.otherKeys = this.input.keyboard.addKeys({space:Phaser.Input.Keyboard.KeyCodes.SPACE, one:Phaser.Input.Keyboard.KeyCodes.ONE, two:Phaser.Input.Keyboard.KeyCodes.TWO, three:Phaser.Input.Keyboard.KeyCodes.THREE, four:Phaser.Input.Keyboard.KeyCodes.FOUR});
    
        this.map = this.make.tilemap({ key: this.mapKey }); // "map"
        this.tileset = this.map.addTilesetImage('camotiles', 'tiles');// "camotiles" "tiles"

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        this.belowLayer = this.map.createStaticLayer("Below Player", this.tileset, this.OFFSET, 0).setDepth(-1);
        this.worldLayer = this.map.createStaticLayer("World", this.tileset, this.OFFSET, 0);
        this.aboveLayer = this.map.createStaticLayer("Above Player", this.tileset, this.OFFSET, 0).setDepth(1);
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
        this.player = new Player(this, this.startpt.x + this.OFFSET, this.startpt.y);
        this.physics.add.collider(this.player, this.worldLayer); 
        this.physics.add.collider(this.player, this.belowLayer); // add collider but don't set collision for overlap callback
    
        this.endpt = this.map.findObject("Objects", obj => obj.name === "end");
        this.gem = this.add.sprite(this.endpt.x + this.OFFSET, this.endpt.y, "gem");
        //this.gem = this.add.sprite(100, 150, "gem");
        this.gem.play("gem_rotate");
        this.gem.setScale(2,2);
        this.physics.add.existing(this.gem, true); //true for static; gem doesn't move
        this.physics.add.overlap(this.gem,this.player,this.reachedGoal, function(){}, this); //calls caught function on overlap

        //this.add.text(170, 0, '2 color slots in palette, no graphical display for palette yet\none-red, two-blue, three-yellow, \nfour clears palette\npress space to mix / change player color').setBackgroundColor("0x000");
        this.suspicionText = this.add.text(900,500, "Suspicion: "+this.suspicion,{font: "32px"}).setColor("0x000");
        
        //tile index is ONE MORE than the id in tiled!
        this.belowLayer.setTileIndexCallback(112, ()=>{
            this.prev_tileColor = this.tileColor;
            this.tileColor = Color.NULL;
        }, this);
  
        this.belowLayer.setTileIndexCallback(Array.from(Array(15), (e,i)=>i+1), ()=>{
            this.prev_tileColor = this.tileColor;
            this.tileColor = Color.YELLOW;
        }, this);
  
        this.belowLayer.setTileIndexCallback(Array.from(Array(15), (e,i)=>i+17), ()=>{
            this.prev_tileColor = this.tileColor;
            this.tileColor = Color.BLUE;
        }, this);
  
        this.belowLayer.setTileIndexCallback(Array.from(Array(15), (e,i)=>i+33), ()=>{
            this.prev_tileColor = this.tileColor;
            this.tileColor = Color.RED;
        }, this);
  
        this.belowLayer.setTileIndexCallback(Array.from(Array(15), (e,i)=>i+49), ()=>{
            this.prev_tileColor = this.tileColor;
            this.tileColor = Color.GREEN;
        }, this);

        this.belowLayer.setTileIndexCallback([105,106,107,108], ()=>{ //grass
            this.prev_tileColor = this.tileColor;
            this.tileColor = Color.GREEN;
        }, this);
  
        this.belowLayer.setTileIndexCallback(Array.from(Array(15), (e,i)=>i+65), ()=>{
            this.prev_tileColor = this.tileColor;
            this.tileColor = Color.ORANGE;
        }, this);
  
        this.belowLayer.setTileIndexCallback(Array.from(Array(15), (e,i)=>i+81), ()=>{
            this.prev_tileColor = this.tileColor;
            this.tileColor = Color.PURPLE;
        }, this);
    
        // Initialize the inventory and the suspicionbar
        this.inventory = new Inventory(this, 100, 540);//this.sceneHeight - 50
        this.suspicionBar = new Suspicionbar(this,this.sceneWidth, 25);


        // Set these colors by default, then update the inventory to display
        this.inventory.color[0] = Color.RED;
        this.inventory.color[1] = Color.BLUE;
        this.inventory.color[2] = Color.YELLOW;
        this.inventory.updateInventory(); // This updates the rectangle color on the screen

        this.timerTXT = this.add.text(this.sceneWidth/2,0,Timer.getFormattedTime());
        this.timerTXT.setOrigin(0.5,0);
        this.timerTXT.setColor('white');
        this.timerTXT.setFontFamily('MS PGothic');
        this.timerTXT.setFontStyle('bold');
        this.timerTXT.setFontSize(25);

    }


    /**
     * Called by phaser at regular intervals
     */
    update(){
        this.clock++;

        
        if(this.checkStandingSecondary())
            Tutorial.handleCreateColor(this);

        // Update timer text
        this.timerTXT.setText(Timer.getFormattedTime());

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
                // Store color before the mix
                let priorColor = this.player.color;
                // Mix colors
                this.player.color = this.palette.outputMix();
                // Check if mix is correct and player wasnt same color before
                if(this.player.color == this.tileColor && this.player.color != priorColor)
                    this.successSFX.play();
                else if(this.player.color != this.tileColor && this.player.color != priorColor)
                    this.wrongSFX.play();
            } /*else if(Phaser.Input.Keyboard.JustDown(this.otherKeys.escape)){
                this.scene.stop();
                this.scene.start(this.nextsceneKey);
            }*/

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
        // inc, inc_rate, dec_rate

        if(this.clock % this.inc == 0 && !this.pauseSus){
            // If the color isn't standing on the correct color tile
            if(this.player.color != this.tileColor){
                this.suspicion = Math.min(this.MAX_SUS, this.suspicion+1);
            } else { 
                // Reset inc if they are the correct color
                this.inc = this.inc_rate;
                // Decrease the suspicion
                if(this.clock % this.dec_rate == 0)
                    this.suspicion = Math.max(0,this.suspicion-1);
            }
            this.suspicionText.setText("Suspicion: " + this.suspicion);

            // Check if player has stayed the wrong color
            if(this.tileColor == this.prev_tileColor && this.tileColor != this.player.color && this.clock % (this.inc*2) == 0){
                this.inc--;
                this.inc = Math.max(1, this.inc); // Dont let inc fall below 1
            }
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
        // Play siren audio
        this.alarmSFX.play();

        this.player.setVelocity(0,0);
        this.player.anims.stop();
        this.inputEnabled = false;

        let timeout:number = 200; // in ms

        // Turn the player to face forward
        this.player.setFrame(1);
        
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
                                                        this.sleep(800).then(()=>{ 
                                                        this.jailSFX.play();
                                                        this.sleep(1300).then(()=>{ //wait until jail finishes animating to add restart
                                                            //let caughttext = this.add.text(this.sceneWidth/2, 64 + this.sceneHeight/2, "You were spotted! \nRestart?",{font: "64px"}).setColor("0xFFFFFF").setDepth(99);

                                                            var tconfig = {
                                                                x: (this.sceneWidth/2),
                                                                y: (this.sceneHeight / 2) - 160,
                                                                text: 'YOU WERE SPOTTED!\nRestart?',
                                                                style: {
                                                                    fontSize: '48px',
                                                                    fontFamily: 'MS PGothic',
                                                                    fontStyle: 'bold',
                                                                    color: '#ffffff',
                                                                    align: 'center',
                                                                    lineSpacing: 24,
                                                                }
                                                            };
                                                            let caughttext = this.make.text(tconfig).setOrigin(.5,.5).setDepth(99);
                                                            // Declare buttons, and set their interaction
                                                            this.setCaughtButtons();
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
     * Sets all the variables for the two buttons when player gets caughts. Sets
     */
    setCaughtButtons():void{
        // Create both buttons
        this.restartButton = this.add.image(this.sceneWidth/2, this.sceneHeight/2, 'play-bttn-up').setDepth(99);
        this.restartButton.setInteractive();
        this.menuButton = this.add.image(this.sceneWidth/2, (this.sceneHeight*2.5)/4, 'menu-black').setDepth(99);
        this.menuButton.setInteractive();

        // restartButton
        this.restartButton.on('pointerover', () => {
            this.tickSFX.play();
            this.restartButton.setTexture('play-bttn-dwn');
            this.restartButton.setScale(1.1);
        });
        this.restartButton.on('pointerout', () => {
            this.tickSFX.play();
            this.restartButton.setTexture('play-bttn-up');
            this.restartButton.setScale(1);
        });
        this.restartButton.on('pointerup', () => {
            this.clickSFX.play();
            this.restartScene();
        });
        // menuButton
        this.menuButton.on('pointerover', () => {
            this.tickSFX.play();
            this.menuButton.setTexture('menu-white');
            this.menuButton.setScale(1.1);
        });
        this.menuButton.on('pointerout', () => {
            this.tickSFX.play();
            this.menuButton.setTexture('menu-black');
            this.menuButton.setScale(1);
        });
        this.menuButton.on('pointerup', () => {
            this.clickSFX.play();
            //this.resetScene();
            Music.bkgSFX.stop();
            Music.musicPlaying = false;
            this.scene.start('StartScene');
        });
    }

    /**
     * Called when the player runs into the diamond
     */
    reachedGoal(){
        // Play the diamond getting sound once
        if (this.touchedGem == false) {
            this.diamondSFX.play();
            this.player.setFrame(1);
            this.tweens.add({
                targets: this.gem,
                alpha: 0,
                y: this.gem.y - 20,
                ease: 'linear',
                duration: 300,
            });
        }
        this.touchedGem = true;
        this.sleep(300).then(()=>{  //wait till anim finishes
                this.scene.pause(this.sceneKey);
                //placeholder for now, just move on to next scene here
                this.resetScene();
                // Stop the current scene first
                this.scene.stop();
                // Then start the next scene
                if (this.nextsceneKey != '')
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

    resetScene(){
        this.suspicion = 0;
        this.inputEnabled = true;
        this.touchedGem = false;
        
    }

    restartScene(){
        this.resetScene();
        this.scene.restart();
    }

    // Returns promise with setTimeout to simulate sleeping
    // must use '.then()' after call to this 
    async sleep(ms:number){
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    
    
}
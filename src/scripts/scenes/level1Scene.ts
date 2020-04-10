import Player from '../objects/player';

export default class Level1Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Level1Scene' });
    }

    player: Player;

    // Variables that hold the information relating to the scene
    sceneWidth: number; 
    sceneHeight: number;
    sceneCenterX: number;
    sceneCenterY: number;


    init(){
        this.sceneWidth = this.cameras.main.width;
        this.sceneHeight = this.cameras.main.height;
        this.sceneCenterX = this.cameras.main.centerX;
        this.sceneCenterY = this.cameras.main.centerY;
    }

    preload(){
        // Load in the image of the player
        this.load.image('player','assets/player-test-32.png');
    }

    create(){

        this.player = new Player(this, this.sceneCenterX, this.sceneCenterY);
        this.player.tint = 0x000000; // Change the color of the block to black
        this.player.tint = 0xFF0000; // Change the color of the block to red

        // Bind keys on keyup and keydown, pass true on keydown and false on keyup 
        this.input.keyboard.on('keydown', (event) => this.player.keyHandle(event, true), this);
        this.input.keyboard.on('keyup', (event) => this.player.keyHandle(event, false), this);
    }

    update(){
        this.player.move();
    }
}
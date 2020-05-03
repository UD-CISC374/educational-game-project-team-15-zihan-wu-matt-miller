import { Color } from './color'

export default class Suspicionbar extends Phaser.GameObjects.Rectangle{

    bar_outline: Phaser.GameObjects.Rectangle;
    bar_current: Phaser.GameObjects.Rectangle;

    bar_squares: Phaser.GameObjects.Rectangle[];
    MAX_SUS: number = 100;
    NUM_SQUARES: number = 24;// was 24

    few:boolean = true;

    constructor(scene:Phaser.Scene,x:number, y:number){
        super(scene, x,y);
        this.width = 20;
        this.height = 400;
        this.x = scene.cameras.main.width - this.width - 7;

        // Do if few is false
        if(!this.few){
            // Initialize bar array of all squares
            this.bar_squares = new Array(this.MAX_SUS); 
            let height_per_square = this.height / this.MAX_SUS; // 1 square per sus
            for(let i:number = 0; i < this.bar_squares.length; i++){
                this.bar_squares[i] = scene.add.rectangle(this.x, y + (i*height_per_square), this.width, height_per_square);
                // Set them as transparent to start
                this.bar_squares[i].setFillStyle(Color.BLACK, 0.0);
                // Outline each box with a 1px black line
                this.bar_squares[i].setStrokeStyle(1,Color.WHITE);
            }   
        } else {
            this.bar_squares = new Array(this.NUM_SQUARES); 
            let height_per_square = this.height / this.NUM_SQUARES; // Make a certain number of squares
            for(let i:number = 0; i < this.bar_squares.length; i++){
                this.bar_squares[i] = scene.add.rectangle(this.x, y + (i*height_per_square), this.width, height_per_square);
                // Set them as transparent to start
                this.bar_squares[i].setFillStyle(Color.BLACK, 0.0);
                // Outline each box with a 1px black line
                this.bar_squares[i].setStrokeStyle(1,Color.WHITE);
                this.setOrigin(0,0);
            }   
        }

        // Initialize background bar
        this.bar_outline = scene.add.rectangle(this.x,y,this.width,this.height).setFillStyle(Color.GRAY);
        this.bar_outline.setFillStyle(Color.GRAY,0.0);
        this.bar_outline.setOrigin(0,0);

        // Initialize moving part of the bar
        this.bar_current = scene.add.rectangle(this.x,this.y,this.width,0).setFillStyle(Color.GREEN, 0.75);
        this.bar_outline.setFillStyle(Color.GREEN,0.0);
        this.bar_current.setOrigin(0,0);
    }

    // Updates the color and size of the suspicion bar based on the inputted suspicion
    colorBar(scene:Phaser.Scene, curr_sus:number){
        let color = 0x000000;
        // Calculate the color based on the current suspicion
        if(curr_sus <= this.MAX_SUS/3)
            color = Color.GREEN;
        else if(curr_sus <= 2 * (this.MAX_SUS/3))
            color = Color.YELLOW;
        else    
            color = Color.RED;

        // This is for square bar growing up
        /*
        // Set the bar color to the determined color
        this.bar_current.setFillStyle(color, 0.75);

        // Calculate the new height of the suspicion bar
        let ratio:number = curr_sus/this.MAX_SUS;
        let newHeight:number = ratio * this.height;

        // This makes the bar build up from the bottom instead of down from the top
        this.bar_current.y = this.y + this.height - newHeight;
        this.bar_current.height = newHeight;
        */

        if(!this.few){
            for(let i:number = 0; i < this.MAX_SUS; i++){
                // the "this.MAX_SUS - i - 1" makes it grow from the bottom up instead of top down
                if(i < curr_sus)
                    this.bar_squares[this.MAX_SUS - i - 1].setFillStyle(color, 0.75);
                else   
                    this.bar_squares[this.MAX_SUS - i - 1].setFillStyle(color, 0.0);
            }
        } else {
            for(let i:number = 0; i < this.NUM_SQUARES; i++){
                // the "this.MAX_SUS - i - 1" makes it grow from the bottom up instead of top down
                if(curr_sus > i * (this.MAX_SUS / this.NUM_SQUARES))
                    this.bar_squares[this.NUM_SQUARES - i - 1].setFillStyle(color, 0.75);
                else   
                    this.bar_squares[this.NUM_SQUARES - i - 1].setFillStyle(color, 0.0);
            }
        }
    }
}
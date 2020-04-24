import { Color } from './color'

export default class Suspicionbar extends Phaser.GameObjects.Rectangle{

    bar_outline: Phaser.GameObjects.Rectangle;
    bar_current: Phaser.GameObjects.Rectangle;
    MAX_SUS: number = 100;

    constructor(scene:Phaser.Scene,x:number, y:number){
        super(scene, x,y);
        this.width = 20;
        this.height = 400;
        this.x = scene.cameras.main.width - this.width - 7;

        // Initialize background bar
        this.bar_outline = scene.add.rectangle(this.x,y,this.width,this.height).setFillStyle(Color.GRAY);
        this.bar_outline.setOrigin(0,0);

        // Initialize moving part of the bar
        this.bar_current = scene.add.rectangle(this.x,this.y,this.width,0).setFillStyle(Color.GREEN, 0.75);
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

        // Set the bar color to the determined color
        this.bar_current.setFillStyle(color, 0.75);

        // Calculate the new height of the suspicion bar
        let ratio:number = curr_sus/this.MAX_SUS;
        let newHeight:number = ratio * this.height;

        // This makes the bar build up from the bottom instead of down from the top
        this.bar_current.y = this.y + this.height - newHeight;
        this.bar_current.height = newHeight;
    }
}
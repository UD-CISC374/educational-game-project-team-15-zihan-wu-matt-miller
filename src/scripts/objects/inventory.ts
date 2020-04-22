import { Color } from './color'

export default class Inventory extends Phaser.GameObjects.Rectangle{

    WIDTH:number = 300;
    HEIGHT:number = 50;

    REC_SIZE:number = 30;
    SPACE:number = 10;

    // The array that holds the inventory
    slots: Phaser.GameObjects.Rectangle[];
    // The array that holds the color of the blocks in the inventory
    color: Color[] | undefined[];

    constructor(scene:Phaser.Scene, x:number, y:number){
        super(scene, x, y);
        scene.add.existing(this); // Add Inventory to scene

        this.slots = new Array(3);
        // Initialize all the array to black by default
        this.color = [undefined, undefined, undefined];

        for(let i:number = 0; i < this.slots.length; i++){
            this.slots[i] = scene.add.rectangle(this.x + (i * (this.REC_SIZE + this.SPACE)) + this.REC_SIZE, this.y, this.REC_SIZE, this.REC_SIZE);
            scene.add.text(-6 + this.x + (i * (this.REC_SIZE + this.SPACE)) + this.REC_SIZE, this.y+(this.REC_SIZE/2),(i+1).toString(), {font:"15px"}).setColor("0x000000");
        }
        
        this.updateInventory();
    }

    updateInventory(){
        for(let i:number = 0; i < this.slots.length; i++){
            if(this.color[i] != undefined) // Fill it with the color
                this.slots[i].setFillStyle(this.color[i], 1.0);
            else // Fill it with the default color
                this.slots[i].setFillStyle(Color.BLACK, 0.25);
        }
    }

    

}
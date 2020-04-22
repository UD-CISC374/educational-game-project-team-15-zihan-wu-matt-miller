import ColorMixer  from "./colorMixer";
import { Color } from "./color";

const height: number = 95;
const width: number = height*3 + 100;
const nullColor: number = 0x808080;

export default class ColorPalette{
    private slot1: Color;
    private slot2: Color;
    private rect1: Phaser.GameObjects.Rectangle;
    private rect2: Phaser.GameObjects.Rectangle;
    private rect3: Phaser.GameObjects.Rectangle;
    private graphics: Phaser.GameObjects.Graphics;

    constructor(scene: Phaser.Scene, x: number, y :number ){
        this.slot1 = Color.NULL;
        this.slot2 = Color.NULL;
        scene.add.rectangle( x, y, width, height+25, 0x000);
        this.rect1 = scene.add.rectangle( x - width/3, y, height, height, nullColor);
        this.rect2 = scene.add.rectangle( x, y, height, height, nullColor);
        this.rect3 = scene.add.rectangle( x + width/3, y, height, height, nullColor);
        scene.add.text(x - width/6 - 8, y-8, "+",{font:"32px"});
        scene.add.text(x + width/6 - 8, y-8, "=",{font:"32px"});
    }

    clearColors(){
        this.slot1 = Color.NULL;
        this.slot2 = Color.NULL;
        this.rect1.fillColor = nullColor;
        this.rect2.fillColor = nullColor;
        this.rect3.fillColor = nullColor;
    }

    /*puts specfied color in first avaible slot, if both slots are full do nothing*/
    setColor(color:Color){

        if(this.slot1 == Color.NULL){
            this.slot1 = color;
            this.rect1.fillColor = color;
            
        }else if(this.slot2 == Color.NULL){
            this.slot2 = color;
            this.rect2.fillColor = color;
            this.rect3.fillColor = nullColor;
        } else {
            // Both are null if it gets here
            this.clearColors();
            this.slot1 = color
            this.rect1.fillColor = color;
        }
    }
    
    /*if both slots are full output mix, if one slot full output one, if both empty output white*/
    outputMix():Color{
        //check if only 1 color was inputted
        if(this.slot1 != Color.NULL && this.slot2 == Color.NULL)
            this.setColor(this.slot1);
        if(this.slot2 != Color.NULL && this.slot1 == Color.NULL)
            this.setColor(this.slot2);

        let retColor : Color = ColorMixer.mixColors(this.slot1,this.slot2);
        if(retColor != Color.NULL){
            this.rect3.fillColor = retColor;
        } 
        return retColor;
    }

}
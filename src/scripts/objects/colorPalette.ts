import ColorMixer  from "./colorMixer";
import { Color } from "./color";

export default class ColorPalette{
    private slot1: Color;
    private slot2: Color;

    constructor(){
        this.slot1 = Color.NULL;
        this.slot2 = Color.NULL;
    }

    clearColors(){
        this.slot1 = Color.NULL;
        this.slot2 = Color.NULL;
    }

    /*puts specfied color in first avaible slot, if both slots are full do nothing*/
    setColor(color:Color){
        if(this.slot1 == Color.NULL){
            this.slot1 = color;
        }else if(this.slot2 == Color.NULL){
            this.slot2 = color;
        }
    }
    
    /*if both slots are full output mix, if one slot full output one, if both empty output white*/
    outputMix():Color{
        return ColorMixer.mixColors(this.slot1,this.slot2);
    }

}
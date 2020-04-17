import ColorMixer  from "./colorMixer";
import { Color } from "./color";

export default class ColorPalette{
    private slot1: Color | null;
    private slot2: Color | null;

    constructor(){
        this.slot1 = null;
        this.slot2 = null;
    }

    clearColors(){
        this.slot1 = null;
        this.slot2 = null;
    }

    /*puts specfied color in first avaible slot, if both slots are full do nothing*/
    setColor(color:Color){
        if(this.slot1 == null){
            this.slot1 = color;
        }else if(this.slot1 != null && this.slot2 == null){
            this.slot2 = color;
        }else if(this.slot1 != null && this.slot2 != null){
            //don't set
        }
    }
    
    /*if both slots are full output mix, if one slot full output one, if both empty output white*/
    outputMix():Color{
        let output:Color;
        if(this.slot1 != null && this.slot2 != null){
            return ColorMixer.mixColors(this.slot1,this.slot2);
        }else if(this.slot1 != null && this.slot2 == null){
            return this.slot1;
        }else if(this.slot1 == null && this.slot2 != null){
            return this.slot2;
        }else{
            return Color.WHITE; //returning white means no tint
        }
    }

}
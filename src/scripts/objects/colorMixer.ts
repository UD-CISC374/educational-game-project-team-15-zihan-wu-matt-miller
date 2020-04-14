import { Color } from "./color";

export default class ColorMixer{
    private constructor(){
        // Dont do anything, meant to be act as a static class
    }

    static mixColors(color1:Color, color2:Color):Color{
        let r1:number, r2:number, rOut:string, g1:number, g2:number, gOut:string, b1:number, b2:number, bOut:string;
        let hexCodeOut:string;
        // Convert the decimal number to hex strings
        let hexCode1:string = color1.toString(16);
        let hexCode2:string = color2.toString(16);

        // Make all the hex strings 6 characters(by adding 0's in front where needed)
        hexCode1 = this.addZeroes(hexCode1,6);
        hexCode2 = this.addZeroes(hexCode2,6);

        //console.log(hexCode1, hexCode2);

        // Split the string into 3 parts, R, G and B values(and convert to decimal)
        r1 = parseInt(hexCode1.substr(0,2),16);
        r2 = parseInt(hexCode2.substr(0,2),16);

        g1 = parseInt(hexCode1.substr(2,2),16);
        g2 = parseInt(hexCode2.substr(2,2),16);

        b1 = parseInt(hexCode1.substr(4,2),16);
        b2 = parseInt(hexCode2.substr(4,2),16);

        //console.log(r1,g1,b1);

        // Average the R, G and B values for each color 
        // Use Math.ceil or round down and add 1 at the end?
        rOut = this.addZeroes(Math.ceil((r1+r2)/2).toString(16), 2);
        gOut = this.addZeroes(Math.ceil((g1+g2)/2).toString(16), 2);
        bOut = this.addZeroes(Math.ceil((b1+b2)/2).toString(16), 2);

        //console.log(rOut,gOut,bOut);

        hexCodeOut = rOut + gOut + bOut;

        //console.log("hexCodeOut",hexCodeOut);
        //console.log("hexCodeOut",parseInt(hexCodeOut,16));

        return parseInt(hexCodeOut,16);
    }

    static addZeroes(hexCode:string, desiredLength:number):string{
        for(let i:number = hexCode.length; i < desiredLength; i++){
            hexCode = '0' + hexCode;
        }
        return hexCode;
    }
}
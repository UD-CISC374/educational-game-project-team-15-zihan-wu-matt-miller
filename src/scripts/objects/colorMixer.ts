import { Color } from "./color";

export default class ColorMixer{
    private constructor(){
        // Dont do anything, meant to be act as a static class
    }

    static mixColors(color1:Color, color2:Color):Color{

        // If the colors are the same, return one of the colors
        if(color1 == color2)
            return color1;

        // For now, we only have the mixing of the primary colors
        if((color1 == Color.RED && color2 == Color.BLUE) || (color2 == Color.RED && color1 == Color.BLUE))
            return Color.PURPLE;
        else if((color1 == Color.BLUE && color2 == Color.YELLOW) || (color2 == Color.BLUE && color1 == Color.YELLOW) )
            return Color.GREEN;
        else if((color1 == Color.YELLOW && color2 == Color.RED) || (color2 == Color.BLUE && color1 == Color.YELLOW) )
            return Color.ORANGE;

            // Return -1 if no matches were found
        return -1;
    }

    static rgb2cmyk(r:number, g:number, b:number){
        let c = 255 - r;
        let m = 255 - g;
        let y = 255 - b;

        let k = Math.min(c, m, y);

        c = ((c - k) / (255 - k));
        m = ((m - k) / (255 - k));
        y = ((y - k) / (255 - k));
        
        return {
            c: c,
            m: m,
            y: y,
            k: k
        }
    }

    static cmyk2rgb(c:number, m:number, y:number, k:number){
        c = (c / 100);
        m = (m / 100);
        y = (y / 100);
        k = (k / 100);
        
        let r = c * (1 - k) + k;
        let g = m * (1 - k) + k;
        let b = y * (1 - k) + k;
        
        r = Math.round((1.0 - r) * 255.0 + 0.5);
        g = Math.round((1.0 - g) * 255.0 + 0.5);
        b = Math.round((1.0 - b) * 255.0 + 0.5);
        
        return {
            r: r,
            g: g,
            b: b
        }
    }q

    static addZeroes(hexCode:string, desiredLength:number):string{
        for(let i:number = hexCode.length; i < desiredLength; i++){
            hexCode = '0' + hexCode;
        }
        return hexCode;
    }

    // This isnt use right now, maybe fix it up for later?

    /*
        let r1:number, r2:number, rOut:string, g1:number, g2:number, gOut:string, b1:number, b2:number, bOut:string, cymk1, cymk2, cymk3;
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

        // Convert the rbg values to cymk

        cymk1 = this.rgb2cmyk(r1, g1, b1);
        console.log(cymk1);
        cymk2 = this.rgb2cmyk(r2, g2, b2);
        console.log(cymk2);
        cymk3 = {
            c: (cymk1.c + cymk2.c) / 2,
            y: (cymk1.y + cymk2.y) / 2,
            m: (cymk1.m + cymk2.m) / 2,
            k: (cymk1.k + cymk2.k) / 2
        }

        console.log(cymk3);

        let rbg = this.cmyk2rgb(cymk3.c, cymk3.y, cymk3.m, cymk3.k);
        
        console.log(rbg);

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
        */
}
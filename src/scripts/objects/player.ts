export default class Player extends Phaser.GameObjects.Sprite{

    SIZE: number = 32;

    up:boolean = false;
    down:boolean = false;
    left:boolean = false;
    right:boolean = false;

    velocity:number = 3;

    constructor(scene: Phaser.Scene, x:number, y:number){
        super(scene, x, y, 'player');
        scene.add.existing(this);
    }

    /* Takes in a keyeven and a boolean variable that controls 
    whether the value is being made true or false. Will be passed
    true to keydown, and false on keyup */
    keyHandle(event:KeyboardEvent, var_bool: boolean){

        switch(event.keyCode){
            case 87: //w
                this.up = var_bool;
                //console.log("w");
            break;

            case 65: // a
                this.left = var_bool;
                //console.log("a");
            break;

            case 83: // s
                this.down = var_bool;
                //console.log("s");
            break;

            case 68: // d
                this.right = var_bool;
                //console.log("d");
            break;

            default:
            break;
        }
    }

    // Move based on the boolean values 
    move(){
        // Might need to '&&' a bounds check or a wall check later
        if(this.up)
            this.y -= this.velocity;
        if(this.down)
            this.y += this.velocity;
        if(this.left)
            this.x -= this.velocity;
        if(this.right)
            this.x += this.velocity
    }
}
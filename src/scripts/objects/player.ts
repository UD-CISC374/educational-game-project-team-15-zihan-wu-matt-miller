import ColorMixer from '../objects/colorMixer';
import { Color } from '../objects/color';
export default class Player extends Phaser.Physics.Arcade.Sprite{
    body: Phaser.Physics.Arcade.Body;

    velocityX:number = 100;
    velocityY:number = 100;
    priorDir:number = 0;

    constructor(scene: Phaser.Scene, x:number, y:number){
        super(scene, x, y, 'player');
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.play("player_down");
    }


    // Move based on cursor in scene that's passed into player
    // don't change posn, change velocity so phaser's physics engine can handle collision by self
    // does not allow diagonal movement (for sprite simplicity)
    move(cursor){
        this.setVelocity(0,0);
        //this.anims.stop(); 
        //better to have an idle, stops on blurry frames sometimes
        let framesPerDirection:number = 3;
        
        console.log('Blue + Red = ',ColorMixer.mixColors(Color.BLUE, Color.RED));
        console.log(ColorMixer.mixColors(Color.RED, Color.WHITE));

        if(cursor.up.isDown){
            this.setVelocityY(-this.velocityY);
            this.play("player_up",true);
            this.priorDir = 3;
        }else if(cursor.down.isDown){
            this.setVelocityY(this.velocityY);
            this.play("player_down",true);
            this.priorDir = 0;
        }else if(cursor.left.isDown){
            this.setVelocityX(-this.velocityX);
            this.play("player_left",true);
            this.priorDir = 1;
        }else if(cursor.right.isDown){
            this.setVelocityX(this.velocityX);
            this.play("player_right",true);
            this.priorDir = 2;
        }else{
            this.setVelocity(0,0);
            this.anims.stop(); 
            this.setFrame(1 + (this.priorDir * framesPerDirection));
        }
    }
    

}
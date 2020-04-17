import { Color } from "./color";

export default class Player extends Phaser.Physics.Arcade.Sprite{
    body: Phaser.Physics.Arcade.Body;

    velocityX:number = 100;
    velocityY:number = 100;
    color:Color = Color.WHITE;
    prevDir:number = 0;

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

        if(cursor.up.isDown){
            this.setVelocityY(-this.velocityY);
            this.play("player_up",true);
            this.prevDir = 3;
        }else if(cursor.down.isDown){
            this.setVelocityY(this.velocityY);
            this.play("player_down",true);
            this.prevDir = 0;
        }else if(cursor.left.isDown){
            this.setVelocityX(-this.velocityX);
            this.play("player_left",true);
            this.prevDir = 1;
        }else if(cursor.right.isDown){
            this.setVelocityX(this.velocityX);
            this.play("player_right",true);
            this.prevDir = 2;
        }else{
            this.setVelocity(0,0);
            this.anims.stop(); 
            this.setFrame(1 + (this.prevDir * framesPerDirection));
        }
    }
    

}
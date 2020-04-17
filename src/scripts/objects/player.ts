import { Color } from "./color";

export default class Player extends Phaser.Physics.Arcade.Sprite{
    body: Phaser.Physics.Arcade.Body;

    velocityX:number = 100;
    velocityY:number = 100;
    color:Color = Color.WHITE;

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
        }else if(cursor.down.isDown){
            this.setVelocityY(this.velocityY);
            this.play("player_down",true);
        }else if(cursor.left.isDown){
            this.setVelocityX(-this.velocityX);
            this.play("player_left",true);
        }else if(cursor.right.isDown){
            this.setVelocityX(this.velocityX);
            this.play("player_right",true);
        }
    }
    

}
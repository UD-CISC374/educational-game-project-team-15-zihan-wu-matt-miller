export default class EndScene extends Phaser.Scene {
    player;

    constructor(){
        super({key: 'EndScene'});
    }


    create(){
        this.player = this.add.sprite(100, 100, "player");
        this.player.setScale(3);
        this.player.play("player_right");
    }

}
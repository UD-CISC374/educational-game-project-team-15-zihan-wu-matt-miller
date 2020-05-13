export default class EndScene extends Phaser.Scene {
    player;
    floor;
    sceneWidth;
    sceneHeight;
    gem;
    clickSFX: Phaser.Sound.BaseSound;
    music: Phaser.Sound.BaseSound;

    constructor(){
        super({key: 'EndScene'});
    }

    init(){
        this.sceneWidth = this.cameras.main.width;
        this.sceneHeight = this.cameras.main.height;
    }

    create(){
        this.music = this.sound.add('victory',{ loop:true, volume:0.5 });
        this.music.play();
        this.clickSFX = this.sound.add('click-1',{ loop:false, volume:0.5 });
        this.floor = this.add.rectangle( 0, 200, this.sceneWidth, this.sceneHeight/3, 0xFFFFFF).setOrigin(0,0);
        this.gem = this.add.sprite(this.sceneWidth-290, 280, "gem");
        this.gem.setScale(8);
        this.gem.play("gem_rotate");

        this.player = this.add.sprite(100, 250, "player");
        this.player.setScale(7);
        this.player.play("player_right");



        this.tweens.add({
            targets     : this.player,
            x           : this.sceneWidth-410,
            ease        : 'Linear',
            duration    : 3200,
        });

        setTimeout(() => {
            this.player.anims.stop();
            this.player.setFrame(7);
            setTimeout(() => {
                this.player.play("player_right");
                this.tweens.add({
                    targets     : this.player,
                    x           : this.sceneWidth-300,
                    ease        : 'Linear',
                    duration    : 200,
                });
        
                setTimeout(() => {
                    this.player.anims.stop();
                    this.player.setFrame(1);
                    
                    this.tweens.add({
                        targets     : this.gem,
                        y           : 80,
                        alpha       : {from: 0, to: 1},
                        ease        : 'Cubic',
                        duration    : 1000,
                    });
                    setTimeout(() => {
                        let completetext = this.add.text(0, 250, "MISSION COMPLETE").setOrigin(0,0).setFontFamily('MS PGothic').setFontStyle('bold').setFontSize(90).setColor('#000').setStroke('#000', 4);
                        this.tweens.add({
                            targets     : completetext,
                            x           : {from: 0, to: 35},
                            alpha       : {from: 0, to: 1},
                            ease        : 'Bounce.easeOut',
                            duration    : 1000,
                        });
                        let button = this.add.image(this.sceneWidth/2, 500, 'play-bttn-up').setDepth(99);
                        button.setInteractive();
                        //button.setScale(2,2);

                        button.on('pointerover', () => {
                            button.setTexture('play-bttn-dwn');
                            button.setScale(1.1);
                        });
                        button.on('pointerout', () => {
                            button.setTexture('play-bttn-up');
                            button.setScale(1);
                        });
                        button.on('pointerup', () => {
                            this.clickSFX.play();
                            let black = this.add.rectangle( 0, 0, this.sceneWidth, this.sceneHeight, 0x000000).setOrigin(0,0).setDepth(100);
                            this.tweens.add({
                                targets     : black,
                                alpha       : {from:0, to:1},
                                ease        : 'Exponential',
                                duration    : 200,
                            });
                            this.tweens.add({
                                targets     : this.music,
                                volume      : 0,
                                ease        : 'Linear',
                                duration    : 400,
                            });
                            setTimeout(() => {
                                this.music.stop();
                                this.scene.start("StartScene");
                            }, 500 );
                        });
                    }, 350);
                }, 450);

            },800);
    
        }, 3200);


        //this.player.setFrame(1);
    }

}
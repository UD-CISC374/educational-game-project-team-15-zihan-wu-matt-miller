import Music from '../objects/music';

export default class Controls extends Phaser.Scene{
    // Sound variables
    clickSFX:Phaser.Sound.BaseSound;
    tickSFX:Phaser.Sound.BaseSound;


    centerX:number;
    centerY:number;

    background: Phaser.GameObjects.Image;
    info: Phaser.GameObjects.Image;
    back_button: Phaser.GameObjects.Image;

    constructor(){
        super({key: 'Controls'});
    }

    init(){
        this.centerX = this.cameras.main.centerX;
        this.centerY = this.cameras.main.centerY;
    }

    preload(){
        this.load.image("start-bkg","assets/start-bkg-reg.jpg");
        this.load.image("info","assets/info-formatted.png");
        this.load.image('back-bttn-up','assets/back-up.png');
        this.load.image('back-bttn-dwn','assets/back-down.png');
    }

    create(){
        // Load clicking sound
        this.clickSFX = this.sound.add('click-1',{ loop:false, volume:0.5 });
        this.tickSFX = this.sound.add('tick',{ loop:false, volume:0.5 });

        this.background = this.add.image(-180,-480,'start-bkg').setOrigin(0,0);
        this.info = this.add.image(this.centerX, this.centerY,'info');

        this.back_button = this.add.image(25,25, 'back-bttn-up').setOrigin(0,0);
        this.back_button.setInteractive();
        this.back_button.on('pointerover',(event) => {
            this.tickSFX.play();
            this.back_button.setTexture('back-bttn-dwn');
            this.back_button.setScale(1.1);
        });
        this.back_button.on('pointerout',(event) => {
            this.tickSFX.play();
            this.back_button.setTexture('back-bttn-up');
            this.back_button.setScale(1);
        });
        this.back_button.on('pointerup',(event) => {
            this.clickSFX.play();
            // Stop the music and let it reset upon entering startscene
            //Music.bkgSFX.stop();
            //Music.musicPlaying = false;
            this.scene.start('StartScene');
        });
    }
}
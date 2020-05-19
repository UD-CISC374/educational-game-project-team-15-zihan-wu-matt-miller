import Tutorial from '../objects/tutorial';
import Music from '../objects/music';

export default class StartScene extends Phaser.Scene{

    centerX:number;
    centerY:number;

    background: Phaser.GameObjects.Image;
    title: Phaser.GameObjects.Image;
    play_button: Phaser.GameObjects.Image;
    controls_button: Phaser.GameObjects.Image;

    first_level_key:string = 'Options';// Level1Scene MainScene EndScene Options

    // Sound variables
    clickSFX:Phaser.Sound.BaseSound;
    tickSFX:Phaser.Sound.BaseSound;
    bkgSFX:Phaser.Sound.BaseSound;

    constructor(){
        super({key: 'StartScene'});
    }

    init(){
        this.centerX = this.cameras.main.centerX;
        this.centerY = this.cameras.main.centerY;
        // Make tutorial flags reset from startScrene
        Tutorial.resetFlags();
    }

    create(){
        // Load clicking sound
        this.clickSFX = this.sound.add('click-1',{ loop:false, volume:0.5 });
        this.tickSFX = this.sound.add('tick',{ loop:false, volume:0.5 });
        //this.bkgSFX = this.sound.add('bkg', { loop: true});
        if(!Music.addedOnce){
            Music.bkgSFX = this.sound.add('bkg', { loop: true});
            Music.addedOnce = true;
        }
        if(!Music.musicPlaying){
            Music.bkgSFX.play();
            Music.musicPlaying = true;
        }

        this.background = this.add.image(-180,-480,'start-bkg').setOrigin(0,0);

        this.title = this.add.image(this.centerX, 80, 'title').setOrigin(0.5,0);

        this.play_button = this.add.image(this.centerX, this.centerY, 'play-bttn-up');
        // Make this button interactivable
        this.play_button.setInteractive();
        // Set those interactions
        this.play_button.on('pointerover',(event) => {
            this.tickSFX.play();
            this.play_button.setTexture('play-bttn-dwn');
            this.play_button.setScale(1.1);
        });
        this.play_button.on('pointerout',(event) => {
            this.tickSFX.play();
            this.play_button.setTexture('play-bttn-up');
            this.play_button.setScale(1);
        });
        this.play_button.on('pointerup',(event) => {
            this.clickSFX.play();
            this.scene.start(this.first_level_key);
        });

        this.controls_button = this.add.image(this.centerX, this.centerY + (this.play_button.height * 1.5), 'ctrl-bttn-up');
        this.controls_button.setInteractive();

        // Set those interactions
        this.controls_button.on('pointerover',(event) => {
            this.tickSFX.play();
            this.controls_button.setTexture('ctrl-bttn-dwn');
            this.controls_button.setScale(1.1);
        });
        this.controls_button.on('pointerout',(event) => {
            this.tickSFX.play();
            this.controls_button.setTexture('ctrl-bttn-up');
            this.controls_button.setScale(1);
        });
        this.controls_button.on('pointerup',(event) => {
            // Jump to another scene...
            this.clickSFX.play();
            this.scene.start('Controls');
        });
    }
}
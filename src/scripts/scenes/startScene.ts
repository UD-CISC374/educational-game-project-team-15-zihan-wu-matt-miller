import Tutorial from '../objects/tutorial';

export default class StartScene extends Phaser.Scene{

    centerX:number;
    centerY:number;

    background: Phaser.GameObjects.Image;
    title: Phaser.GameObjects.Image;
    play_button: Phaser.GameObjects.Image;
    controls_button: Phaser.GameObjects.Image;

    first_level_key:string = 'Level1Scene';// Level1Scene MainScene

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
        this.background = this.add.image(-180,-480,'start-bkg').setOrigin(0,0);

        this.title = this.add.image(this.centerX, 80, 'title').setOrigin(0.5,0);

        this.play_button = this.add.image(this.centerX, this.centerY, 'play-bttn-up');
        // Make this button interactivable
        this.play_button.setInteractive();
        // Set those interactions
        this.play_button.on('pointerover',(event) => {
            this.play_button.setTexture('play-bttn-dwn');
            this.play_button.setScale(1.1);
            // play sound???
        });
        this.play_button.on('pointerout',(event) => {
            this.play_button.setTexture('play-bttn-up');
            this.play_button.setScale(1);
            // play sound???
        });
        this.play_button.on('pointerup',(event) => {
            this.scene.start(this.first_level_key);
            // Play clicking sound???
        });

        this.controls_button = this.add.image(this.centerX, this.centerY + (this.play_button.height * 1.5), 'ctrl-bttn-up');
        this.controls_button.setInteractive();

        // Set those interactions
        this.controls_button.on('pointerover',(event) => {
            this.controls_button.setTexture('ctrl-bttn-dwn');
            this.controls_button.setScale(1.1);
            // play sound???
        });
        this.controls_button.on('pointerout',(event) => {
            this.controls_button.setTexture('ctrl-bttn-up');
            this.controls_button.setScale(1);
            // play sound???
        });
        this.controls_button.on('pointerup',(event) => {
            // Jump to another scene...
            // Play clicking sound???
            this.scene.start('Controls');
        });
    }

    update(){

    }
}
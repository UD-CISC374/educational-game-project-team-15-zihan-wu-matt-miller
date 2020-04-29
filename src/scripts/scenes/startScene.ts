export default class StartScene extends Phaser.Scene{

    centerX:number;
    centerY:number;

    background: Phaser.GameObjects.Image;
    play_button: Phaser.GameObjects.Image;

    constructor(){
        super({key: 'StartScene'});
    }

    

    init(){
        this.centerX = this.cameras.main.centerX;
        this.centerY = this.cameras.main.centerY;
    }

    preload(){
        this.load.image("start-bkg","assets/start-bkg-reg.jpg");
        this.load.image("play-bttn-dwn","assets/play-bttn-dwn.png");
        this.load.image("play-bttn-up","assets/play-bttn-up.png");
    }

    create(){
        this.background = this.add.image(-200,-480,'start-bkg').setOrigin(0,0);

        this.play_button = this.add.image(this.centerX, this.centerY, 'play-bttn-up');
        // Make this button interactivable
        this.play_button.setInteractive();
        // Set those interactions
        this.play_button.on('pointerover',(event) => {
            this.play_button.setTexture('play-bttn-dwn');
            this.play_button.setScale(1.1);
        });
        this.play_button.on('pointerout',(event) => {
            this.play_button.setTexture('play-bttn-up');
            this.play_button.setScale(1);
        });
        this.play_button.on('pointerup',(event) => {
            this.scene.start('MainScene');
        });

        //this.background.scaleX = 0.8;
    }

    update(){

    }
}
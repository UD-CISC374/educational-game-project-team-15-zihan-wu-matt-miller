import Tutorial from '../objects/tutorial';

export default class Options extends Phaser.Scene{

    sceneWidth: number;
    sceneHeight: number;
    text: Phaser.GameObjects.Text;

    yesBttn: Phaser.GameObjects.Image;
    noBttn: Phaser.GameObjects.Image;

    // SFX variables
    clickSFX: Phaser.Sound.BaseSound;
    tickSFX: Phaser.Sound.BaseSound;

    constructor(){
        super({key: 'Options'});
    }


    create(){
        this.sceneWidth = this.cameras.main.width;
        this.sceneHeight = this.cameras.main.height;

        this.clickSFX = this.sound.add('click-1',{ loop:false, volume:0.5 });
        this.tickSFX = this.sound.add('tick',{ loop:false, volume:0.5 });

        this.text = this.add.text(this.sceneWidth/2,this.sceneHeight/4,'Play with tutorial on?');
        this.text.setOrigin(0.5,0.5);
        this.text.setColor('white');
        this.text.setFontFamily('MS PGothic');
        this.text.setFontStyle('bold');
        this.text.setFontSize(60);

        this.yesBttn = this.add.image(this.sceneWidth/2, this.sceneHeight/2, 'yes-black');
        this.noBttn = this.add.image(this.sceneWidth/2, (this.sceneHeight*2.5)/4, 'no-black');
        this.yesBttn.setInteractive();
        this.noBttn.setInteractive();
        
        // Set up yesBttn
        this.yesBttn.on('pointerover', () => {
            this.tickSFX.play();
            this.yesBttn.setTexture('yes-white');
            this.yesBttn.setScale(1.1);
        });
        this.yesBttn.on('pointerout', () => {
            this.tickSFX.play();
            this.yesBttn.setTexture('yes-black');
            this.yesBttn.setScale(1);
        });
        this.yesBttn.on('pointerup', () => {
            this.clickSFX.play();
            // start first scene with tutorial
            Tutorial.tutorialEnabled = true;
            this.scene.start('Level1Scene');
        });

        // Set up noBttn
        this.noBttn.on('pointerover', () => {
            this.tickSFX.play();
            this.noBttn.setTexture('no-white');
            this.noBttn.setScale(1.1);
        });
        this.noBttn.on('pointerout', () => {
            this.tickSFX.play();
            this.noBttn.setTexture('no-black');
            this.noBttn.setScale(1);
        });
        this.noBttn.on('pointerup', () => {
            this.clickSFX.play();
            // start first scene without tutorial
            Tutorial.tutorialEnabled = false;
            this.scene.start('Level1Scene');
        });


    }
}
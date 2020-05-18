import { Sleeping } from "matter";

import Timer from '../objects/timer';
import { Color } from "../objects/color";

export default class IntroScene extends Phaser.Scene {
    player: Phaser.GameObjects.Sprite;
    floor: Phaser.GameObjects.Rectangle;
    sceneWidth: number;
    sceneHeight: number;
    gem: Phaser.GameObjects.Sprite;
    completetext: Phaser.GameObjects.Text;
    button: Phaser.GameObjects.Image;
    timeline; 
    // SFX variables
    clickSFX: Phaser.Sound.BaseSound;
    tickSFX: Phaser.Sound.BaseSound;
    music: Phaser.Sound.BaseSound;
    musicPlayedOnce = false;
    color = Color.PURPLE;

    constructor() {
        super({ key: 'IntroScene' });
    }

    preload() {
        this.completetext = this.add.text(this.sceneWidth/2, 100, "BREAKING NEWS")
        .setOrigin(.5,.5).setFontFamily('MS PGothic').setFontStyle('bold').setFontSize(90).setStroke('#000', 4).setDepth(99);

        let text =  this.add.text(this.sceneWidth/2, 500, "FAMOUS CAT CAPER OUT TO STEAL \nPRICELESS GEM COLLECTION!")
        .setOrigin(.5,.5).setFontFamily('MS PGothic').setFontSize(24).setAlign('center').setLineSpacing(16).setDepth(99);

        //i don't know for the life of me why the sound is played more than once
        if (this.musicPlayedOnce == false) {
            this.music = this.sound.add('jazz', { loop: true, volume: 0.5 });
            this.music.play();
            this.musicPlayedOnce = true;
        }
        // Add SFX variables
        this.clickSFX = this.sound.add('click-1', { loop: false, volume: 0.5 });
        this.tickSFX = this.sound.add('tick', { loop: false, volume: 0.5 });

        this.floor = this.add.rectangle(0, 200, this.sceneWidth, this.sceneHeight / 3, this.color).setOrigin(0, 0);

        this.player = this.add.sprite(-200, 250, "player");
        this.player.setScale(7);

    }
    init() {
        this.sceneWidth = this.cameras.main.width;
        this.sceneHeight = this.cameras.main.height;
    }

    async create() {
        this.player.play("player_right");

        this.tweens.add({
            targets: this.player,
            x: this.sceneWidth/2,
            ease: 'Linear',
            duration: 3400
        });
        this.sleep(3400).then(()=>{
            this.player.play("player_down");
            this.player.anims.stop();
            this.player.setFrame(1);
            
            this.sleep(800).then(()=>{
                this.player.tint = this.color;
                this.player.setFrame(2);
                this.sleep(500).then(()=>{
                    this.player.play("player_right");
                    this.tweens.add({
                        targets: this.player,
                        x: this.sceneWidth+200,
                        ease: 'Linear',
                        duration: 3500
                    }); 
                    this.sleep(3500).then(()=>{  
                        let black = this.add.rectangle( 0, 0, this.sceneWidth, this.sceneHeight, 0x000000).setOrigin(0,0).setDepth(100);
                        this.tweens.add({
                            targets: black,
                            alpha: { from: 0, to: 1 },
                            ease: 'Exponential',
                            duration: 1000,
                        });
                        this.sleep(1000).then(()=>{  
                            this.tweens.add({
                                targets:  this.music,
                                volume:   0,
                                duration: 500
                            });
                            this.sleep(500).then(()=>{  
                                this.music.stop();
                                this.musicPlayedOnce = false;
                                this.scene.start('Level1Scene');
                            });
                        });
                    })   
                });
            });
        });

    }

    async sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}
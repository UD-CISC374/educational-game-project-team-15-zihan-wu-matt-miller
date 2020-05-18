import { Sleeping } from "matter";
import Music from '../objects/music';
import Timer from '../objects/timer';

export default class EndScene extends Phaser.Scene {
    player: Phaser.GameObjects.Sprite;
    floor: Phaser.GameObjects.Rectangle;
    sceneWidth: number;
    sceneHeight: number;
    gem: Phaser.GameObjects.Sprite;
    completetext: Phaser.GameObjects.Text;
    button: Phaser.GameObjects.Image;

    // SFX variables
    clickSFX: Phaser.Sound.BaseSound;
    tickSFX: Phaser.Sound.BaseSound;
    music: Phaser.Sound.BaseSound;
    musicPlayedOnce = false;

    // Time variables
    totalTime: string = '';
    timerTXT: Phaser.GameObjects.Text;

    constructor() {
        super({ key: 'EndScene' });
    }

    preload() {
        //i don't know for the life of me why the sound is played more than once
        if (this.musicPlayedOnce == false) {
            this.music = this.sound.add('victory', { loop: true, volume: 0.5 });
            this.music.play();
            this.musicPlayedOnce = true;
        }
        // Add SFX variables
        this.clickSFX = this.sound.add('click-1', { loop: false, volume: 0.5 });
        this.tickSFX = this.sound.add('tick', { loop: false, volume: 0.5 });

        this.floor = this.add.rectangle(0, 200, this.sceneWidth, this.sceneHeight / 3, 0xFFFFFF).setOrigin(0, 0);
        this.gem = this.add.sprite(this.sceneWidth - 290, 280, "gem");
        this.gem.setScale(8);

        this.player = this.add.sprite(-100, 250, "player");
        this.player.setScale(7);
    }

    init() {
        this.sceneWidth = this.cameras.main.width;
        this.sceneHeight = this.cameras.main.height;
        // Only set the time once
        if (this.totalTime == '')
            this.totalTime = Timer.getFormattedTime();
    }

    create() {
        //note to self: maybe use video next time, tweens get laggy and complicated
        
        this.gem.play("gem_rotate");
        this.player.play("player_right");

        Music.bkgSFX.stop();
        Music.musicPlaying = false;

        this.tweens.add({
            targets: this.player,
            x: this.sceneWidth - 300,
            ease: 'Linear',
            duration: 3200,
        });
        this.sleep(3200).then(() => {
            this.sleep(200).then(() => {
                this.player.anims.stop();
                this.player.setFrame(1);

                this.sleep(200).then(() => {
                    this.tweens.add({
                        targets: this.gem,
                        y: 80,
                        ease: 'Exponential',
                        duration: 800,
                    });
                    this.sleep(1500).then(() => {

                            this.completetext = this.add.text(35, 250, "MISSION COMPLETE")
                            .setOrigin(0, 0).setFontFamily('MS PGothic').setFontStyle('bold').setFontSize(90).setColor('#000').setStroke('#000', 4).setDepth(99);
                            
                            this.timerTXT = this.add.text(this.sceneWidth / 2, this.sceneHeight / 6, this.totalTime).setOrigin(.5, .5);
                            this.timerTXT.setColor('white');
                            this.timerTXT.setFontFamily('MS PGothic');
                            this.timerTXT.setFontStyle('bold');
                            this.timerTXT.setFontSize(60);

                            this.button = this.add.image(this.sceneWidth / 2, 500, 'play-bttn-up').setOrigin(.5, .5).setDepth(99);
                            this.button.setInteractive();
                            
                            this.button.on('pointerover',() => {
                                this.tickSFX.play();
                                this.button.setTexture('play-bttn-dwn');
                                this.button.setScale(1.1);
                            });
                            this.button.on('pointerout',() => {
                                this.tickSFX.play();
                                this.button.setTexture('play-bttn-up');
                                this.button.setScale(1);
                            });
                            this.button.on('pointerup', () => {
                                this.clickSFX.play();
                                let black = this.add.rectangle(0, 0, this.sceneWidth, this.sceneHeight, 0x000000).setOrigin(0, 0).setDepth(100);
                                this.tweens.add({
                                    targets: black,
                                    alpha: { from: 0, to: 1 },
                                    ease: 'Exponential',
                                    duration: 200,
                                });
                                this.sleep(500).then(() => {
                                    this.music.stop();
                                    this.musicPlayedOnce = false;
                                    this.scene.start('StartScene');
                                });
                            });
                    });
                });
            });
        });
    }

    async sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
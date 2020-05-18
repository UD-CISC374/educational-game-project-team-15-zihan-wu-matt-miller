export default class Music{

    /**
     * Is turned on when the bkg music is turned on, so it doesnt play over and over
     */
    static musicPlaying:boolean = false;

    static bkgSFX: Phaser.Sound.BaseSound;
    static addedOnce:boolean = false;

    private constructor(){ }

}
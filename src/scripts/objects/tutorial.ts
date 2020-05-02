export default class Tutorial {

    static movement:boolean = false;
    static movement_flag:boolean = false;
    static gem:boolean = false;
    static suspicion:boolean = false;
    static mix:boolean = false;

    // Private constructor so no one can make an instance of it
    private constructor(){ }

    // Handle the various conditions

    // No condition has to be met for this to activate
    static handleMovement(scene: Phaser.Scene){
        // If this has already been triggered then just return
        if(Tutorial.movement)
            return;
        // Otherwise
        Tutorial.movement = true;
        console.log('handleMovement');

        let mainCamera: Phaser.Cameras.Scene2D.Camera = scene.cameras.main;
        let helpingImage: Phaser.GameObjects.Image = scene.add.image(mainCamera.centerX, mainCamera.centerY, 'mv-tut-wht');
        helpingImage.setY(helpingImage.y - helpingImage.height/2);

        let cursorKeys = scene.input.keyboard.createCursorKeys();

        // On using the arrow keys, get rid of the message
        scene.input.keyboard.on('keydown', (event) => { 
            if(event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40)
                Tutorial.movement_flag = true;
        });

        Tutorial.movementLoop(helpingImage, 0);
    }

    static movementLoop(image:Phaser.GameObjects.Image, count:number){
        let timeout:number = 500;

        // Remove the image if the player has moved
        if (Tutorial.movement_flag){
            image.destroy();
            return;
        }

        Tutorial.sleep(timeout).then(() => {
            if(count % 2 == 0)
                image.setTexture('mv-tut-blck');
            else
                image.setTexture('mv-tut-wht');

            this.movementLoop(image, count+1);
        });
    }

    static handleGem(scene: Phaser.Scene){
        // If this has already been triggered then just return
        if(Tutorial.gem)
            return;
        // Otherwise
        Tutorial.gem = true;
    }

    static handleSuspicion(scene: Phaser.Scene){
        // If this has already been triggered then just return
        if(Tutorial.suspicion)
            return;
        // Otherwise
        Tutorial.suspicion = true;
    }

    static handleMix(scene: Phaser.Scene){
        // If this has already been triggered then just return
        if(Tutorial.mix)
            return;
        // Otherwise
        Tutorial.mix = true;
    }

    // Set all the flags back to false
    static resetFlags(){
        Tutorial.movement = false;
        Tutorial.gem = false;
        Tutorial.suspicion = false;
        Tutorial.mix = false;
    }

    // Returns promise with setTimeout to simulate sleeping
    // must use '.then()' after call to this 
    static async sleep(ms:number){
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
import Level from "../scenes/level";

export default class Tutorial {

    static movement:boolean = false;
    static movement_flag:boolean = false;
    static gem:boolean = false;
    static suspicion:boolean = false;
    static mix:boolean = false;
    static floor:boolean = false;

    // Private constructor so no one can make an instance of it
    private constructor(){ }

    // Handle the various conditions

    // No condition has to be met for this to activate
    static handleMovement(scene: Level){
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
        // Remove the image if the player has moved
        if (Tutorial.movement_flag){
            image.destroy();
            return;
        }

        Tutorial.sleep(500).then(() => {
            if(count % 2 == 0)
                image.setTexture('mv-tut-blck');
            else
                image.setTexture('mv-tut-wht');

            this.movementLoop(image, count+1);
        });
    }

    static handleGem(scene: Level){
        // If this has already been triggered then just return
        if(Tutorial.gem)
            return;
        // Otherwise
        Tutorial.gem = true;
    }

    static handleSuspicion(scene: Level){
        let timeout:number = 4000;
        // If this has already been triggered then just return
        if(Tutorial.suspicion)
            return;
        // Otherwise
        Tutorial.suspicion = true;

        let mainCamera: Phaser.Cameras.Scene2D.Camera = scene.cameras.main;
        let text:Phaser.GameObjects.Text = scene.add.text(mainCamera.centerX-mainCamera.centerX/2, mainCamera.centerY-mainCamera.centerY/2, 
            "Press 1 twice, then space\nto change to red", {font: "32px", fontWeight: "bold"}).setColor('white');
        let initColor:number = scene.player.color;

        // 'Pauses' the game before waiting for user to figure out command
        Tutorial.pauseGame(scene);
        scene.suspicion = 0;
        
        Tutorial.suspicionLoop(initColor, scene, text);
    }

    static pauseGame(scene: Level){
        scene.pauseSus = true;
        scene.player.pauseMovement = true;
        scene.player.anims.stop();
    }

    static suspicionLoop(initcolor:number, scene:Level, text:Phaser.GameObjects.Text){
        Tutorial.sleep(10).then(() => {
            if(scene.player.color != initcolor){
                text.destroy();
                scene.pauseSus = false;
                scene.player.pauseMovement = false;
                //scene.player.anims.play();
            }
            Tutorial.suspicionLoop(initcolor, scene, text);
        });
    }
    
    static handleFloor(scene: Level){
        if(Tutorial.floor)
            return;
        Tutorial.floor = true;
        let mainCamera: Phaser.Cameras.Scene2D.Camera = scene.cameras.main;
        let text:Phaser.GameObjects.Text = scene.add.text(mainCamera.centerX-mainCamera.centerX/2, mainCamera.centerY-mainCamera.centerY/2, 
            "Change your color to\nthe color of the floor", {font: "32px", fontWeight: "bold"}).setColor('white');

        Tutorial.floorLoop(scene, text);
    }

    static floorLoop(scene: Level, txt:Phaser.GameObjects.Text){
        Tutorial.sleep(10).then(() => {
            if(scene.player.color == scene.tileColor){
                console.log('MATCHED');
                txt.destroy();
                return;
            }

            Tutorial.floorLoop(scene, txt);
        });
    }

    // Get here when the player gets caught
    static handleMix(scene: Level){
        // Run this everytime the player dies
        /*if(Tutorial.mix)
            return;*/
        // Otherwise
        Tutorial.mix = true;
        let mainCamera: Phaser.Cameras.Scene2D.Camera = scene.cameras.main;
        let x = mainCamera.centerX - mainCamera.centerX/2;
        let y = 100;
        let text:Phaser.GameObjects.Text = scene.add.text(x, y, 
            "Match the color of the floor to\nkeep your suspicion low", {font: "32px", fontWeight: "bold"}).setColor('white');
        let arrow:Phaser.GameObjects.Image = scene.add.image(x + 500, y + 200, 'arrow-white');
            //Tutorial.sleep(3000).then(() => {text.destroy(); console.log('remove text');});
    }

    // Set all the flags back to false
    static resetFlags(){
        Tutorial.movement = false;
        Tutorial.movement_flag = false;
        Tutorial.gem = false;
        Tutorial.suspicion = false;
        Tutorial.mix = false;
        Tutorial.floor = false;
    }

    // Returns promise with setTimeout to simulate sleeping
    // must use '.then()' after call to this 
    static async sleep(ms:number){
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
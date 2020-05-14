import Level from "../scenes/level";
import { Color } from "./color";

export default class Tutorial {

    static movement:boolean = false;
    static movement_flag:boolean = false;
    static gem:boolean = false;
    static suspicion:boolean = false;
    static mix:boolean = false;
    static floor:boolean = false;
    static createColor:boolean = false;

    // Private constructor so no one can make an instance of it
    private constructor(){ }

    // Some helpful functions used by all
    /*static pauseGame(scene: Level){
        console.log('pause game');
        scene.pauseSus = true;
        scene.player.pauseMovement = true;
        scene.player.anims.stop();
    }
    static resumeGame(scene: Level){
        console.log('restart game');
        scene.pauseSus = false;
        scene.player.pauseMovement = false;
    }*/

    // Handle the various conditions

    // No condition has to be met for this to activate
    static handleMovement(scene: Level){
        // If this has already been triggered then just return
        if(Tutorial.movement)
            return;
        // Otherwise
        Tutorial.movement = true;

        let mainCamera: Phaser.Cameras.Scene2D.Camera = scene.cameras.main;
        let helpingImage: Phaser.GameObjects.Image = scene.add.image(mainCamera.centerX, mainCamera.centerY, 'mv-tut-wht');
        helpingImage.setY(helpingImage.y - helpingImage.height/2);

        let cursorKeys = scene.input.keyboard.createCursorKeys();

        // On using the arrow keys, get rid of the message
        scene.input.keyboard.on('keydown', (event) => { 
            if(event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40)
                Tutorial.movement_flag = true;
        });

        Tutorial.movementLoop(scene, helpingImage, 0);
    }

    // The loop waiting for the player to move the character
    static movementLoop(scene:Level, image:Phaser.GameObjects.Image, count:number){
        // Remove the image if the player has moved
        if (Tutorial.movement_flag){
            scene.successSFX.play();
            image.destroy();
            return;
        }

        Tutorial.sleep(500).then(() => {
            if(count % 2 == 0)
                image.setTexture('mv-tut-blck');
            else
                image.setTexture('mv-tut-wht');

            this.movementLoop(scene, image, count+1);
        });
    }

    static handleGem(scene: Level){
        // If this has already been triggered then just return
        if(Tutorial.gem)
            return;
        // Otherwise
        Tutorial.gem = true;
    }

    static handleCreateColor(scene: Level){
        if(Tutorial.createColor)
            return;
        Tutorial.createColor = true;
        scene.pauseGame();

        let mainCamera: Phaser.Cameras.Scene2D.Camera = scene.cameras.main;
        let text:Phaser.GameObjects.Text = scene.add.text(mainCamera.centerX-mainCamera.centerX/2, mainCamera.centerY-mainCamera.centerY/2, 
            "Create new colors by putting in two different\ncolors, then mix with spacebar");
        // Set settings for the text
        text.setColor('white');
        text.setFont('Arial Black');
        text.setFontStyle('bold');
        text.setFontSize(40);
        text.setBackgroundColor('black');

        // Get the color of the player
        let playerColor:Color = scene.player.color;

        Tutorial.loopColor(scene, text, playerColor);
    }

    // Loop waiting for the player to mix the correct color
    static loopColor(scene:Level, text:Phaser.GameObjects.Text, initColor:Color){
        Tutorial.sleep(10).then(() => {
            // Player changed color
            if(scene.player.color != initColor){
                // If they changed to the wrong color
                console.log('changed a little...');
                if(scene.player.color != scene.tileColor){
                    text.setText("Way to change colors! Try to change\nto the color on the floor.");
                } else { // They changed to the right color
                    //scene.successSFX.play(); // not needed
                    console.log('got it');
                    text.destroy();
                    scene.resumeGame();
                    return;
                }
            } 
            // Rerun the loop 
            Tutorial.loopColor(scene, text, initColor);
             
        });
    }

    static handleSuspicion(scene: Level){
        // If this has already been triggered then just return
        if(Tutorial.suspicion)
            return;
        // Otherwise
        Tutorial.suspicion = true;

        let mainCamera: Phaser.Cameras.Scene2D.Camera = scene.cameras.main;
        let text:Phaser.GameObjects.Text = scene.add.text(mainCamera.centerX-mainCamera.centerX/2, mainCamera.centerY-mainCamera.centerY/2, 
            "Press 1 to select red, then space\nto mix and create red");
        // Set settings for the text
        text.setColor('white');
        text.setFont('Arial Black');
        text.setFontStyle('bold');
        text.setFontSize(40);
        let initColor:Color = scene.player.color;

        // 'Pauses' the game before waiting for user to figure out command
        scene.pauseGame();
        scene.suspicion = 0;
        
        Tutorial.suspicionLoop(initColor, scene, text);
    }

    // Wait for the player to correctly create red
    static suspicionLoop(initcolor:number, scene:Level, text:Phaser.GameObjects.Text){
        Tutorial.sleep(500).then(() => {
            if(scene.player.color == Color.RED){
                //scene.successSFX.play(); // Not needed
                text.destroy();
                scene.resumeGame();
                return;
            } else if(scene.player.color != initcolor){
                // managed to change color but just not change to right color
                scene.wrongSFX.play();
                
            }
            Tutorial.suspicionLoop(scene.player.color, scene, text);
        });
    }
    
    static handleFloor(scene: Level){
        if(Tutorial.floor)
            return;
        Tutorial.floor = true;
        let mainCamera: Phaser.Cameras.Scene2D.Camera = scene.cameras.main;
        let text:Phaser.GameObjects.Text = scene.add.text(mainCamera.centerX-mainCamera.centerX/2, mainCamera.centerY-mainCamera.centerY/2, 
            "Change your color to\nthe color of the floor\nto stop your suspicion from\ngoing up", {font: "32px", fontWeight: "bold"});
        text.setColor('white');
        text.setFont('Arial Black');
        text.setFontStyle('bold');
        text.setFontSize(40);
        let arrow:Phaser.GameObjects.Image = scene.add.image(text.x + (text.width * 1.25), text.y, 'arrow-white').setOrigin(0,0);;
        scene.pauseGame();

        Tutorial.floorLoop(scene, text, arrow,0);
    }

    static floorLoop(scene: Level, txt:Phaser.GameObjects.Text, arrw:Phaser.GameObjects.Image, i:number){
        Tutorial.sleep(500).then(() => {
            // The player completed the condition, so exit the loop
            if(scene.player.color == scene.tileColor){
                //scene.successSFX.play(); // not needed
                txt.destroy();
                arrw.destroy();
                scene.resumeGame();
                let mainCamera: Phaser.Cameras.Scene2D.Camera = scene.cameras.main;
                Tutorial.displayTextTimed(scene, scene.add.text(mainCamera.centerX-mainCamera.centerX/2, mainCamera.centerY-mainCamera.centerY/2,
                "If the suspicion bar reaches\nthe top you'll be caught!"), 3000);
                return;
            } else if(i % 2 == 0)
                arrw.setTexture('arrow-black');
            else
                arrw.setTexture('arrow-white');

            Tutorial.floorLoop(scene, txt, arrw, i+1);
        });
    }

    /**
     * Display text for a given duration(in ms).
     * Pauses the game for the duration of showing the text.
     * */ 
    static displayTextTimed(scene:Level, text:Phaser.GameObjects.Text, duration:number){
        // Properly format the text
        text.setColor('white');
        text.setFont('Arial Black');
        text.setFontStyle('bold');
        text.setFontSize(40);
        // Pause the game
        scene.pauseGame();
        // Wait until desired time has passed, then remove the text and restart the game
        Tutorial.sleep(duration).then(() => {
            text.destroy();
            scene.resumeGame();
        });
    }

    // Get here when the player gets caught
    static handleMix(scene: Level){
        // Run this everytime the player dies
        /*if(Tutorial.mix)
            return;*/
        // Otherwise
        
        /*Tutorial.mix = true;
        let mainCamera: Phaser.Cameras.Scene2D.Camera = scene.cameras.main;
        let x = mainCamera.centerX - mainCamera.centerX/2;
        let y = 100;
        let text:Phaser.GameObjects.Text = scene.add.text(x, y, 
            "Match the color of the floor to\nkeep your suspicion low", {font: "32px", fontWeight: "bold"}).setColor('white');
        let arrow:Phaser.GameObjects.Image = scene.add.image(x + 500, y + 200, 'arrow-white');*/
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
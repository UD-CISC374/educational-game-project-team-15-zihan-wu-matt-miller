import Level from "../scenes/level";
import { Color } from "./color";

export default class Tutorial {

    static tutorialEnabled?: boolean = true;

    static movement:boolean = false;
    static movement_flag:boolean = false;
    static gem:boolean = false;
    static suspicion:boolean = false;
    static mix:boolean = false;
    static floor:boolean = false;
    static createColor:boolean = false;
    static fontfamily:string = '';

    // Private constructor so no one can make an instance of it
    private constructor(){ }

    //font style
    static setFontStyle(text : Phaser.GameObjects.Text){
        if(!Tutorial.tutorialEnabled)
            return;
        text.setColor('white');
        text.setFontFamily('MS PGothic');
        text.setFontStyle('bold');
        text.setFontSize(40);
        text.setBackgroundColor('#330066');
        //text.setStroke('#330066', 20);
        text.setWordWrapWidth(500); //textwrap
        text.setFixedSize(550,0); //textbox size
        text.setAlign('center');
        text.setDepth(99);
    }
    // Handle the various conditions

    // No condition has to be met for this to activate
    static handleMovement(scene: Level){
        if(!Tutorial.tutorialEnabled)
            return;
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
        if(!Tutorial.tutorialEnabled)
            return;
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
        if(!Tutorial.tutorialEnabled)
            return;
        // If this has already been triggered then just return
        if(Tutorial.gem)
            return;
        // Otherwise
        Tutorial.gem = true;
    }

    static handleCreateColor(scene: Level){
        if(!Tutorial.tutorialEnabled)
            return;

        if(Tutorial.createColor)
            return;
        Tutorial.createColor = true;
        scene.pauseGame();

        let mainCamera: Phaser.Cameras.Scene2D.Camera = scene.cameras.main;
        let text:Phaser.GameObjects.Text = scene.add.text(mainCamera.centerX-mainCamera.centerX/2, mainCamera.centerY-mainCamera.centerY/2, 
            "Create new colors by putting in two different colors, then mix with spacebar");
        // Set settings for the text
        Tutorial.setFontStyle(text);

        // Get the color of the player
        let playerColor:Color = scene.player.color;

        Tutorial.loopColor(scene, text, playerColor);
    }

    // Loop waiting for the player to mix the correct color
    private static loopColor(scene:Level, text:Phaser.GameObjects.Text, initColor:Color){
        Tutorial.sleep(10).then(() => {
            // Player changed color
            if(scene.player.color != initColor){
                // If they changed to the wrong color
                if(scene.player.color != scene.tileColor){
                    text.setText("Way to change colors! Try to change to the color on the floor.");
                } else { // They changed to the right color
                    //scene.successSFX.play(); // not needed
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
        if(!Tutorial.tutorialEnabled)
            return;
        // If this has already been triggered then just return
        if(Tutorial.suspicion)
            return;
        // Otherwise
        Tutorial.suspicion = true;

        let mainCamera: Phaser.Cameras.Scene2D.Camera = scene.cameras.main;
        let text:Phaser.GameObjects.Text = scene.add.text(mainCamera.centerX-mainCamera.centerX/2, mainCamera.centerY-mainCamera.centerY/2, 
            "Press 1 to select red, then space to mix and create red");
        // Set settings for the text
        Tutorial.setFontStyle(text);
        let initColor:Color = scene.player.color;

        // 'Pauses' the game before waiting for user to figure out command
        scene.pauseGame();
        scene.suspicion = 0;
        
        Tutorial.suspicionLoop(initColor, scene, text);
    }

    // Wait for the player to correctly create red
    private static suspicionLoop(initcolor:number, scene:Level, text:Phaser.GameObjects.Text){
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
        if(!Tutorial.tutorialEnabled)
            return;

        if(Tutorial.floor)
            return;
        Tutorial.floor = true;
        let mainCamera: Phaser.Cameras.Scene2D.Camera = scene.cameras.main;
        let text:Phaser.GameObjects.Text = scene.add.text(mainCamera.centerX-mainCamera.centerX/2, mainCamera.centerY-mainCamera.centerY/2, 
            "Change your color to the color of the floor to stop the suspicion bar");
        Tutorial.setFontStyle(text);
        let arrow:Phaser.GameObjects.Image = scene.add.image(mainCamera.width - 350, text.y, 'arrow-white').setOrigin(0,0);
        scene.pauseGame();

        Tutorial.floorLoop(scene, text, arrow,0);
    }

    private static floorLoop(scene: Level, txt:Phaser.GameObjects.Text, arrw:Phaser.GameObjects.Image, i:number){
        Tutorial.sleep(500).then(() => {
            // The player completed the condition, so exit the loop
            if(scene.player.color == scene.tileColor){
                //scene.successSFX.play(); // not needed
                txt.destroy();
                arrw.destroy();
                scene.resumeGame();
                let mainCamera: Phaser.Cameras.Scene2D.Camera = scene.cameras.main;
                Tutorial.displayTextTimed(scene, scene.add.text(mainCamera.centerX-mainCamera.centerX/2, mainCamera.centerY-mainCamera.centerY/2,
                "If the suspicion bar reaches the top you'll be caught!"), 3000);
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
    private static displayTextTimed(scene:Level, text:Phaser.GameObjects.Text, duration:number){
        // Properly format the text
        Tutorial.setFontStyle(text);
        // Pause the game
        //scene.pauseGame();
        // Wait until desired time has passed, then remove the text and restart the game
        Tutorial.sleep(duration).then(() => {
            text.destroy();
            //scene.resumeGame();
        });
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
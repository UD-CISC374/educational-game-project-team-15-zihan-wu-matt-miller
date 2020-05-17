import 'phaser';
import EndScene from "./scenes/endScene";
import MainScene from './scenes/mainScene';
import PreloadScene from './scenes/preloadScene';
import StartScene from './scenes/startScene';
import Controls from './scenes/controls';
import Level1Scene from './scenes/level1Scene';
import Level2Scene from './scenes/level2Scene';
import Level3Scene from './scenes/level3Scene';
import Options from './scenes/options';
import GameConfig = Phaser.Types.Core.GameConfig;

const DEFAULT_WIDTH = 1300;//1280
const DEFAULT_HEIGHT = 600;//600

// mode Phaser.Scale.FIT

const config: GameConfig = {
    backgroundColor: '#000000',
    scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
    },
    scene: [PreloadScene, StartScene, MainScene, Controls, Level1Scene, Level2Scene, Level3Scene, EndScene, Options],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    },
    render: {
        pixelArt: true
    }
};

window.addEventListener('load', () => {
    window['game'] = new Phaser.Game(config);
});
import Level from './level';

export default class Level2Scene extends Level{

    constructor(){
        // Name this scene Level2Scene,
        // Use json map with key 'level2'
        // 'StartScene' indicates which scene to jump to after 
        super('Level2Scene', 'level2', 'Level3Scene', 0);
    }
}
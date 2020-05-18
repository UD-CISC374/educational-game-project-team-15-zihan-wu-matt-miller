import Level from './level';

export default class Level3Scene extends Level{

    constructor(){
        // Name this scene Level2Scene,
        // Use json map with key 'level2'
        // 'StartScene' indicates which scene to jump to after 
        super('Level3Scene', 'level3', 'EndScene', 100);
    }
}